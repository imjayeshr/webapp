const mysql = require('mysql');
const db = require("../../config/db");
var moment = require('moment'); // require
const Book = require("../models/book")
const s3 = require("../../config/s3"); 
const aws = require("aws-sdk");
const fs = require("fs");

const statsClient = require('statsd-client');
const stats = new statsClient({host: 'localhost', port: 8125});
const logger = require('../../config/winston-logger');

// To get all the books
exports.getBooks = (req, res) => {
  var rtimer = new Date();
  stats.increment('Get Book Count');

  logger.info("GET Book Request");
  var timer = new Date();
  Book.findAll({})
    .then(result => {
      stats.timing('GET Books Query Complete Time', timer);
      stats.timing('GET Books Request Complete Time', rtimer);
      res.send(result)
    })
    .catch(error => {
      res.send(error);
    })
};

// To add/create a book
exports.addBook = (req, res) => {
    //var images = req.file.location; 
    var rtimer = new Date();

    stats.increment('Add Book Count');

    logger.info("Add Book Request");

    var isbn = req.body.isbn;
    var title = req.body.title;
    var authors = req.body.authors;
    //var publicationDate = dateFormat(now, "default");
    var publicationDate = moment().format('YYYY-MM-DD HH:mm:ss'); 
    console.log(publicationDate);
    var price = req.body.price;
    var quantity = req.body.quantity;
    var userId = req.body.userId;
    var images = req.files; 
    var urls = []; 
    for (let i = 0; i<images.length; i++){
      urls.push(images[i].location);
    } 
    var url = urls.join(';');


    var timer = new Date();
    Book.create({
      isbn, title, authors, publication_date: publicationDate, price, quantity, user_id: userId, images: url
    })
      .then(result=>{
        stats.timing('ADD Book Query Complete Time', timer);
        stats.timing('ADD Book Request Complete Time', rtimer);
        res.status(200).json(result);
      })
      .catch(error=>{
        res.status(400);
      })
      
}

// To update a book 
exports.updateBook = (req, res) => {
  var rtimer = new Date();

  stats.increment('UPDATE Book Count');

  logger.info("UPDATE Book Request");

    let bookId = req.body.bookId; 
    let isbn = req.body.isbn;
    let title = req.body.title;
    let authors = req.body.authors;  
    let price = req.body.price;
    let quantity = req.body.quantity; 
  
    var timer = new Date();
    Book.update({isbn, title, authors, price, quantity} , 
      {
        where: {
          id: bookId
        }
      })
        .then(result=>{
          stats.timing('UPDATE Book Query  Complete Time', timer);
          stats.timing('UPDATE Book Request Complete Time', rtimer);
          res.send(result);
        })
        .catch(error=>{
          res.send(error);
        })
  };

// To delete an image 
exports.deleteImage = (req,res) => {
  var rtimer = new Date();

  stats.increment('DELETE Image from S3 Count');

  logger.info("DELETE Image from S3 Request");

  let id = req.body.id; 
  let updatedImageString = req.body.updatedImageString; 

  let imageUrl = req.body.imageUrl; 
  //imageUrl = imageUrl.replace("https://"+ process.env.AWS_BUCKET_NAME + ".s3.amazonaws.com/","");
  imageUrl = imageUrl.substring(imageUrl.length - 17, imageUrl.length)
  console.log("Deleting object with key", imageUrl);

  s3.s3.deleteObject({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: imageUrl
  }, function(err,data) {
    if(!err){
      var timer = new Date();

      Book.update({images:updatedImageString}, {where:{id:id}})
      .then((result)=> {
        stats.timing('DELETE Image from S3 Query Complete Time', timer);
        stats.timing('DELETE Image from S3 Request Complete Time', rtimer);
        res.send(result);
      })
      .catch((error)=> {
        res.send(error);
      })
    }
    else {
      res.send(data)
    }    
  })

}

// To delete a book/item 
exports.deleteBook = (req, res) => {

  var rtimer = new Date();

  stats.increment('DELETE Book Count');

  logger.info("DELETE Book Request");


  let bookId = req.params.id;
  console.log("Will deletebook ", bookId);
  let objects = [];
  
  Book.findOne({where:{
    id:bookId
  }})
    .then((book)=>{
      
      var tempObjects = book.images.split(';');
      console.log(tempObjects);
      for (let o in tempObjects){
        
        let obj = tempObjects[o];
        obj = obj.substring(obj.length - 17, obj.length)
        console.log(obj);
        var map = {
          "Key" : obj
        }
        objects.push(map);
      }      
    })
    .then(()=>{
      
      console.log("objects is ", objects)
      var params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Delete: {
          Objects: objects
        }
      }

      s3.s3.deleteObjects(params, function(err, data){
          if(data){
              console.log("File success", data);
          } else {
              console.log("Check with error message " + err);
          }
      })        
    })
    .then(()=>{
      var timer = new Date();
      Book.destroy({where: {id: bookId}})
    .then(result=>{
      stats.timing('DELETE Book Query Complete Time', timer);
      stats.timing('DELETE Book Request Complete Time', rtimer);
      res.status(200).json("Deleted");
    })
    .catch(error=>{
      res.status(200).json("Error deleting");
    })
    })
    .catch((error)=>{
      res.send(error);
    })
  
}

// To get specific book details 
exports.getSpecificBook = (req, res) => {

  var rtimer = new Date();

  stats.increment('GET Specific Book Count');

  logger.info("GET Specific Book Request");

  console.log("Request for specific book received");
  var id = req.params.id; 
  var timer = new Date();
  Book.findOne({where:{
    id
  }})
    .then((book)=>{
      stats.timing('GET Specific Book Query Complete Time', timer);
      stats.timing('GET Specific Book Request Complete Time', rtimer);
      res.send(book)
    })
    .catch((error)=>{
      res.send(error);
    })
}

// Extract the users function 
function getBookUsers(bookId)
{
    return new Promise(function(resolve, reject) {
        
    // Get the users of that book and the name of the book being deleted 
    db.query('select cart.user_id , books.title from cart inner join books on cart.book_id = books.id where cart.book_id = ? ; ', [bookId], (queryError, queryRes) => {
      if(queryError) return reject(queryError)
      resolve(queryRes)
    })
    });
}

// Asynchronous function to insert the values 

async function insertIntoBufferCart(user){
  const result = await db.query('INSERT INTO buffer_cart(user_id, title) VALUES ("'+user.user_id+'","'+user.title+'")',
  [user.user_id, user.title],(error, insertResult) => {
    if(error) return error
    else return insertResult
  });
  return result;
}

exports.testnew = (req,res) => {
  aws.config.setPromisesDependency();
    aws.config.update({
      accessKeyId: "",
      secretAccessKey: "",
      region: "us-east-1"
    });
    const s3 = new aws.S3();
    var params = {
      ACL: 'public-read',
      Bucket: "bookstore-webapp",
      Body: fs.createReadStream(req.file.path),
      Key: `userAvatar/${req.file.originalname}`
    };

    s3.upload(params, (err, data) => {
      if (err) {
        console.log('Error occured while trying to upload to S3 bucket', err);
      }

      if (data) {
        fs.unlinkSync(req.file.path); // Empty temp folder
        const locationUrl = data.Location;
      }
    });
}   


// To add/create a book
exports.addImage = (req, res) => {

  var rtimer = new Date();

  stats.increment('Add Image Count');

  logger.info("ADD Image Request");


  var url = req.file.location; 
  var images = req.body.images;
  var id = req.body.id; 

  images = images + ";" + url; 
  var timer = new Date();
  Book.update({
     images: images
  }, {where: {id}})
    .then(result=>{
      stats.timing('ADD Image Query Complete Time', timer);
      stats.timing('ADD Image Request Complete Time', rtimer);
      res.status(200).json(result);
    })
    .catch(error=>{
      res.status(400);
    })

}

