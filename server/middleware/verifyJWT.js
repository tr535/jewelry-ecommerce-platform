const jwt=require("jsonwebtoken")
const verifyJWT=(req,res,next)=>{
    const aothHeder=req.headers?.Authorization || req.headers?.authorization

    if(!aothHeder?.startsWith("Bearer "))
        return res.status(401).json({ message: 'token not found'})
    const token=aothHeder.split(" ")[1]
    jwt.verify(
        token,
        process.env.TOKEN_SECRET,
        (err,decoded)=>{
            if (err) 
                return res.status(403).json( {message :'Forbidden' })
        req.user=decoded
        next()

        }
    )
}
module.exports=verifyJWT