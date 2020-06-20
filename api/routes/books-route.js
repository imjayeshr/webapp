/**
 * Books related endpoints 
 */

const booksController = require("../controllers/books-controller");
const authChecker = require("../middleware/authChecker");
const fileUpload = require("../../config/s3"); 
const multer = require("multer");


module.exports = function (app) {
  //Reset the password using email
  app
    .route("/books")
    .get(booksController.getBooks)
    //.post(authChecker, booksController.addBook)
    .post(fileUpload.upload.array('image'), booksController.addBook)
    .put(authChecker, booksController.updateBook)
    //.delete(authChecker, booksController.deleteBook)

  app
    .route("/books/:id")
    .delete(authChecker, booksController.deleteBook)
    .get(authChecker, booksController.getSpecificBook)


  app
    .route("/images/update")
    .put(booksController.deleteImage)
    .post(fileUpload.upload.single('image'), booksController.addImage)

  app.post("/uploadimage", fileUpload.upload.single('image'), (req, res, next) => {
    console.log(req.file);
    res.send(req.file);

  })

  app
  .route('/testnew')
  .post(
    multer({ dest: 'temp/', limits: { fieldSize: 8 * 1024 * 1024 } }).single(
      'image'
    ),
    booksController.testnew
  );


};
