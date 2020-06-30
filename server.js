const express = require("express"),
  app = express(),
  port = process.env.EXPRESS_PORT || 3301,
  bodyParser = require("body-parser");
  db = require("./config/db");
  cors = require("cors");
  s3 = require("./config/s3")
  //emptydb = require("./config/database2");

console.log("Current environment is " + process.env.APPLICATION_ENV);


/*emptydb.query("CREATE DATABASE IF NOT EXISTS ecommerce;")
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> 829ccdd4e3d8c0431b2be0757b6877cc4790cfcd
=======

>>>>>>> cc0c77537c368631c5abe29bdf272fd94e8a7ae2
    .then(data => {
        db.sync({ alter: true })
            .then(() => {
                console.log("DB & Tables synced!")

                db.authenticate()
                    .then(() => console.log('Connected to the MySQl database!'))
                    .catch(err => console.log('error: ' + err))
            })
    });
*/ 
<<<<<<< HEAD
=======

>>>>>>> cc0c77537c368631c5abe29bdf272fd94e8a7ae2

<<<<<<< HEAD
=======

>>>>>>> 829ccdd4e3d8c0431b2be0757b6877cc4790cfcd
//Adding body parser for handling request and response objects.
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "10mb",
  })
);

app.use(bodyParser.json({ limit: "5mb" }));
app.use(cors());

//Enabling CORS: to allow frontend to make cross-domain requests to the server 
// Allow headers. Authorization header is necessary for exchanging of JWT tokens 
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  next();
});



//Initialize the app
let initApp = require("./api/app");
initApp(app);

// Listen on the port 
app.listen(port);
console.log("Node server started on port: " + port);


