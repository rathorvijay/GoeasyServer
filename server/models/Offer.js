const mongoose = require("mongoose");

// Define the Courses schema
const offersSchema = new mongoose.Schema({
	offerName: { 
		type: String
	 },
	offerDescription: {
	   type: String 
	},
	Admin: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "user",
	},
	discount: {
		type: Number,
	},
	thumbnail: {
		type: String,
	},
	category: {
		type: mongoose.Schema.Types.ObjectId,
		// required: true,
		ref: "Category",
	},
	instructions: {
		type: [String],
	},
	status: {
		type: String,
		enum: ["Draft", "Published"],
	},
	createdAt: {
		type:Date,
		// default:Date.now,
		// expires:number,
	},
});

// Export the Courses model
module.exports = mongoose.model("Offer", offersSchema);