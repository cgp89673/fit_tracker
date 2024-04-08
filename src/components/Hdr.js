//import React from 'react';
//import './Hdr.css';
//import Button from './Button';
//import { Link } from 'react-router-dom';

//const Hdr = () => {
  
  //return (
    //<div className="hdr">
      //<h1><i>Dawg</i>Walk</h1>
      //<ul>
        //<h2><Link to="/about">Add a Run!</Link></h2>
      //</ul>
   // </div>
  //);
//};

//export default Hdr;
import React from 'react';
import { Link } from 'react-router-dom';
import './Hdr.css'; // Assuming this file is already linked correctly

const Hdr = () => {
  return (
    <header className="hdr">
      <Link to="/" className="hdr-logo">
        <h1><i>Dawg</i>Walk</h1>
      </Link>
      <nav className="hdr-nav">
        
        <Link to="/add-workout" className="hdr-link">Add a Workout</Link>
        <Link to="/workout-history" className="hdr-link">Workout History</Link>
      </nav>
    </header>
  );
};

export default Hdr;
