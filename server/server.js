//יבוא חבילות

require("dotenv").config()
const express=require("express")
const cors=require("cors")
const corsOptions = require("./config/corsOptions")
const  mongoose = require("mongoose")
const connectDB=require("./config/dbconn")
const path = require('path');
//מימוש החבילות
const app=express()
connectDB()
app.use(cors(corsOptions))
app.use(express.json())
app.use('/product', express.static(path.join(__dirname, 'public/product')));


const PORT=process.env.PORT || 1000
// יבוא ושימוש בrout
app.use("/api/authRout",require("./routes/authRout"))
app.use("/api/home",require("./routes/home"))
app.use("/api/bascet",require("./routes/bascet"))
app.get('/',(req,res)=>{
    res.send("hello")
})
mongoose.connection.once('open',()=>{
    console.log('connected to DB');
     app.listen(PORT, ()=>console.log(`server running on ${PORT}`))
})
mongoose.connection.on('error',err=>{
    console.log(err);  
})
