const mongoose =require("mongoose")
const homeSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
         required:true
    },
    description:{
       type:String  
    },
    image:{
        type:String
    },
    category :{
        type:[String],
         enum:["Ring","Necklace","Bracelet","other"],
        required:true
    },
    rating:{
        type:Number,
        min:0,
        max:5,
        default:5
    },
    quantity:{
        type:Number,
        default:1,
        max:50
    }
},{timestamps:true})
module.exports=mongoose.model('Home',homeSchema)
