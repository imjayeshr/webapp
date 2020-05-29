// Create a connection to MY SQL 
const mysql = require('mysql'); 
const db  = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'jayesh2207',
    database : 'cloudassignment2'
  });
  
  db.connect((err, res)=>{
      if(err) throw err;    
      console.log(`SQL Connection successful!`);
  });

  module.exports = db; 
  