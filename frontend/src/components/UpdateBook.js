import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateBook = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [bookData, setBookData] = useState({});


  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const token = localStorage.getItem('accessToken');

        if (!token) {
          console.log('No token found. User is not authenticated.');
          navigate('/');
          return;
        }
        const response = await fetch(`http://localhost:5000/getBookById/${bookId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.status === 200) {
          const data = await response.json();
          setBookData(data.data[0]);
          console.log(data);
        } else if (response.status === 401) {
          console.log('Unauthorized access. Token may be invalid or expired.');
          navigate('/');
        } else {
          console.log('Error fetching book data. Status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching book data:', error);
      }
    };

    fetchBookData();
  }, [bookId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/updateBook/${bookId}`, {
        method: 'PUT',
        headers: {
          'Authorization': localStorage.getItem('accessToken'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });
      if (response.ok) {
        console.log('Book updated successfully');
        navigate('/allBooks');
      } else {
        console.error('Failed to update book:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  return (
    <div>
      <div className="container mt-5">
        <h2>Update Book</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="book_id" className="form-label">
              ID  
            </label>
            <input
              type="text"
              className="form-control"
              id="book_id"
              name="book_id"
              value={bookData.book_id || ''} // || operator to handle undefined values
              readOnly
            />
          </div>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name="title" value={bookData.title} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name="description" value={bookData.description} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="published_year" className="form-label">Published Year</label>
            <input type="text" className="form-control" id="published_year" name="published_year" value={bookData.published_year} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="quantity_available" className="form-label">Quantity Available</label>
            <input type="text" className="form-control" id="quantity_available" name="quantity_available" value={bookData.quantity_available} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="author_id" className="form-label">Author ID</label>
            <input type="text" className="form-control" id="author_id" name="author_id" value={bookData.author_id} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="genre_id" className="form-label">Genre ID</label>
            <input type="text" className="form-control" id="genre_id" name="genre_id" value={bookData.genre_id} onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-primary">Update Book</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBook;
