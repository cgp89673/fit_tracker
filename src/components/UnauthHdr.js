//import React from 'react';
//import './Hdr.css';
//import Button from './Button';
//import { Link } from 'react-router-dom';

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Hdr.css'; // Assuming this file is already linked correctly

const UnauthHdr = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('auth-token');
   
    // Redirect to login page
    navigate('/login');
  };

  return (
    <header className="hdr">
      <Link to="/" className="hdr-logo">
        <h1><i>Dawg</i>Walk</h1>
      </Link>
    </header>
  );
};

export default UnauthHdr;
