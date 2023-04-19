import React from 'react'
import './App.css'
import {
  BrowserRouter,
  Routes,
  Route 
  } from 'react-router-dom'
import Dashboard from './views/Dashboard'
import Login from './views/Login'
import RegisterUser from './views/RegisterUser'
import RegisterAdmin from './views/RegisterAdmin'
import Profile from './views/Profile'
import Update from './views/Update'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Login/>} path="/login" default/>
          <Route element={<RegisterUser/>} path="/register-user"/>
          <Route element={<RegisterAdmin/>} path="/register-admin"/>
          <Route element={<Dashboard/>} path="/dashboard"/>
          <Route element={<Profile/>} path="dashboard/profile/user/:id"/>
          <Route element={<Update/>} path="/update/user/:id"/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
