import React, { useEffect, useState } from 'react';

import Button from 'react-bootstrap/Button';

import { Link, useNavigate } from 'react-router-dom';



const Home = ({ socket }) => {
  const [nav, setNav] = useState('');

  const navigate = useNavigate();

  useEffect(() => {

    socket.on('join', (email) => {
      const newNav = `${email} joined!`;
      setNav((prevNav) => [newNav, ...prevNav]);
    });



  }, []);

    const handleLogout = () => {
          
        sessionStorage.removeItem("userInfo");
        navigate("/login");
        
    
      };


  return (
    <div>
        <Button onClick={handleLogout}>
                          Logout
                        </Button>
       <h1>Welcome to the Chat App</h1>
      <div>{nav}</div>
       </div>
  )
}

export default Home
