const { getAllAuthors, addAuthor, updateAuthor, deleteAuthor } = require("../controller/authorController");

const { getAllBooks, addBook, updateBoook } = require("../controller/bookController");
const express = require('express');
const { searchBooksAndAuthors } = require("../controller/searchController");
const { checkLogin } = require("../controller/loginController");

const router = express.Router();

//login
router.post('/login',checkLogin)

//all user
router.get('/allBooks', getAllBooks)

//add book
router.post('/addBook',addBook)

//update book 
router.put('/updateBook/:id',updateBoook)

//get all authors
router.get('/allAuthors', getAllAuthors)

//add author
router.post('/addAuthor', addAuthor) 

//update author
router.put('/updateAuthor/:id',updateAuthor)

//delete author
router.delete('/deleteAuthor/:id',deleteAuthor)

//search
router.get('/search',searchBooksAndAuthors)
module.exports = router;