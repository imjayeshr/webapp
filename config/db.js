// Create a connection to MY SQL 
const Sequelize = require('sequelize');
const fs = require('fs');

let seq;
const DIALECT = 'mysql';

console.log("Database hsotname is : ", process.env.RDS_HOSTNAME);
console.log("connecting using"+ process.env.RDS_PASSWORD + process.env.RDS_USERNAME + process.env.RDS_HOSTNAME);
if (process.env.APPLICATION_ENV === 'prod') {
<<<<<<< HEAD
<<<<<<< HEAD
  
    seq = new Sequelize('ecommerce', process.env.RDS_USERNAME, process.env.RDS_PASSWORD, {
=======

  seq = new Sequelize('ecommerce', process.env.RDS_USERNAME, process.env.RDS_PASSWORD, {
>>>>>>> 829ccdd4e3d8c0431b2be0757b6877cc4790cfcd
=======

  seq = new Sequelize('ecommerce', process.env.RDS_USERNAME, process.env.RDS_PASSWORD, {
>>>>>>> cc0c77537c368631c5abe29bdf272fd94e8a7ae2
        host: process.env.RDS_HOSTNAME,
        dialect: 'mysql'
    })

    seq
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
      ;

    seq.sync();
  }    

module.exports = seq; 