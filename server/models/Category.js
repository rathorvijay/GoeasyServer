const mongoose = require("mongoose");

// Define the Tags schema
const categorySchema = new mongoose.Schema({
	categoryName: {
		type: String,
		required: true,
	},
	categoryDescription: {
		 type: String 
	},
	instructions: {
		type: [String],
	},
	Admin: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "user",
	},
	services: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Service",
		},
	],
	offers: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Offer",
		},
	],
	status: {
		type: String,
		enum: ["Draft", "Published"],
	},
});

// Export the Tags model
module.exports = mongoose.model("Category", categorySchema);