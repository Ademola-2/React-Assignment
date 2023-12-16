const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
const userRouter = require("./routes/userRouter")
require("dotenv").config()



app.use(cors({origin: "*"}))

app.use(express.urlencoded())
app.use(express.json())


app.use("/users", userRouter)



const connect = () =>{
    mongoose.connect(process.env.MONGODB_URI).then(()=>{
        console.log("Connected to Mongoose")
    }).catch((err)=>{
        console.log(err);
    })
}

connect()

app.listen("3200", () =>{
    console.log("app listening on port 3200")
})

console.log("I am a backend developer");