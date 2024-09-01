import React, { useEffect, useState } from 'react';
import './ListProduct.css';

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);

  const fetchData = async () => {
    await fetch('http://localhost:4000/allproducts')
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  const removeProduct = async (id) => {
    await fetch('http://localhost:4000/removeproduct',{
     method:'POST',
     headers:{
      Accept:'Application/json',
      'Content-type':'application/json',
     },
     body:JSON.stringify({id:id})
    })
    await fetchData();
  }

  

  return (
    <div className='listproduct'>
      <h1>All Product List</h1>
      <div className="listproduct-format-main">
        <p className="header-product">Products</p>
        <p className="header-title">Title</p>
        <p className="header-old-price">Old Price</p>
        <p className="header-new-price">New Price</p>
        <p className="header-category">Category</p>
        <p className="header-delete">Delete</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product, index) => (
          <div key={index} className="listproduct-format">
            <img src={product.image} alt={product.name} className="listproduct-product-icon" />
            <p className="product-name">{product.name}</p>
            <p className="old-price">₹{product.old_price}</p>
            <p className="new-price">₹{product.new_price}</p>
            <p className="product-category">{product.category}</p>
            <img 
              className="listproduct-remove-icon" onClick={()=>{removeProduct(product.id)}}
              src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-delete'><path d='M10 5a2 2 0 0 0-1.344.519l-6.328 5.74a1 1 0 0 0 0 1.481l6.328 5.741A2 2 0 0 0 10 19h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z'/><path d='m12 9 6 6'/><path d='m18 9-6 6'/></svg>" 
              alt="Delete" 
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListProduct;