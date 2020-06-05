/**
 * Cart related endpoints 
 */

const buffercontroller = require("../controllers/bufferCart-controller");

module.exports = function (app) {
  //Reset the password using email
  app
    .route("/bufferCart/:id")
    .get(buffercontroller.getItems)

};
