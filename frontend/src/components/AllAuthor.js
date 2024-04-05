import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const AllAuthors = () => {
  const [author, setAuthors] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/addAuthor');
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

  const handleEdit = (authorId) => {
    navigate('/updateBook')
    console.log('Edit author with ID:', authorId);
  };

  const handleShowAllBook = () => {
    navigate('/allBooks');
  }
  const handleDelete = (authorId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this author?');
    if (!isConfirmed) {
      return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', `http://localhost:5000/deleteAuthor/${authorId}`, true);

    const token = localStorage.getItem('accessToken');
    xhr.setRequestHeader('Authorization', token);

    xhr.onload = function () {
      if (xhr.status === 200) {
        console.log('Book deleted successfully');
      } else {
        console.error('Failed to delete author. Status:', xhr.status);
      }
    };
    xhr.onerror = function () {
      console.error('Error deleting author. Network error');
    };
    xhr.send();
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
         navigate("/")
        }

        const response = await axios.get(`http://localhost:5000/allAuthors?page=${page}&pageSize=${pageSize}`, {
          headers: {
            Authorization: token,
          }
        });
        console.log(response.status, response)
        if (response.status == 404) {

          alert("No Books Found")
          return;

        }

        setAuthors(response.data.data);
      } catch (error) {
        console.error('Error fetching authors:', error);
      }
    };

    fetchBooks();
  }, [page, pageSize]);




  return (
    <div className="container mt-5">
      <nav class="navbar navbar-expand-lg navbar-light bg-body-tertiary">

        <div class="container-fluid">


          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <h2>All Authors</h2>

          </div>

          <div class="d-flex align-items-center">
            <div class="dropdown">
              <button type="submit" className="btn btn-primary btn-sm mx-5" onClick={handleShowAllBook}>Show All Books</button>
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
            <th>Author ID</th>
            <th>Name</th>
            <th>Biography</th>
            <th>Genre</th>

          </tr>
        </thead>
        <tbody>
          {Array.isArray(author) && author.map((author, index) => (
            <tr key={index}>
              <td>{author.author_id}</td>
              <td>{author.author_name}</td>
              <td>{author.biography}</td>
              <td>{author.genre}</td>
              <td>
                <button className="btn btn-primary btn-sm mx-2" onClick={() => handleEdit(author.author_id)}>Edit</button>
                <button className="btn btn-danger btn-sm mx-2" onClick={() => handleDelete(author.author_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-primary btn-sm" type="button" onClick={handleClick}>Add Author</button>

      <button className="btn btn-primary btn-sm mx-5" type="button" onClick={handlePreviousPage} disabled={page === 1}>Previous Page</button>
      <span className="mx-2">Page {page}</span>
      <button className="btn btn-primary btn-sm mx-5" type="button" onClick={handleNextPage} disabled={author.length < pageSize}>Next Page</button>
    </div>
  );
};

export default AllAuthors;
