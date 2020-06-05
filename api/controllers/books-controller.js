const mysql = require('mysql');
const db = require("../../config/db");
var moment = require('moment'); // require

// To get all the books
exports.getBooks = (req, res) => {
  db.query("select books.* , CONCAT (users.firstname, ' ', users.lastname) AS seller from books inner join users on books.user_id = users.id order by books.price; ", (err,result) => {
    if(err) res.send(err);
    else res.send(result);
  })
};

// To add/create a book
exports.addBook = (req, res) => {
    var isbn = req.body.isbn;
    var title = req.body.title;
    var authors = req.body.authors;
    //var publicationDate = dateFormat(now, "default");
    var publicationDate = moment().format('YYYY-MM-DD HH:mm:ss'); 
    console.log(publicationDate);
    var price = req.body.price;
    var quantity = req.body.quantity;
    var userId = req.body.userId;

    db.query('INSERT INTO books(isbn,title,authors, publication_date, price,quantity,user_id) VALUES ("'+isbn+'","'+title+'","'+authors+'","'+publicationDate+'","'+price+'","'+quantity+'","'+ userId+'")',
    [isbn,title,authors,publicationDate,price,quantity,userId], (err,result) =>{
        if(err) {
            res.status(400);
          }
          else{ 
          res.status(200).json(result);
          }
    });

}

// To update a book 
exports.updateBook = (req, res) => {
  
    let bookId = req.body.bookId; 
    let isbn = req.body.isbn;
    let title = req.body.title;
    let authors = req.body.authors;  
    let price = req.body.price;
    let quantity = req.body.quantity; 
  
            db.query("update books set isbn = ? , title = ? , price = ? , quantity = ? , authors = ? where id = ? ", [isbn, title, price, quantity, authors, bookId], (updateError, updateResult) => {
              if(updateError) {
                console.log("failed");
              }
              else res.send(updateResult)}); 
  };


// To delete a book/item 
exports.deleteBook = (req, res) => {
  let bookId = req.params.id;

  console.log("delete req received for ", bookId);
  // Get the list of the users who have this book in their cart and the title of the book
  getBookUsers(bookId)
    .then((usersList) => {
      for(user in usersList) {
        // Call the asynchronous function 
        insertIntoBufferCart(usersList[user])
      }      
    })
    .then(
        //Call the query function on the db object to delete the item 
  db.query("delete from books where id = ? ", [bookId], (error, result)=> {
    if(error) res.send(error);
    else res.send(result);
  })
    )
    .catch((fetchError)=>{
      console.log(fetchError);
    })



}

// To get specific book details 
exports.getSpecificBook = (req, res) => {
  console.log("Request for specific book received");
  var id = req.params.id; 
  db.query("select * from books where id = ? ", [id], (err, result)=> {
    if(err) res.send(err)
    else res.send(result)
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

