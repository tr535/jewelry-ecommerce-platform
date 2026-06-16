const express=require("express")
const router=express.Router()
const authCuntroller=require('../conroler/authController')

router.post("/register",authCuntroller.register)
router.post("/login",authCuntroller.login)

module.exports = router


