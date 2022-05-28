let db=require("../configs/db")
let user=require("../models/user")
let jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt");
let mongoose=require("mongoose")
const question = require('../models/question')
var axios = require('axios');
const { enabled } = require("express/lib/application");
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
      console.log(response.data.sourceCode);
    //   res.send(response.data)
      const output = response.data.output;
      console.log(output)
      if(output){
          console.log(output)
        //   question.findOne({question:req.body.question},{}).then(qn=>{
        //       console.log(qn.expop);
        //     if(qn.expop === output){
        //         res.json({question : qn, message : "successfully executed"})
        //     }
        //     else{
        //         res.send("wrong output");
        //     }
        //   })
      }
      else{
          console.log(response.data.error);
      }
    })
    .catch(function (error) {
      console.log(error);
    }); 
}

module.exports={signup,signin,users,run}

