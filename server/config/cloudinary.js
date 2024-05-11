const cloudinary = require("cloudinary").v2; //! Cloudinary is being required

exports.cloudinaryConnect =  async () => {
	try {
		 await cloudinary.config({
			//!    ########   Configuring the Cloudinary to Upload MEDIA ########
			cloud_name: process.env.CLOUD_NAME,
			api_key: process.env.API_KEY,
			api_secret: process.env.API_SECRET,
		});
		console.log("cloudinary connection successfully");
	} catch(error){
		console.log("cloudinary connection fail",error);
    }
};

