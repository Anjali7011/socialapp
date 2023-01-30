const express = require("express")
const mongoose = require("mongoose")
const route = require("./routes/route")
// const multer = require("multer")

const app = express()
// app.use(multer().any())

app.use(express.json())

app.use("/user", route)



mongoose.connect("mongodb+srv://Lucifer:lucifer123@mycluster.bdqxxtr.mongodb.net/SocialMedia?retryWrites=true&w=majority",{
    useNewUrlParser:true
}).then(()=>console.log("MongoDB Connected"))
.catch((err)=>console.log(err))

app.listen(3001, ()=>{
    console.log("Server runnig on port",3001)
})