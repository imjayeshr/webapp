/**
 * Import the routes & models used in the project
 */
"use strict";

module.exports = function (app) {
  
  console.log("Initializing");
  //Initialize the routes
  let usersRoute = require("./routes/users-route");
  let booksRoute = require("./routes/books-route");
  let cartRoute = require("./routes/cart-route");
  let bufferRoute = require("./routes/buffer-cart-route");
  usersRoute(app);
  booksRoute(app);
  cartRoute(app);
  bufferRoute(app);

};
