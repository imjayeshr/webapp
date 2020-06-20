const Sequelize = require('sequelize');
const db = require('../../config/db');
const Book = require('../models/book')
const User = require('../models/user')

const Cart = db.define('cart', {
    // attributes
    quantity:{
        type: Sequelize.INTEGER
    },
    cost: {
        type: Sequelize.INTEGER
    }
  }, {
    // options
  });

Cart.belongsTo(User, {foreignKey: 'user_id', onDelete:'cascade'})
Cart.belongsTo(Book, {foreignKey: 'book_id', onDelete:'cascade'})


module.exports = Cart; 
