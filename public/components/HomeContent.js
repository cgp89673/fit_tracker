import React from 'react';
import './HomeContent.css';
import Home from '../page';
import Button from './Button';

const HomeContent = () => {
    return (
      <div className="main">
        
        <div className= 'signup'>
        <Button width = '150px' height = '75px'> Sign-Up </Button>
        </div>
        <p>Already a member?</p>
        
        <div className= 'login'>
        <Button width="100px" height="120%" > Login </Button>
        </div>
      </div>
    );
  };
  
  export default HomeContent;