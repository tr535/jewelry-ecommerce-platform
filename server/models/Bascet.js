const timespan = require("jsonwebtoken/lib/timespan")
const mongoose=require("mongoose")

const bascetschema=mongoose.Schema({
    username: { 
         type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    },
    quentity:{
            type:mongoose.Schema.Types.Number,
            min:1,
            max:100,
            default:1
        },
    prudact:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Home' 
    },
    createdAt: { type: Date, default: Date.now }
},{timespan:true})
module.exports=mongoose.model("Bascet",bascetschema)
