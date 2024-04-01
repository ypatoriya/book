import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Search from '../src/components/Search';
import Login from '../src/components/Login';
import AddBook from './components/AddBook';
import AllBook from './components/AllBook';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/search" element={<Search />} />
      <Route path="/addBook" element={<AddBook/>}/>
      <Route path="/allBooks" element={<AllBook/>}/>
    </Routes>
  );
}

export default App;
