const mysql = require('mysql');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config/config");
const db = require("../../config/db");


// Creating a new user
exports.createNewUser = (req, res) => {
  
  //Container variables for new user properties 
  var email = req.body.email;
  var firstname = req.body.firstname;
  var lastname = req.body.lastname; 
  var password = req.body.password;

  // Check if email already exists 
  db.query('select * from users where email = ?', [email], (err, result) => {
    if(result.length != 0) {
      var rbody = {
        "status" : "400",
        "error" : "Email already exists!"
      }; 
      res.json(rbody);
    }
    else { 
          // Hash the tempPassword using bcrypt
    bcrypt.hash(password, 10, function (err, hash) {
      if (err) {
      } else {
        // Assign the hash to password var
        password = hash;

        //Insert a new record into the table
        db.query('INSERT INTO users( email, firstname, lastname, pwd) VALUES("'+email+'", "'+firstname+'", "'+lastname+'", "'+password+'")',
        [email, firstname, lastname, password], (err) => {
          
          
          if(err) {
            var rbody = {
              "status" : "400",
              "error" : "Error!"
            }; 
            res.json(rbody);
          }
          else {

          }
          var rbody = {
            "status" : "200",            
          }; 
          res.json(rbody);
        });        
      }
  });
    }
  })
};

// To get user data
exports.readUser = (req, res) => {
  db.query("select * from users where email = ? ", [req.params.email], (err,result) => {
    if(err) res.send(err);
    else res.send(result);
  })
};

// To change the password 
exports.updatePassword = (req, res) => {
  
  // Update called for a new password 
  console.log("Update called! for password change email is ", req.body.email);

  let email = req.body.email;
  let oldpassword = req.body.oldpassword; 
  let newpassword = req.body.newpassword; 


  db.query("select * from users where email = ? ", [email], (err,result) => {
    var storedpassword = result[0].pwd; 
    bcrypt.compare(oldpassword, storedpassword, (error, ret) => {
      if (ret == true) {
        bcrypt.hash(newpassword, 10, (hasherror, hashresult) => {
          db.query("update users set pwd = ? where email = ? ", [hashresult, email], (updateError, updateResult) => {
            if(updateError) throw updateError;
            else {
              res.json("Password changed successfully!");
            }
            
          })
        })
      }
      else {
        res.json("Password incorrect");
      }
    })
  })

};

// To change the firstname and the lastname 
exports.updateUserInfo = (req, res) => {
  
  // Update called for a new password 
  console.log("Update called for firstname, lastname");

  let email = req.body.email;
  let firstname = req.body.firstname; 
  let lastname = req.body.lastname; 

          db.query("update users set firstname = ? , lastname = ? where email = ? ", [firstname, lastname, email], (updateError, updateResult) => {
            if(updateError) throw updateError;
            else res.send(updateResult)}); 
};

// To authenticate the user
exports.authenticate = (req, res) => {
    
  var email = req.body.email;
  var password = req.body.password;

  // Check if user exists 
    db.query("select * from users where email=?", [email], (error, result) => {
      if(result.length == 0){
        res.send("User not found"); 
      }
      else {
        //res.send(result)
        var tempPassword = result[0].pwd;
        //console.log('hashed password is '+ result[0].pwd)
                // If user is registered compare the provided password with the hash from the DB
                bcrypt.compare(req.body.password, tempPassword, function (
                  error,
                  ret
                ) {
                  // if the passwords match
                  // If the function returns true, return the user object
                  if (ret == true) {
                    // Create a new jwt for the user 
                    jwt.sign(
                      { email: result[0].email },
                      JWT_SECRET,
                      { expiresIn: "7200s" },
                      (err, token) => {
                        // Return the user object along with the JSON token
                        //console.log("Sending token: ", token);
                        res.status(200).json({
                          result,
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


/**
 * @function anon this function is used to handle the error
 * @param response this variable helps us send the response
 */
let renderErrorResponse = (response) => {
  const errorCallback = (error) => {
    if (error) {
      response.status(500);
      response.json({
        message: error.message,
      });
    }
  };
  return errorCallback;
};
