import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.png'
const AddProduct = () => {
    const [image,setImage] = useState(false);
    const imageHandler = (e) =>{
        setImage(e.target.files[0]);
       
    }
    const [productdDetails,setProductDetails] = useState({
        name:"",
        old_price:"",
        image:"",
        new_price:"",
        category:"Televisions"
    })
    const productHandler = (e)=>{
        setProductDetails({...productdDetails,[e.target.name]:e.target.value})
        
    }
    const AddProduct = async () => {
        console.log(productdDetails)
        let responseData;
        let product = productdDetails;
        let formData = new FormData();
        formData.append('product',image);

        await fetch('http://localhost:4000/upload',{
         method:'POST',
         headers:{
            Accept:'application/json'
         },
         body:formData,
        }).then((resp)=>resp.json()).then((data)=>responseData=data)
        if(responseData.success){
            product.image=responseData.image_url;
            console.log(product )
            await fetch('http://localhost:4000/addproduct',{
                method:'POST',
                 headers:{
                    Accept:'application/json',
                   'Content-Type':'application/json',
                },
                body:JSON.stringify(product),
                
        }) .then((resp)=>resp.json()).then((data)=>{
            data.success?alert("product added"):alert("failed")
        })
    }}
  return (
    <div className='add-product'>
        <div className="addproduct-itemfield">
            <p>Product Name</p>
            <input value={productdDetails.name} onChange={productHandler} type='text' placeholder='' name='name'></input>
         </div>
         <div className="addproduct-price">
            <div className="addproduct-itemfields">
                <p>Price</p>
                <input value={productdDetails.old_price} onChange={productHandler} type='text' name='old_price' placeholder=''></input>
            </div>
            <div className="addproduct-itemfields">
                <p>Offer Price</p>
                <input value={productdDetails.new_price} onChange={productHandler} type='text' name='new_price' placeholder=''></input>
            </div>
         </div>
         <div className="addproduct-itemfield">
            <p>Product Category</p>
            <select name='category' value={productdDetails.category} onChange={productHandler} className='add-product-selector'>
                <option value="televisions">Televisions</option>
                <option value="mobiles">Mobiles</option>
                <option value="audio&gaming">Audio&Gaming</option>
            </select>
         </div>
         <div className="addproduct-itemfield">
            <label htmlFor="file-input">
                <img src={image?URL.createObjectURL(image):upload_area} className='addproduct-thumbnail-img' alt='' ></img>
           
           
            </label>
            <input onChange={imageHandler}type='file' name='image' id='file-input' hidden />
         </div>
         <button onClick={()=>{AddProduct()}} className='addproduct-btn' >Add</button>
    </div>
  )}

export default AddProduct