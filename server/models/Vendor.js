// Import the Mongoose library
const mongoose = require("mongoose");

// Define the user schema using the Mongoose Schema constructor
const vendorSchema = new mongoose.Schema(
	{
		// Define the name field with type String, required, and trimmed
		fullName: {
			type: String,
			required: true,
			trim: true,
		},
	
		// Define the email field with type String, required, and trimmed
		email: {
			type: String,
			trim: true,
		},
        
        mobile:{
            type:String,
            trim:true
        },

        DOB:{
            type:String
        },
        work:{
            type:String
        },
        city:{
            type:String
        },
        profileImage: {
			type: String,
			required: true,
		},
        aadharNo:{
            type:String,
            required:true,
        },
        aadharImageFront:{
            type:String,
            required:true,
        },
        aadharImageBack:{
            type:String,
            required:true,
        },
        panImage:{
            type:String,
            required:true,
        },
        referralCode:{
            type:String
        },
		// Define the role field with type String and enum values of "Admin", "Student", or "Visitor"
		accountType: {
			type: String,
            default:"Vendor",
			enum: ["Admin", "Customer", "Vendor"],
		},
		active: {
			type: Boolean,
			default: true,
		},
		approved: {
			type: Boolean,
			default: true,
		},
		services: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Service",
			},
		],
		token: {
			type: String,
		},
		
		serviceProgress: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "serviceProgress",
			},
		],

		// Add timestamps for when the document is created and last modified
	},
	{ timestamps: true }
);

// Export the Mongoose model for the user schema, using the name "user"
module.exports = mongoose.model("vendor", vendorSchema);