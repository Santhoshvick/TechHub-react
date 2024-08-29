const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { type } = require("os");
const { stringify } = require("querystring");
const { Key } = require("lucide-react");
app.use(express.json());
app.use(cors());

//db connection (mongodb)

mongoose.connect("mongodb+srv://shanmugamj735:mxLADHxu5NNwDOBl@cluster0.ifgfu8y.mongodb.net/e-commerce")

//api 
app.get("/",(req,res)=>{
   res.send("Express app is running")
})


app.listen(port,(err)=>{
  if(!err){
    console.log("ok "+port)
  }else{
    console.log("error:"+err)
  }
})

//img storage engine


const storage = multer.diskStorage({
    destination:'./upload/images',
    filename:(req,file,cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage})

//creating upload endpoint
app.use('/images',express.static('upload/images'))

app.post("/upload",upload.single('product'),(req,res)=>{
   res.json({
    success:1,
    image_url:`http://localhost:${port}/images/${req.file.filename}`
   })
})


//schema for creating products


const Product = mongoose.model("Product",{
    id:{
        type:Number,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    new_price:{
        type:Number,
        required:true,
    },
    old_price:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    availabe:{
        type:Boolean,
        default:true,
    },
})

app.post('/addproduct',async(req,res)=>{
     let products = await Product.find({});
     let id;
     if (products.length>0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id+1;
     }else{
        id=1;
     }
     const product = new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
     });
     console.log(product);
     await product.save();
     console.log("saved")
     res.json({
        success:true,
        name:req.body.name,
     })
})

//creating API for deleting products


app.post('/removeproduct',async (req,res)=>{
  await Product.findOneAndDelete({id:req.body.id});
  console.log("removed")
  res.json({
    success:true,
    name:req.body.name,
  })
})


//creating API for getting all products

app.get('/allproducts',async (req,res) => {
    let products = await Product.find({});
    console.log("all prod fetched")
    res.send(products);
})