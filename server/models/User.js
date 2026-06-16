const mongoose=require("mongoose")
const schem=mongoose.Schema
const UserSechema=mongoose.schem=({
    username:{
        type:String,
        required: true,
        unique: true,
        lowercase:true
    },
    password:{
        type:String,
        required: true,
        unique: true,
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        lowercase:true
    },
    phone:{
        type:String
    },
    roles:{
        type:String,
        enum:["User","Admin"],
        default:"User"
    },

})
module.exports=mongoose.model("User",UserSechema)