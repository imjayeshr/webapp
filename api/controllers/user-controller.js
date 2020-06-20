const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config/config");
const User = require("../models/user")


// Creating a new user
exports.createNewUser = (req, res) => {
  
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

          User.create({email: email, firstname: firstname, lastname: lastname, pwd:password})
            .then(result => {
              var rbody = {
                "status" : "200",            
              }; 
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
    
  var email = req.body.email;
  var password = req.body.password;

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