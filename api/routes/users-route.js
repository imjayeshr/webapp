/**
 * User related endpoints definitions
 */

"use strict";
const userController = require("../controllers/user-controller");
const emailController = require("../controllers/email-controller");
const authChecker = require("../middleware/authChecker");
//const seq = require("../../config/db");
const User = require("../models/user")

module.exports = function (app) {
  //Reset the password using email
  app.route("/users/email/:emailid")
    .get(authChecker, userController.readUser)

  // app.route("/users/settings/password")
  //   .put(authChecker,userController.updatePassword)
  
  app.route("/users/settings/info")
    .put(authChecker,userController.updateUserInfo)
    

  //Create a new user
  app.route("/users/signup").post(userController.createNewUser);

  //Authenticate a user using the email and the password
  app.route("/users/signin").post(userController.authenticate);

  // Test route to check if node server is running as expected 
  app.get("/test", (req, res) => {
    res.send("The server is up and running!");
  })
  app.post("/users/reset", emailController.emailSNS)
};