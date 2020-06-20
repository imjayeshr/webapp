const Sequelize = require('sequelize');
const db = require('../../config/db');
const User = require('../models/user')

const Book = db.define('books', {
    // attributes
    isbn:{
        type: Sequelize.STRING
    },
    title: {
        type: Sequelize.STRING
    },
    publication_date: {
        type: Sequelize.DATE
    },
    price:{
        type: Sequelize.DOUBLE
    },
    quantity:{
        type: Sequelize.INTEGER
    },
    authors:{
        type: Sequelize.STRING
    },
    images:{
        type:Sequelize.STRING
    }
  }, {
    // options
  });

Book.belongsTo(User, {foreignKey: 'user_id'})

module.exports = Book; 
