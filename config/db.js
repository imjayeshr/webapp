// Create a connection to MY SQL 
const Sequelize = require('sequelize');
const fs = require('fs');

let seq;
const DIALECT = 'mysql';

console.log("Database hsotname is : ", process.env.RDS_HOSTNAME);
console.log("connecting using"+ process.env.RDS_PASSWORD + process.env.RDS_USERNAME + process.env.RDS_HOSTNAME);
if (process.env.APPLICATION_ENV === 'prod') {

  seq = new Sequelize('ecommerce', process.env.RDS_USERNAME, process.env.RDS_PASSWORD, {
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