const express = require("express");
let token=require("../middleware/tokenverify")
let teacher=require("../controllers/teacher")
let router = express.Router()

router.post("/register",teacher.signup)
router.post("/login",teacher.signin)
// router.post("/addqns",token.verify,teacher.addqns)
router.post("/addqn",token.verify,teacher.addqn)
// router.put("/updateqn",token.verify,teacher.updateqn)
router.delete("/deleteqn",token.verify,teacher.deleteqn)
router.get("/getqn",token.verify,teacher.getqn)

router.get("/jwt",token.verify,(req,res)=>{
    res.status(200).json(req.user)
})

module.exports=router