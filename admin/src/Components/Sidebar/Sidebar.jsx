/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li className="sidebar-item">
          <Link to="/addproduct">Add Product</Link>
        </li>
        <li className="sidebar-item">
          <Link to="/listproduct">List Products</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
