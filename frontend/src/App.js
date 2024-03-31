import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Search from '../src/components/Search';
import Login from '../src/components/Login';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  );
}

export default App;
