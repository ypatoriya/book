const { getAllAuthors, addAuthor, updateAuthor, deleteAuthor } = require("../controller/authorController");

const { getAllBooks, addBook, updateBoook, deleteBook, getBookById, getImage } = require("../controller/bookController");
const express = require('express');
const { searchBooksAndAuthors } = require("../controller/searchController");
const { checkLogin } = require("../controller/loginController");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

//login
router.post('/login',checkLogin)

//all user
router.get('/allBooks' ,getAllBooks)

//add book
router.post('/addBook',addBook)

//update book 
router.put('/updateBook/:id',updateBoook)

//image
router.post('/getImage/:id',getImage)

//get book by id
router.get('/getBookById/:id',getBookById)

//delete book
router.delete('/deleteBook/:id',deleteBook)

//get all authors
router.get('/allAuthors', getAllAuthors)

//add author
router.post('/addAuthor', verifyToken,addAuthor) 

//update author
router.put('/updateAuthor/:id',verifyToken,updateAuthor)

//delete author
router.delete('/deleteAuthor/:id',deleteAuthor)

//search
router.get('/search',searchBooksAndAuthors)

module.exports = router;