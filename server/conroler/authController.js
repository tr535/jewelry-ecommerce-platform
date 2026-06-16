const jwt=require("jsonwebtoken")
const User=require('../models/User')
const bcrypt=require("bcrypt")
const register=async (req,res)=>{
    const {phone,email,name,password,username,roles}=req.body
    if(!name || !password || !username)
        return res.status(400).json({Message:"name or password or username is required"})
    const findone=await User.findOne({username}).lean()
    if(findone)
        return  res.status(409).json({Message:"duplicate username"})
    const hashPassword=await bcrypt.hash(password ,10)
const userObject={phone,email,name,password:hashPassword,username,roles}
const creatUser=await User.create(userObject)
if(creatUser)
    return res.status(201).json({Message:`user is create ${creatUser}`})
else
    return res.status(400).json({Message:"user is not create"})
}

const login= async (req,res)=>{
const {username,password}=req.body
const user = await User.findOne({username:username})

if(!user)
    return res.status(401).json({Message:"user is not difind"})
const match = await bcrypt.compare(password, user.password)
if(!match)
    return res.status(400).json({Message:"eror user not founded"})
const userdetailes= {_id:user._id,name:user.name,
    roles:user.roles, user:user.username,
    email:user.email}
    const token=jwt.sign(userdetailes,process.env.TOKEN_SECRET)
    console.log(token);
    res.json({token})
}

module.exports={register,login}