const mysql = require('mysql');
const db = require("../../config/db");


// To get all the items in the cart 
exports.getItems = (req, res) => {
  var userId= req.params.id;
  console.log("getting for user", userId);
  db.query("select cart.id, cart.book_id, cart.quantity, cart.user_id, cart.cost, books.price, books.title from cart inner join books ON cart.book_id = books.id where cart.user_id = ? ;",[userId], (err,result) => {
    if(err) res.send(err);
    else res.send(result);
  })
};

// To add an item to the cart
exports.addItem = (req, res) => {
    var bookId = req.body.bookId;
    var userId = req.params.id;
    var quantity = req.body.quantity;
    var cost; 

    // Get the price of that book 
    getItemPrice(bookId)
      .then((result)=> {
        cost = result[0].price * quantity;

        // Insert a new item into the table 
        db.query('INSERT INTO cart(book_id,quantity, user_id, cost) VALUES ("'+bookId+'","'+quantity+'","'+userId+'","'+cost+'")',
        [bookId,quantity, userId, cost], (insertErr,insertResult) =>{
        if(insertErr) {
            res.status(400);
          }
          else{ 
          res.status(200).json(insertResult);
          }
    })
      })
      .catch((err)=> {
        res.send(err);
      })
}

// to update an item 
exports.updateItem = (req, res) => {

    var id = req.body.id;
    var bookId = req.body.bookId;
    var newQuantity = req.body.newQuantity;
    var cost; 
    console.log("Update called for item ", id, "new quan is ", newQuantity, bookId);
    
        // Get the price of that book 
        getItemPrice(bookId)
        .then((result)=> {
          cost = result[0].price * newQuantity;
          console.log(cost, newQuantity, bookId);
          // Update the record in the cart table
          db.query('UPDATE cart SET quantity = ? , cost = ? where id = ?', [newQuantity, cost, id], (queryError, queryResult)=>{
            if(queryError){
              res.status(400);
            }
            else {
              res.status(200).json(queryResult);
            }
          })

        })
        .catch((err)=> {
          res.send(err);
        })

}

// To delete an item 
exports.deleteItem = (req, res) => {

  var id = req.body.id; 
  /*
  var userId = req.body.userId;
  var bookId = req.body.bookId;
                                            
  db.query("delete from cart where user_id = ? AND book_id = ? ", [userId, bookId], (queryError, queryResult) => {
    if(queryError) res.send(queryError)
    else res.send(queryResult);
  })*/ 

  db.query("delete from cart where id = ?", [id], (queryError, queryResult) => {
    if(queryError) res.send(queryError)
    else res.send(queryResult);
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


