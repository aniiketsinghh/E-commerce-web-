import Product from "../models/productModel.js";

export const createProduct=async(req,res)=>{
    console.log("haa yha tk shi hai");
    try{
        const {title,description,price,image,category,quantity}=req.body;
        if(!title || !description || !price || !image || !category || !quantity){
            return res.status(400).json({message:"Please enter all fields",success:false});
        }
        const product=new Product({
            title,
            description,
            price,
            image,
            category,
            quantity
        });
        await product.save();
        return res.status(200).json({message:"Product created successfully",success:true,product});
    }catch(err){
        console.log(err.message);
        return res.status(500).json({message:"Error in create product from backend",success:false});
    }}


export const getAllProducts=async(req,res)=>{
     try{
        const product=await Product.find().sort({createdAt:-1});
        return res.status(200).json({message:"All products fetched successfully",success:true,product});
    }catch(err){
        console.log(err.message);
        return res.status(500).json({message:"Error in fetch all product from backend",success:false});
    }}

export const getProductById=async(req,res)=>{
     try{
        const product=await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({message:"Product not found",success:false});
        }
        return res.status(200).json({message:"Product fetched successfully",success:true,product});

    }catch(err){
        console.log(err.message);
        return res.status(500).json({message:"Error in fetch product by id from backend",success:false});
    }}

export const updateProduct=async(req,res)=>{
     try{
            const updateProduct=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true});
            if(!updateProduct){
                return res.status(404).json({message:"changes not happened",success:false});
            }
            return res.status(200).json({message:"Product updated successfully",success:true,updateProduct});
    }catch(err){
        console.log(err.message);
        return res.status(500).json({message:"Error in update product by id from backend",success:false});
    }
}

export const deleteProduct=async(req,res)=>{
     try{
        const deleteProduct=await Product.findByIdAndDelete(req.params.id);
        if(!deleteProduct){
            return res.status(404).json({message:"Product not found",success:false});
        }
        return res.status(200).json({message:"Product deleted successfully",success:true});
    }catch(err){
        console.log(err.message);
        return res.status(500).json({message:"Error in delete product by id from backend",success:false});
    }
}
