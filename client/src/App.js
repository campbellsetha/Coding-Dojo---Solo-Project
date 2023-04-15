import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route 
  } from 'react-router-dom';
import Dashboard from './views/Dashboard';
import Login from './views/Login';
import RegisterUser from './views/RegisterUser';
import RegisterAdmin from './views/RegisterAdmin';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Login/>} path="/login" default/>
          <Route element={<RegisterUser/>} path="/register-user"/>
          <Route element={<RegisterAdmin/>} path="/register-admin"/>
          <Route element={<Dashboard/>} path="/dashboard"/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
