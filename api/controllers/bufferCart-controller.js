const mysql = require('mysql');
const db = require("../../config/db");


// To get all the items in the cart 
exports.getItems = (req, res) => {
  var userId= req.params.id;
  console.log("getting titles for user", userId);
<<<<<<< HEAD
=======

>>>>>>> 829ccdd4e3d8c0431b2be0757b6877cc4790cfcd
/*  db.query("select * from buffer_cart where user_id = ? ;",[userId], (err,result) => {
    if(err) res.send(err);
    else res.send(result);
  })*/ 
<<<<<<< HEAD
};



=======
>>>>>>> 829ccdd4e3d8c0431b2be0757b6877cc4790cfcd

};
