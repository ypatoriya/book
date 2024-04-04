import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import Search from './Search';

const AllBook = () => {

  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [image, setImage] = useState([])

  const navigate = useNavigate();

  const handleAllAuthors = () => {
    navigate('/allAuthors');
  };

  const handleClick = () => {
    navigate('/addBook');
  };

  const handleSearch = () => {
    navigate('/search');
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleEdit = (bookId) => {
    navigate(`/updateBook/${bookId}`);
  };

  const handleDelete = (bookId) => {

    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', `http://localhost:5000/deleteBook/${bookId}`, true);
    xhr.onload = function () {
      if (xhr.status === 200) {
        console.log('Book deleted successfully');
      } else {
        console.error('Failed to delete book. Status:', xhr.status);
      }
    };
    xhr.onerror = function () {
      console.error('Error deleting book. Network error');
    };
    xhr.send();
    window.location.reload()
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/');
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          console.log('No token found. User is not authenticated.');
          return;
        }

        const response = await axios.get(`http://localhost:5000/allBooks?page=${page}&pageSize=${pageSize}`, {
          headers: {
            Authorization: token,
          }
        });
        console.log(response.status, response)
        if (response.status == 404) {

          alert("No Books Found")
          return;

        }

        setBooks(response.data.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, [page, pageSize]);

  return (
   
    <div className="container mt-5" >
      <nav class="navbar navbar-expand-lg navbar-light bg-body-tertiary">

        <div class="container-fluid">


          <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <h2>All Books</h2>

          </div>

          <div class="d-flex align-items-center">
            <div class="dropdown">
              
            <button className="btn btn-primary btn-sm mx-5" type="button" onClick={handleSearch}>Search</button>
              <button className="btn btn-warning btn-sm mx-5" type="button" onClick={handleLogout}>Log Out</button>
              <a class="navbar-brand mt-2 mt-lg-0" href="#">
              <img
                src=""
                height="15"
                alt="user"
              />
            </a>
            </div>
          </div>
        </div>
      </nav>


      <table className="table">
        <thead>
          <tr>
            <th>Book ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Published Year</th>
            <th>Quantity Available</th>
            <th>Author Name</th>
            <th>Genre ID</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(books) && books.map((book, index) => (
            <tr key={index}>
              <td>{book.book_id}</td>
              <td>{book.title}</td>
              <td>{book.description}</td>
              <td>{book.published_year}</td>
              <td>{book.quantity_available}</td>
              <td>{book.author_name}</td>
              <td>{book.genre_id}</td>
              <td><img src={`http://localhost:5000${book?.image}`} alt="Book Image" style={{ width: '50px', height: '50px' }} /></td>
              <td>
                <button className="btn btn-primary btn-sm mx-2" onClick={() => handleEdit(book.book_id)}>Edit</button>
                <button className="btn btn-danger btn-sm mx-2" onClick={() => handleDelete(book.book_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-primary btn-sm" type="button" onClick={handleClick}>Add Book</button>
      <button className="btn btn-primary btn-sm mx-3" type="button" onClick={handleAllAuthors}>All Author</button>


      <button className="btn btn-primary btn-sm mx-5" type="button" onClick={handlePreviousPage} disabled={page === 1}>Previous Page</button>
      <span className="mx-2">Page {page}</span>
      <button className="btn btn-primary btn-sm mx-5" type="button" onClick={handleNextPage}>Next Page</button>
    </div>
  );
};

export default AllBook;
