const Sequelize = require('sequelize');
const db = require('../../config/db');

const User = db.define('user', {
    // attributes
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    firstname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    pwd:{
        type: Sequelize.STRING,
        allowNull: false
    }
  }, {
    // options
  });


module.exports = User; 
