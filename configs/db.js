let mongoose=require("mongoose")
const url = `mongodb+srv://nagaraju:Thandus@cluster0.vwm7k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
mongoose.connect(url)
let db=mongoose.connection
db.on("error",()=>{console.log("error in establishing connection")})
db.once("open",()=>{console.log("connection established to database")})
