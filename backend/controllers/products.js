
const ProductSchema = require('../models/productModel')

const GetAllProducts = async(req , res)=>{
    const products = await ProductSchema.find({}).populate('reviews.userId', 'name')
    if (products.length === 0){
        return res.status(404).json({msg:'No products available'})
    }
    res.status(200).json({products:products})
}
const CreateProduct = async(req, res)=>{

    req.body.sellerId = req.user.id;
    const product = await ProductSchema.create(req.body)
    res.status(201).json({product:product})
}
const GetSingleProduct = async(req,res)=>{
    const product = await ProductSchema.find({_id:req.params.id}).populate('reviews.userId', 'name')
    if (!product){
        return res.status(401).json({msg:'Product Not Found'})
    }
    res.status(200).json({product:product})

}
const DeleteProduct = async(req,res)=>{
    const product = await ProductSchema.findByIdAndDelete({_id:req.params.id})
    if (!product){
        res.status(400).json({msg:'No products available with this id'})
    }
    res.status(200).json({product:product})
    
}
const UpdateProduct = async(req, res)=>{
    const product = await ProductSchema.findOneAndUpdate({_id:req.params.id} , req.body ,{new:true})
    if (!product){
        return res.status(401).json({msg:'Product Not Found'})
    }
    res.status(200).json({product:product})


}

const getSellerProducts = async (req, res) => {
  try {
    const { sellerId } = req.params;

    const products = await ProductSchema.find({ sellerId }).sort({ createdAt: -1 });

    res.status(200).json({ products });
  } catch (error) {
    console.error("Fetch Seller Products Error:", error);
    res.status(500).json({ message: "Failed to fetch products." });
  }
};
module.exports = {GetAllProducts , CreateProduct , GetSingleProduct , DeleteProduct , UpdateProduct , getSellerProducts}



