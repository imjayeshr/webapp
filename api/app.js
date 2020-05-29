/**
 * Import the routes & models used in the project
 */
"use strict";

module.exports = function (app) {
  
  console.log("Initializing");
  //Initialize the routes
  let usersRoute = require("./routes/users-route");
  usersRoute(app);

};
