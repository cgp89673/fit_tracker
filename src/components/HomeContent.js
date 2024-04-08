import React from 'react';
import './HomeContent.css';
import { Link } from 'react-router-dom';
import Button from './Button';

const HomeContent = () => {
    return (
      
      <div className="main">
        
        <div className= 'signup'>
        <Button width = '150px' height = '75px'> <Link to="/signup">Sign Up</Link> </Button>
        </div>
        <p>Already a member?</p>
        
        <div className= 'login'>
        <Button width="100px" height="120%" > <Link to="/login">Login</Link> </Button>
        </div>

        <div>

        </div>
      </div>
    );
  };
  
  export default HomeContent;