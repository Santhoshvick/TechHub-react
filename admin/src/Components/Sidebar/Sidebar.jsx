/* eslint-disable no-unused-vars */
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li className="sidebar-item">
          <NavLink to={"/addproduct"}>Add Product</NavLink>
        </li>
        <li className="sidebar-item">
          <NavLink to={"/listproduct"}>List Products</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
