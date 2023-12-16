 const { signup, signin, verifyUserToken } = require("../controllers/userController")

 const userRouter = require("express").Router()

 userRouter.post("/signup" , signup)
 userRouter.post("/signin" , signin)
 userRouter.post("/verify" , verifyUserToken)


 module.exports = userRouter