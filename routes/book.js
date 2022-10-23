const router = require('express').Router()
let { addBookValidator } = require('../validators/book')
let { booksByUserId, book, addBook, editBook, deleteBook, favBooksIdByUserId, favBookToggler } = require('../controllers/book')
const checkUserAuth = require('../middlewares/check-user-auth')

router.get("/books-by-user-id/:id", checkUserAuth, booksByUserId)          //  http://localhost:8080/api/book/books-by-user-id/userid
router.get("/:id", checkUserAuth, book)                                    //  http://localhost:8080/api/book/:id
router.post("/add-book", checkUserAuth, addBookValidator, addBook)         //  http://localhost:8080/api/book/add-book
router.put("/edit-book/:id", checkUserAuth, addBookValidator, editBook)    //  http://localhost:8080/api/book/edit-book/:id
router.delete("/delete-book/:id", checkUserAuth, deleteBook)               //  http://localhost:8080/api/book/delete-book/:id

router.get("/fav-books-id/:id", checkUserAuth, favBooksIdByUserId)         //  http://localhost:8080/api/book/fav-books-id/:id
router.post("/fav-book-toggler", checkUserAuth, favBookToggler)            //  http://localhost:8080/api/book/fav-book-toggler

module.exports = router


