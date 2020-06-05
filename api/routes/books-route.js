/**
 * Books related endpoints 
 */

const booksController = require("../controllers/books-controller");
const authChecker = require("../middleware/authChecker");

module.exports = function (app) {
  //Reset the password using email
  app
    .route("/books")
    .get(booksController.getBooks)
    .post(authChecker, booksController.addBook)
    .put(authChecker, booksController.updateBook)
    //.delete(authChecker, booksController.deleteBook)

  app
    .route("/books/:id")
    .delete(authChecker, booksController.deleteBook)
    .get(authChecker, booksController.getSpecificBook)

};
