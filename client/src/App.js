import React, { useState, useEffect } from 'react';

import './App.css';
import Home from './components/Home';

import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';

import socketIO from 'socket.io-client';

const socket = socketIO.connect('http://localhost:5000');

function App() {
  useEffect(() => {
    
    
    socket.on('connect', () => {
      console.log('Socket connected:', socket.connected);
    });
    
  }, []);


  return (
    <div className="App">
       <Router>
      <div>
        
         

        <Routes>
          <Route path="/" element={<Login socket={socket} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login socket={socket} />} />
          <Route path="/home" element={<Home  socket={socket} />} />

          






        </Routes>
      </div>
    </Router>



    </div>
  );
}

export default App;
