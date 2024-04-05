import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import './addUser.css'

const AddBook = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({
        author_name: '',
        biography: '',
        genre: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const navigate = useNavigate();

    const handleAllAuthors = (event) => {
        navigate('/allAuthors');
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formData.author_name || !formData.biography || !formData.genre) {
            setErrorMessage('All fields are required!');
            return;
        }

        try {

            const token = localStorage.getItem('accessToken');
            if (!token) {
                console.log('No token found. User is not authenticated.'); 
         navigate("/")
                
            }

            const response = await axios.post('http://localhost:5000/addAuthor', formData, {
                headers: {
                    'Authorization': localStorage.getItem('accessToken'),
                    'Content-Type': 'application/json',
                }, withCredentials: true
            });

            if (response.status === 200) {
                console.log('Book added successfully.');
                navigate('/allAuthors');
            } else {
                console.log(`Unexpected status code: ${response.status}`);
            }
        } catch (error) {
            console.error('Error registering book:', error.message || JSON.stringify(error));
        }
    };
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2>Add Author</h2>
                    {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="author_name" className="form-label">Name</label>
                            <input type="text" required className="form-control" id="name" name="author_name" value={formData.author_name} onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="biography" className="form-label">Biography</label>
                            <input type="biography" required className="form-control" id="biography" name="biography" value={formData.biography} onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="genre" className="form-label">Genre</label>
                            <input type="genre" required className="form-control" id="genre" name="genre" value={formData.genre} onChange={handleInputChange} />
                        </div>

                        <div className='button'>

                            <button
                                className="btn btn-primary btn-sm mx-1 Register"
                                type="button"
                                onClick={handleSubmit}
                            >
                                Add Author
                            </button>
                            <button
                                className="btn btn-primary btn-sm mx-1 Login"
                                type="button"
                                onClick={handleAllAuthors}
                            >
                                Show All Authors
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddBook;
