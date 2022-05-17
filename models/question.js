let mongoose=require("mongoose")
let questionSchema=new mongoose.Schema(
    {
    qid : String,
	question : String,
	desc : String,
	userip : String,
	expop : String,
	hdip : String,
	hdop : String
    }
)

module.exports=mongoose.model("question",questionSchema)