const jwt = require("jsonwebtoken")


const generateToken = (payload)=>{
    try{
    console.log(payload)
    const token = jwt.sign({payload}, process.env.SECRET_KEY,{expiresIn: '5'} )
    return token
} catch (error){
    console.log(error)
}
}

const verifyToken = (token)=>{
    try{
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY, )
        const email = decodedToken.payload

        return emailge.getItem('token')
    } catch (error){
        console.log(error)
        if(error.name == "TokenExpireError"){
            throw new Error("Session Expired Please Login Again")
        }
        throw new Error("Please Login To Continue")
    }
}

module.exports = {generateToken, verifyToken}