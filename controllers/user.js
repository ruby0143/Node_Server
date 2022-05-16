let db=require("../configs/db")
let user=require("../models/user")
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
    const user1=new user({
        username:req.body.username,
        password:password,
        mobile:req.body.mobile
    })
    user1.save().then(user=>res.status(200).json({token:generatetoken(user)}))
    
    
}

let signin=function(req,res){
    user.findOne({username:req.body.username},{}).then(result=>{
            bcrypt.compare(req.body.password,result.password,function(err,data){
            if(err)
            {
                console.log(err)
            }
            if(data)
            {
                console.log(data)
                res.status(200).json({token:generatetoken(user)})
            }
            else
            {
                res.send("invalid password")
            }
        })
                   
        
            
    }).catch(error=>console.log(error))
}
let users=function(req,res){
        
        user.find({}).then(result=>{res.json(result)}).catch(error=>{console.log(error)})
        
}
let run=function(req,res)
{
    
    var data = JSON.stringify({
               "code":req.body.code,
               "language":req.body.language,
               "input":req.body.input
               });
    
    
    var config = {
      method: 'post',
      url: 'https://codexweb.netlify.app/.netlify/functions/enforceCode',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log(response.data);
      res.send(response.data)
    })
    .catch(function (error) {
      console.log(error);
    }); 
}

module.exports={signup,signin,users,run}