const mysql = require('mysql');
const db = require("../../config/db");


// To get all the items in the cart 
exports.getItems = (req, res) => {
  var userId= req.params.id;
  console.log("getting titles for user", userId);
  db.query("select * from buffer_cart where user_id = ? ;",[userId], (err,result) => {
    if(err) res.send(err);
    else res.send(result);
  })
};




