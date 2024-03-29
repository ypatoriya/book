import React, { useState } from 'react';
import axios from 'axios';

const AddBook = () => {
  // State variables to hold form field values
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    published_year: '',
    quantity_available: '',
    author_id: '',
    genre_id: '',
  });
 
  // Function to handle form field changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Send form data to backend for registration
      //const response = await axios.post('http:localhost:5000/addBook', formData);
        
      axios({
        method: 'post',
        url: 'http://localhost:5000/addBook',
        data: {
          ...formData
        },
        validateStatus: (status) => {
          return true; 
        },
      }).catch(error => {
          console.log(error);
      }).then(response => {
          console.log(response);
      });
      //console.log(response.data); // Handle response from backend
    } catch (error) {
      console.error('Error registering book:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name="title" value={formData.title} onChange={handleInputChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea className="form-control" id="description" name="description" value={formData.description} onChange={handleInputChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="publishedYear" className="form-label">Published Year</label>
          <input type="text" className="form-control" id="publishedYear" name="published_year" value={formData.publishedYear} onChange={handleInputChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="quantityAvailable" className="form-label">Quantity Available</label>
          <input type="number" className="form-control" id="quantityAvailable" name="quantity_available" value={formData.quantityAvailable} onChange={handleInputChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="authorId" className="form-label">Author ID</label>
          <input type="text" className="form-control" id="authorId" name="author_id" value={formData.authorId} onChange={handleInputChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="genreId" className="form-label">Genre ID</label>
          <input type="text" className="form-control" id="genreId" name="genre_id" value={formData.genreId} onChange={handleInputChange} />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default AddBook;
