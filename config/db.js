// Create a connection to MY SQL 
const mysql = require('mysql'); 

console.log("SQL environment: " + process.env.APPLICATION_ENV);

let db; 

if (process.env.APPLICATION_ENV === 'prod') {
    db = mysql.createConnection({

    })
} else {
        db  = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'jayesh2207',
        database : 'cloudassignment3'
      });
      
      db.connect((err, res)=>{
          if(err) throw err;    
          console.log(`SQL Connection successful!`);
      });
}

  module.exports = db; 
  