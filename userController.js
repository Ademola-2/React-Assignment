const userModel = require("../models/userModel")
const bcryptjs = require("bcryptjs")
const { generateToken } = require("../services/sessionService")
const { cloudinary } = require("../utils/cloudinaryConfig")
const { sendMail } = require("../utils/mailer")


const signup = async(req,res)=>{
    try {
        const {username, email, password} = req.body

        const checkExistingDetails = await userModel.findOne({
            $or:[{email:email}, {username:username}]
        })
        if (checkExistingDetails){
            return res.status(409).send({message : "Email or Username already in use"})
        }
        const result = await userModel.create({username, email, password})
        if (!result) {
            return res.status(400).send({message:"Error creating user"})
        }
        sendMail(email, username)
        return res.status(201).send({message:"Account created successfully", result})
    } catch (error) {
        console.log(error)
        return res.status(500).send({error})
    }
}




const signin = async(req,res)=>{
    try {
        const {email, password} = req.body
        const result = await userModel.findOne({email})
        const compare = await bcryptjs.compare(password, result.password)
        console.log(compare)
        if (!result || !compare) {
            return res.status(401).send({message:" Invalid Email or password"})
        }
        const token = generateToken(email)

        return res.status(200).send({message:`Welcome ${result.username}`, result ,  token})
    } catch (error) {
        console.log(error)
        return res.status(500).send({error})
    }
}



const verifyUserToken = async (req, res, next) => {
    try {
        const auth = req.headers.authorization;
        console.log(auth);

        if (!auth || !auth.startsWith("Bearer ")) {
            return res.status(401).send({ message: "Unauthorized" });
        }

        const token = auth.split(" ")[1];

        if (!token) {
            return res.status(401).send({ message: "Unauthorized" });
        }

        const userEmail = verifyToken(token);

        if (!userEmail) {
            return res.status(401).send({ message: "Unauthorized" });
        }

        const user = await userModel.findOne({ email: userEmail });

        if (!user) {
            return res.status(401).send({ message: "Unauthorized" });
        }

        console.log('user', user);
        return res.status(200).send({ message: `User Verification Successful`, user });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error });
    }
};

const imageUpload = async (req, res) => {
    try {
        const file = req.file; 

        if (!file) {
            return res.status(400).send({ message: "No file provided" });
        }

        const result = await cloudinary.uploader.upload(file.path);
        const url = result.secure_url;

        console.log(result);
        return res.status(200).send({ message: `Image uploaded successfully`, url });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error });
    }
};


module.exports = {signup, signin, verifyUserToken, imageUpload}