const Offer = require("../models/Offer")
const Category = require("../models/Category")
const User = require("../models/User")
const { uploadImageToCloudinary } = require("../utils/imageUploader")

// Function to create a new course
exports.createOffer = async (req, res) => {
  try {
    // Get user ID from request object
    const userId = req.user.id
    console.log("create offer",req.body);
    // Get all required fields from request body
    let {
      offerName,
      offerDescription,
      discount,
      category,
      status,
      instructions: _instructions,
    } = req.body
    // Get thumbnail image from request files
    const thumbnail = req.files.thumbnailImage

    // Convert the instructions from stringified Array to Array
    const instructions = JSON.parse(_instructions)

    console.log("instructions", instructions)

    // Check if any of the required fields are missing
    if (
      !offerName ||
      !offerDescription ||
      !discount ||
      !thumbnail ||
      !category ||
      !instructions.length
    ) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Mandatory",
      })
    }
    if (!status || status === undefined) {
      status = "Draft"
    }

    // Check if the user is an Admin
    const AdminDetails = await User.findById(userId, {
      accountType: "Admin",
    })

    if (!AdminDetails) {
      return res.status(404).json({
        success: false,
        message: "Admin Details Not Found",
      })
    }

    // Check if the tag given is valid
    const categoryDetails = await Category.findById(category)
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category Details Not Found",
      })
    }
    
    // Upload the Thumbnail to Cloudinary
    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    )
    console.log(thumbnailImage)

    // Create a new course with the given details
    const newOffer = await Offer.create({
      offerName,
      offerDescription,
      Admin:AdminDetails._id,
      discount,
      category: categoryDetails._id,
      thumbnail: thumbnailImage.secure_url,
      status: status,
      instructions,
    })

    // Add the new offer to the User Schema of the Admin
    await User.findByIdAndUpdate(
      {
        _id: AdminDetails._id,
      },
      {
        $push: {
          Offers: newOffer._id,
        },
      },
      { new: true }
    )

    // Add the new service to the Categories
    const categoryDetails2 = await Category.findByIdAndUpdate(
      { _id: category },
      {
        $push: {
          offers: newOffer._id,
        },
      },
      { new: true }
    )

    console.log("HEREEEEEEEE", categoryDetails2)

    // Return the new course and a success message
    res.status(200).json({
      success: true,
      data: newOffer,
      message: "Offer Created Successfully",
    })
  } catch (error) {
    // Handle any errors that occur during the creation of the course
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to create offer",
      error: error.message,
    })
  }
}

// Edit Course Details
exports.editOffer = async (req, res) => {
  console.log("editoffer");
  try {
    const { offerId } = req.body
    const updates = req.body
    const offer = await Offer.findById(offerId)

    if (!offer) {
      return res.status(404).json({ error: "offer not found" })
    }

    // If Thumbnail Image is found, update it
    if (req.files) {
      console.log("thumbnail update")
      const thumbnail = req.files.thumbnailImage
      const thumbnailImage = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      )
      offer.thumbnail = thumbnailImage.secure_url
    }

    // Update only the fields that are present in the request body
    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
          offer[key] = updates[key]
      }
    }

    await offer.save()

    const updatedOffer = await Offer.findOne({
      _id: offerId,
    })
      .populate({
        path: "Admin",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .exec()

    res.json({
      success: true,
      message: "Offer updated successfully",
      data: updatedOffer,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}
// Get Course List
exports.getAllOffers = async (req, res) => {
  try {
    console.log("getalloffers");
    const allOffers = await Offer.find(
      { status: "Published" },
      {
        offerName: true,
        discount: true,
        thumbnail: true,
        Admin: true,
      }
    )
      .populate("Admin")
      .exec()

    return res.status(200).json({
      success: true,
      data: allOffers,
    })
  } catch (error) {
    console.log(error)
    return res.status(404).json({
      success: false,
      message: `Can't Fetch Offer Data`,
      error: error.message,
    })
  }
}

// Get One Single Course Details
// exports.getCourseDetails = async (req, res) => {
//   try {
//     const { courseId } = req.body
//     const courseDetails = await Course.findOne({
//       _id: courseId,
//     })
//       .populate({
//         path: "instructor",
//         populate: {
//           path: "additionalDetails",
//         },
//       })
//       .populate("category")
//       .populate("ratingAndReviews")
//       .populate({
//         path: "courseContent",
//         populate: {
//           path: "subSection",
//         },
//       })
//       .exec()
//     // console.log(
//     //   "###################################### course details : ",
//     //   courseDetails,
//     //   courseId
//     // );
//     if (!courseDetails || !courseDetails.length) {
//       return res.status(400).json({
//         success: false,
//         message: `Could not find course with id: ${courseId}`,
//       })
//     }

//     if (courseDetails.status === "Draft") {
//       return res.status(403).json({
//         success: false,
//         message: `Accessing a draft course is forbidden`,
//       })
//     }

//     return res.status(200).json({
//       success: true,
//       data: courseDetails,
//     })
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     })
//   }
// }

exports.getOfferDetails = async (req, res) => {
  try {
    const { offerId } = req.body
    console.log("getofferdetails api");
    const offerDetails = await Offer.findOne({
      _id: offerId,
    })
      .populate({
        path: "Admin",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .exec()

    if (!offerDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find offer with id: ${offerId}`,
      })
    }

    // if (courseDetails.status === "Draft") {
    //   return res.status(403).json({
    //     success: false,
    //     message: `Accessing a draft course is forbidden`,
    //   });
    // }

    return res.status(200).json({
      success: true,
      data: {
        offerDetails
      }
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
exports.getFullOfferDetails = async (req, res) => {
  console.log("getfulldeatilsoffer");
  try {
    const { offerId } = req.body
    const offerDetails = await Offer.findOne({
      _id: offerId,
    })
      .populate({
        path: "Admin",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .exec()

    if (!offerDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find offer with id: ${offerId}`,
      })
    }

    // if (courseDetails.status === "Draft") {
    //   return res.status(403).json({
    //     success: false,
    //     message: `Accessing a draft course is forbidden`,
    //   });
    // }

    return res.status(200).json({
      success: true,
      data: {
        offerDetails,
      }
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Get a list of Course for a given Admin
exports.getAdminOffer = async (req, res) => {
  console.log("getadminoffer");
  try {
    // Get the instructor ID from the authenticated user or request body
    const adminId = req.user.id
  
    // Find all courses belonging to the instructor
    const adminOffers = await Offer.find({
      Admin: adminId,
    }).sort({ createdAt: -1 })

    console.log("adminoffers",adminOffers);

    // Return the instructor's offer
    res.status(200).json({
      success: true,
      data: adminOffers,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to retrieve admin offers",
      error: error.message,
    })
  }
}

// Delete the offer
exports.deleteOffer = async (req, res) => {
  try {
    const { offerId } = req.body

    // Find the offer
    const offer = await Offer.findById(offerId)
    if (!offer) {
      return res.status(404).json({ message: "offer not found" })
    }


    // Delete the course
    await Offer.findByIdAndDelete(offerId)

    return res.status(200).json({
      success: true,
      message: "offer deleted successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "offer error",
      error: error.message,
    })
  }
}