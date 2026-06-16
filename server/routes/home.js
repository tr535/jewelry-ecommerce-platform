const express =require("express")
const Router=express.Router();
const contrellerHome=require("../conroler/controlerHome")
const adnimMidell=require("../middleware/admin")
Router.get("/getall",contrellerHome.getall)
Router.use(adnimMidell)
Router.post("/createproduct",contrellerHome.createproduct)
Router.put("/updateproduct",contrellerHome.updateproduct)
Router.delete("/:id",contrellerHome.deleteproduct)
module.exports=Router
