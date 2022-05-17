let db=require("../configs/db")
let teacher=require("../models/teacher")
let question=require("../models/question")
let jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt");
let mongoose=require("mongoose")
var axios = require('axios');
let promise=global.Promise
const tokenscret="mysecrete"
function generatetoken(user){
    return jwt.sign({data:user},tokenscret,{expiresIn:'24h'})

}
let signup=function(req,res){
    var salt=bcrypt.genSaltSync(10);
    var password=bcrypt.hashSync(req.body.password,salt);
    console.log(password)
    const teacher1=new teacher({
        username:req.body.username,
        password:password,
        mobile:req.body.mobile
    })
    teacher1.save().then(teacher=>res.status(200).json({token:generatetoken(teacher)}))
    
    
}

let signin=function(req,res){
    teacher.findOne({username:req.body.username},{}).then(result=>{
            bcrypt.compare(req.body.password,result.password,function(err,data){
            if(err)
            {
                console.log(err)
            }
            if(data)
            {
                console.log(data)
                res.status(200).json({token:generatetoken(data)})
            }
            else
            {
                res.send("invalid password")
            }
        })
                   
        
            
    }).catch(error=>console.log(error))
}

let addqn = function(req,res){
    const qn = new question({
        qid : req.body.id,
        question : req.body.question,
        desc : req.body.desc,
        userip : req.body.userip,
        expop : req.body.expop,
        hdip : req.body.hdip,
        hdop : req.body.hdop
    });
    qn.save().then(qn=>{
        console.log("Successfuly Posted")
        res.status(200).json({message : "Successfully posted"})})
}

let deleteqn = function(req,res){
    question.findOneAndDelete({qid : req.body.qid},{}).then(result =>{
        res.status(200).json({message : "Successfully deleted"})
    })
}

let getqn = function(req,res){
    question.find({}).then(result=>{res.json(result)}).catch(error=>{console.log(error)})
}

module.exports={signup,signin,addqn,deleteqn,getqn}