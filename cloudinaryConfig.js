const cloudinary = require("cloudinary")

cloudinary.config({
    cloud_name: 'dzs3vsnbw',
    api_key:process.env.CLODINARY_KEY,
    api_secret:process.env.CLOUDINARY_SECRET
})

module.exports = {cloudinary}