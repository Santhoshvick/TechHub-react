/* eslint-disable no-unused-vars */
import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AddProduct from '../AddProduct/AddProduct'
import ListProduct from '../ListProduct/ListProduct'

const Admin = () => {
  return (
    <div>
      <Sidebar />
      
      <Routes>
        <Route path='/addproduct' element={<AddProduct />}></Route>
        <Route path='/listproduct' element={<ListProduct />}></Route>
      </Routes>
     
    </div>
  )
}

export default Admin
