import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Import CSS file if needed
import AddBook from './components/AddBook'; // Import your component

ReactDOM.render(
  <React.StrictMode>
    <AddBook />
  </React.StrictMode>,
  document.getElementById('root')
);
