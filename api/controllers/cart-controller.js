const mysql = require('mysql');
const db = require("../../config/db");
const Cart = require("../models/cart");
const Book = require('../models/book');
const statsClient = require('statsd-client');
const stats = new statsClient({host: 'localhost', port: 8125});
const logger = require('../../config/winston-logger');

// To get all the items in the cart 
exports.getItems = (req, res) => {
  var rtimer = new Date();
  stats.increment('GET Cart Items Count');

  logger.info("GET Cart Items Request");

  var userId= req.params.id;
  console.log("Getting for user", userId);
  var timer = new Date();
  Cart.findAll({where:{user_id:userId}, include: Book})
    .then((result)=>{
      stats.timing('GET Cart Items Query Complete Time', timer);
      stats.timing('GET Cart Items Request Complete Time', rtimer);
      res.send(result);
    })
    .catch(error=>{
      res.send(error);
    })
};

// To add an item to the cart
exports.addItem = (req, res) => {

  var rtimer = new Date();
  stats.increment('ADD to Cart Count');

  logger.info("ADD to Cart Request");

    var bookId = req.body.bookId;
    var userId = req.params.id;
    var quantity = req.body.quantity;
    var cost; 
    var price;
    var oldquantity; 
    var cartid; 

    var duplicate = false; 
    var timer = new Date();
    //Check if item already exists in the cart table 
    Cart.findOne({where: {book_id : bookId, user_id:userId}})
      .then((item)=>{
        if(item==null || item==undefined){
          console.log("Item is", item)
        }
        else {
          duplicate = true
          cartid = item.id;
          oldquantity = item.quantity;
        }
      })
    .then(()=>{
      if(duplicate == false){
        Book.findOne({where:{id:bookId}})
        .then((book)=>{        
          price = book.price;
        })
        .then(()=>{
          cost = price * quantity
        })
        .then(()=>
          {
            Cart.create({book_id: bookId, user_id:userId, quantity, cost})
              .then((result)=>{
                stats.timing('ADD to Cart Query Complete Time', timer);
                stats.timing('ADD to Cart Request Complete Time', rtimer);
                res.status(200).json(result);
              })
              .catch((error)=>{
                res.status(400);
              })
          }
        )
      }
      else {
        Book.findOne({where:{id:bookId}})
        .then((book)=>{
          price = book.price;
        })
        .then(()=>{
          quantity = parseInt(quantity) + parseInt(oldquantity)
          cost = price * quantity
          quantity = quantity.toString();          
        })
        .then(()=>
          {
            Cart.update({quantity: quantity, cost}, {where:{id:cartid}})
              .then((result)=>{
                res.status(200).json(result);
              })
              .catch((error)=>{
                res.status(400);
              })
          }
        )
      }

    })
    
}

// to update an item 
exports.updateItem = (req, res) => {

  var rtimer = new Date();
  stats.increment('UPDATE Cart Count');

  logger.info("UPDATE Cart Request");

    var id = req.body.id;
    var bookId = req.body.bookId;
    var newQuantity = req.body.newQuantity;
    var price;
    var cost; 
    console.log("Update called for item ", id, "new quan is ", newQuantity, bookId);
    var timer =new Date();
    Book.findOne({where:{id:bookId}})
    .then((book)=>{
      price = book.price;
    })
    .then(()=>{
      cost = price * newQuantity
    })
    .then(()=>
      {
        Cart.update({quantity: newQuantity, cost}, {where:{id}})
          .then((result)=>{
            stats.timing('UPDATE Cart Query Complete Time', timer);
            stats.timing('UPDATE Cart Request Complete Time', rtimer);
            res.status(200).json(result);
          })
          .catch((error)=>{
            res.status(400);
          })
      }
    )

}

// To delete an item 
exports.deleteItem = (req, res) => {

  var rtimer = new Date();
  stats.increment('DELETE Cart Item Count');

  logger.info("DELETE Cart Item Request");

  var id = req.body.id; 
  var timer = new Date();
  Cart.destroy({where:{id}})
    .then((result)=>{
      stats.timing('DELETE Cart Item Query Complete Time', timer);
      stats.timing('DELETE Cart Item Request Complete Time', rtimer);
      res.status(200).json(result);
    })
    .catch((error)=>{
      res.send(error);
    })

}

function getItemPrice(bookId)
{
    return new Promise(function(resolve, reject) {
        
    // Get the price of that book 
    db.query('select price from books where id = ? ', [bookId], (queryError, queryRes) => {
      if(queryError) return reject(queryError)
      resolve(queryRes)
      // else {
      //   cost = queryRes[0].price * quantity;
      // }
    })
    });
}

