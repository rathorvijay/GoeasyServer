const Service = require("../models/Service")
const Category = require("../models/Category")
const User = require("../models/User")
const { uploadImageToCloudinary } = require("../utils/imageUploader")
const ServiceProgress = require("../models/ServiceProgress")
const { convertSecondsToDuration } = require("../utils/secToDuration")
// Function to create a new course
exports.createService = async (req, res) => {
  try {
    // Get user ID from request object
    const userId = req.user.id

    // Get all required fields from request body
    let {
      serviceName,
      serviceDescription,
      price,
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
      !serviceName ||
      !serviceDescription ||
      !price ||
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
    const newService = await Service.create({
      serviceName,
      serviceDescription,
      Admin: AdminDetails._id,
      price,
      category: categoryDetails._id,
      thumbnail: thumbnailImage.secure_url,
      status: status,
      instructions,
    })

    // Add the new course to the User Schema of the Admin
    await User.findByIdAndUpdate(
      {
        _id: AdminDetails._id,
      },
      {
        $push: {
          services: newService._id,
        },
      },
      { new: true }
    )
    // Add the new course to the Categories
    const categoryDetails2 = await Category.findByIdAndUpdate(
      { _id: category },
      {
        $push: {
          services: newService._id,
        },
      },
      { new: true }
    )

    console.log("HEREEEEEEEE", categoryDetails2)
    // Return the new course and a success message
    res.status(200).json({
      success: true,
      data: newService,
      message: "Course Created Successfully",
    })
  } catch (error) {
    // Handle any errors that occur during the creation of the course
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to create course",
      error: error.message,
    })
  }
}
// Edit service Details
exports.editService = async (req, res) => {
  console.log("editservice");
  try {
    const { serviceId } = req.body
    const updates = req.body
    console.log(updates,serviceId);
    const service = await Service.findById(serviceId)

    if (!service) {
      return res.status(404).json({ error: "service is not found" })
    }
    console.log("service is found",updates);

    // If Thumbnail Image is found, update it
    if (req.files) {
      console.log("thumbnail update")
      const thumbnail = req.files.thumbnailImage
      const thumbnailImage = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      )
       service.thumbnail = thumbnailImage.secure_url
    }

    // Update only the fields that are present in the request body
    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
          service[key] = updates[key]
      }
    }

    await service.save()

    const updatedService = await Service.findOne({
      _id: serviceId,
    })
      .populate({
        path: "Admin",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .exec()

    res.json({
      success: true,
      message: "Service updated successfully",
      data: updatedService,
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
exports.getAllServices = async (req, res) => {
  console.log("getallservices");
  try {
    const allServices = await Service.find(
      { status: "Published" },
      {
        serviceName: true,
        price: true,
        thumbnail: true,
        Admin: true,
        ratingAndReviews: true,
        customerEnrolled: true,
      }
    )
      .populate("Admin")
      .exec()

    return res.status(200).json({
      success: true,
      data: allServices,
    })
  } catch (error) {
    console.log(error)
    return res.status(404).json({
      success: false,
      message: `Can't Fetch service Data`,
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
exports.getServiceDetails = async (req, res) => {
  try {
    const { serviceId } = req.body
    const serviceDetails = await Service.findOne({
      _id: serviceId,
    })
      .populate({
        path: "Admin",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .exec()

    if (!serviceDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${serviceId}`,
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
        serviceDetails
      }
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

exports.getFullServiceDetails = async (req, res) => {
  console.log("getfullservicedetails");
  try {
    const { serviceId } = req.body
    const userId = req.user.id
    //console.log(serviceId,userId);
    const serviceDetails = await Service.findOne({
      _id:serviceId,
    })
      .populate({
        path: "Admin",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .exec();

    console.log("serverdetails vijay",serviceDetails);

    let serviceProgressCount = await ServiceProgress.findOne({
      serviceID: serviceId,
      userId: userId,
    })

    console.log("serviceProgressCount : ", serviceProgressCount)

    if (!serviceDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find service with id: ${serviceId}`,
      })
    }

     console.log("successully find");
    return res.status(200).json({
      success: true,
      data: {
        serviceDetails,
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
exports.getAdminServices = async (req, res) => {
  try {
    // Get the instructor ID from the authenticated user or request body
    const adminId = req.user.id

    // Find all courses belonging to the admin
    const adminServices = await Service.find({
      Admin:adminId,
    }).sort({ createdAt: -1 })


    // Return the instructor's courses
    res.status(200).json({
      success: true,
      message:"seccess",
      data: adminServices,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to retrieve admin services",
      error: error.message,
    })
  }
}
// Delete the Course
exports.deleteService = async (req, res) => {
  try {
    const { serviceId } = req.body

    // Find the course
    const service = await Service.findById(serviceId)
    if (!service) {
      return res.status(404).json({ message: "service not found" })
    }

    // Unenroll customer from the servicec
    const CustomersEnrolled = service.customerEnrolled
    for (const serviceId of CustomersEnrolled) {
      await User.findByIdAndUpdate(serviceId, {
        $pull: { services: serviceId },
      })
    }


    // Delete the course
    await Service.findByIdAndDelete(serviceId)

    return res.status(200).json({
      success: true,
      message: "Service deleted successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}