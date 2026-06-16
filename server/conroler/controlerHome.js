const Home =require("../models/Home")
const Bascet=require("../models/Bascet")
const getall=("/",async (req,res)=>{
    const products=await Home.find()
    if(!products)
        return res.status(400).json({Message:"product is not created"})
    res.json(products)
})
const createproduct= ('/',async (req,res)=>{
    const {name,price,description,category ,image,rating,quantity}=req.body
    console.log(req.body);
    if(!name || !price || !category || !image )
        return res.status(400).json({Message:"name or price or category is required"})
    const newproduct= await Home.create({name,price,description,category,image ,rating,quantity})
    if(!newproduct)
        return res.status(400).json({Message:"product is not created"})
    res.json(newproduct)
})

const updateproduct=("/",async (req,res)=>{
    const {_id,name,price,description,category,image, quantity,rating}=req.body
    if(!_id || !name || !price || !category || !image)
        return res.status(400).json({Message:"_id or name or price or category or image is required"})
    const product=await Home.findById(_id).exec()
    if(!product)
        return res.status(400).json({Message:"product is not defind"})
    product.name=name
    product.price=price
    product.description=description
    product.category=category
    product.image=image
    product.quantity=quantity
    product.rating=rating
    const update=await product.save()
    res.json(update)

})

const deleteproduct=("/",async (req,res)=>{
    const {id}=req.params
    const product=Home.findById(id)
   console.log(product);
   
    const productbascet=Bascet.findOne({prudact:id})
    console.log(productbascet);
    
    if(!product )
       return res.status(400).json({Message:"product is not found"})
    const a = await product.deleteOne()
    const b=await productbascet.deleteOne()
    if(!a || !b)
        return res.status(400).json({Message:"product is not deleted"})
    res.json({Message:"deleted"})
})
module.exports={createproduct,updateproduct,deleteproduct,getall}