const { getAllAuthors, addAuthor, updateAuthor, deleteAuthor } = require("../controller/authorController");
const { getAllBooks, addBook, updateBoook, deleteBook, getBookById, getImage } = require("../controller/bookController");
const { searchBooksAndAuthors } = require("../controller/searchController");
const { checkLogin, addUser } = require("../controller/loginController");
const { verifyToken } = require("../middleware/auth");

const express = require('express');
const router = express.Router();

//login
router.post('/login',checkLogin)

//adduser
router.post('/addUser',addUser)

//all user
router.get('/allBooks',verifyToken ,getAllBooks)

//add book 
router.post('/addBook',verifyToken,addBook)

//update book 
router.put('/updateBook/:id',verifyToken,updateBoook)

//image
router.post('/getImage/:id',verifyToken,getImage)

//get book by id
router.get('/getBookById/:id',getBookById)

//delete book
router.delete('/deleteBook/:id',verifyToken,deleteBook)

//get all authors
router.get('/allAuthors',verifyToken, getAllAuthors)

//add author
router.post('/addAuthor', verifyToken,addAuthor) 

//update author
router.put('/updateAuthor/:id',verifyToken,updateAuthor)

//delete author
router.delete('/deleteAuthor/:id',verifyToken,deleteAuthor)

//search
router.get('/search',verifyToken,searchBooksAndAuthors)

module.exports = router; 