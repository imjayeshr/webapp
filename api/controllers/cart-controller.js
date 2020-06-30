const mysql = require('mysql');
const db = require("../../config/db");
const Cart = require("../models/cart");
const Book = require('../models/book');


// To get all the items in the cart 
exports.getItems = (req, res) => {
  var userId= req.params.id;
  console.log("Getting for user", userId);
  Cart.findAll({where:{user_id:userId}, include: Book})
    .then((result)=>{
      res.send(result);
    })
    .catch(error=>{
      res.send(error);
    })
};

// To add an item to the cart
exports.addItem = (req, res) => {
    var bookId = req.body.bookId;
    var userId = req.params.id;
    var quantity = req.body.quantity;
    var cost; 
    var price;
    var oldquantity; 
    var cartid; 

    var duplicate = false; 

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

    var id = req.body.id;
    var bookId = req.body.bookId;
    var newQuantity = req.body.newQuantity;
    var price;
    var cost; 
    console.log("Update called for item ", id, "new quan is ", newQuantity, bookId);
    
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

  var id = req.body.id; 

  Cart.destroy({where:{id}})
    .then((result)=>{
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


