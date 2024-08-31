/* eslint-disable no-unused-vars */
import React from 'react';
import './Navbar.css';
import imglogo from '../../assets/arrow.png'

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="company-name">Tech Hub</div>
      <div className="profile">
        <img src={imglogo} alt="Profile" />
      </div>
    </div>
  );
};

export default Navbar;
