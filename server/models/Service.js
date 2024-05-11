const mongoose = require("mongoose");

// Define the Courses schema
const servicesSchema = new mongoose.Schema({
	serviceName: { 
		type: String
	 },
	serviceDescription: {
	   type: String 
	},
	Admin: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "user",
	},
	ratingAndReviews: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "RatingAndReview",
		},
	],
	price: {
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
	customerEnrolled: [
		{
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "user",
		},
	],
	instructions: {
		type: [String],
	},
	status: {
		type: String,
		enum: ["Draft", "Published"],
	},
	createdAt: {
		type:Date,
		default:Date.now
	},
});

// Export the Courses model
module.exports = mongoose.model("Service", servicesSchema);