const verifyJWT=require("../middleware/verifyJWT")
const express=require("express")
const router=express.Router()
const bascetcontroller=require("../conroler/bascetcontroller")
router.use(verifyJWT)
router.get("/",bascetcontroller.getallBascet)
router.post("/addToBascet",bascetcontroller.addToBascet)
router.delete("/:id",bascetcontroller.deletefrombascet)
router.put("/updateQuentity",bascetcontroller.updateQuentity)

module.exports=router
