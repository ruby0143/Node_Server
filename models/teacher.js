let mongoose=require("mongoose")
let teacherSchema=new mongoose.Schema(
    {
        username:String,
        password:String,
        mobile:Number
    }
)
module.exports=mongoose.model("teacher",teacherSchema)
