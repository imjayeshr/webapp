/**
 * Cart related endpoints 
 */

const cartController = require("../controllers/cart-controller");
const authChecker = require("../middleware/authChecker");

module.exports = function (app) {
  //Reset the password using email
  app
    .route("/cart/:id")
    .get(cartController.getItems)
    .post(authChecker, cartController.addItem)
    .put(authChecker, cartController.updateItem)
    .delete(authChecker, cartController.deleteItem)

};
