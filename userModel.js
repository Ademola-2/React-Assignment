const mongoose = require("mongoose")
const bcryptjs = require("bcryptjs")




const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
})

userSchema.pre("save",function(next){
    let saltRound = 10
    console.log(this)
    if(this.password !== undefined){
        bcryptjs.hash(this.password, saltRound).then((hashedPassword)=>{
            console.log(hashedPassword)
            this.password = hashedPassword
            console.log(this)
            next()
        })
    }
})

const userModel = mongoose.models.user_tbs || mongoose.model("user_tbs", userSchema)

module.exports = userModel