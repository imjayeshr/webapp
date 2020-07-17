const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config/config");
const User = require("../models/user")
const statsClient = require('statsd-client');
const stats = new statsClient({host: 'localhost', port: 8125});
const logger = require('../../config/winston-logger');

// Creating a new user
exports.createNewUser = (req, res) => {
  var rtimer = new Date();
  stats.increment('POST - ADD User Count');

  logger.info("POST - ADD User Request");

  //Container variables for new user properties 
  var email = req.body.email;
  var firstname = req.body.firstname;
  var lastname = req.body.lastname; 
  var password = req.body.password;


  // Check if email already exists 
  User.count({ where: { email: email }})
    .then((count)=>{
      if(count>0){
        var rbody = {
          "status" : "400",
          "error" : "Email already exists!"
        }; 
        res.json(rbody);  
      }
      else {
            
      bcrypt.hash(password, 10, function (err, hash) {
          // Assign the hash to password var
          password = hash;
          var timer = new Date();
          User.create({email: email, firstname: firstname, lastname: lastname, pwd:password})
            .then(result => {
              var rbody = {
                "status" : "200",            
              };
              stats.timing('ADD User Query Complete Time', timer);
              stats.timing('ADD User Request Complete Time', rtimer);
              res.json(rbody);
            })
            .catch(error => {
              var rbody = {
                "status" : "400",
                "error" : "Error!"
              }; 
              res.json(rbody);
            })      
      });
    }

  })
}

// To authenticate the user
exports.authenticate = (req, res) => {
  var rtimer = new Date();
  stats.increment('AUTHENTICATE User Count');

  logger.info("AUTHINCATE User Request");
  
  var email = req.body.email;
  var password = req.body.password;

  var timer = new Date();
  // Check if user exists 
    User.findOne(({
      where : {
        email : email
      }
    }))
      .then((user)=> {
        if(!user){
          res.send("User not found");   
        }
        else {
          console.log(user.pwd);
          bcrypt.compare(req.body.password, user.pwd, function (
            error,
            ret
          ) {
            console.log(ret);
            // if the passwords match
            // If the function returns true, return the user object
            if (ret == true) {
              

              console.log("Passwords match")
              // Create a new jwt for the user 
              jwt.sign(
                { email: user.email },
                JWT_SECRET,
                { expiresIn: "7200s" },
                (err, token) => {
                  stats.timing('AUTHENTICATE User Query Complete Time', timer);
                  stats.timing('AUTHENTICATE User Request Complete Time', rtimer);
                  // Return the user object along with the JSON token
                  //console.log("Sending token: ", token);
                  res.status(200).json({
                    user,
                    token,
                  });
                }
              );
            }
            // Else return error 401 Unauthorized. Invalid Credentials
            else {
              res.send("Unauthorized");
              res.status(401).send(error);
            }
          });
        }
      })
  
};
exports.updateUserInfo = (req, res) => {
  
  // Update called for a new password 
  stats.increment("Update account info");
  let timer = new Date();

  let email = req.body.email;
  let firstname = req.body.firstname; 
  let lastname = req.body.lastname; 

  User.update({firstname, lastname}, {
    where : {
      email
    }
  })
    .then(result=>{
      console.log("Updated accoutnd details");
      stats.timing("DB request: Update account details");
      logger.info("User account details updated");
      res.send(result);
    })
    .catch(error=>{
      res.send(error);
    })
};

exports.readUser = (req, res) => {
  
  // Update called for a new password 
  stats.increment("Get account info");
  let timer = new Date();

  let email = req.params.emailid;
  console.log(email + "issss ");
  
  User.findOne({
    where : {
      email
    }
  })
    .then(result=>{
      stats.timing("DB request: User info requested");
      res.send(result);
    })
    .catch(error=>{
      res.send(error);
    })
};