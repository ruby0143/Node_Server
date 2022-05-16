let express=require("express")
let db=require("./configs/db")
let user=require("./routes/user.js")
let cors = require('cors');
let app=express()
app.listen(process.env.PORT || 3000, function() {
    console.log("Server started on port 3000");
  });
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors());
app.use("/user",user)
app.get("/",(req,res)=>{
    console.log("server set");
});