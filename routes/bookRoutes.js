const { getAllBooks, addBook, updateBoook } = require("../controller/bookcontroller");
const express = require('express');

const router = express.Router();

//all user
router.get('/allBooks', getAllBooks)

//add book
router.post('/addBook',addBook)

//update book
router.put('/updateBook/:id',updateBoook)

module.exports = router;