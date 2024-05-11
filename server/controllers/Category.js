const { Mongoose } = require("mongoose");
const Category = require("../models/Category");
const User = require("../models/User");
function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }

exports.createCategory = async (req, res) => {
  console.log("createcategory");
  const userId = req.user.id
  try {
    console.log("welcome create category");
		const { categoryName, categoryDescription,instructions,status } = req.body;
		
    if (!categoryName) {
			return res
				.status(400)
				.json({ success: false, message: "All fields are required" });
		}

    // const alreadyAvailable= await Category.find({categoryName});

    // if(alreadyAvailable){
    //     return res.status(400).json({
    //       success:false,
    //       message:"category already available"
    //     })
    // }

    console.log("data extracted",req.body);

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

		const CategorysDetails = await Category.create({
       categoryName,
			 categoryDescription,
       Admin: AdminDetails._id,
       instructions,
       status
		});

		console.log("categorydetails",CategorysDetails);

		return res.status(200).json({
			success: true,
      data:CategorysDetails,
			message: "Categorys Created Successfully",
		});

	} catch (error) {
    console.log("error",error.message);
		return res.status(500).json({
			success: true,
			message: error.message,
		});
	}
};

// Delete the offer
exports.deleteCategory = async (req, res) => {
  try {
    console.log("delete category",req.body)
    const { categoryId } = req.body

    // Find the offer
    const category = await Category.findById(categoryId)
    if (!category) {
      return res.status(404).json({ message: "category not found" })
    }


    // Delete the course
    await Category.findByIdAndDelete(categoryId)

    return res.status(200).json({
      success: true,
      message: "category deleted successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "category error",
      error: error.message,
    })
  }
}

// Edit category Details
exports.editCategory = async (req, res) => {
  try {
    const { categoryId } = req.body
    const updates = req.body
    const category = await Category.findById(categoryId)

    if (!category) {
      return res.status(404).json({ error: "category not found" })
    }


    // Update only the fields that are present in the request body
    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
          category[key] = updates[key]
      }
    }

    await category.save()

    const updatedCategory = await Category.findOne({
      _id: categoryId,
    })
      .populate({
        path: "Admin",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("services")
      .populate("offers")
      .exec()

    res.json({
      success: true,
      message: "category updated successfully",
      data: updatedCategory,
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

exports.showAllCategories = async (req, res) => {
	try {
    console.log("INSIDE SHOW ALL CATEGORIES");
		const allCategorys = await Category.find({});
    console.log(allCategorys);
		res.status(200).json({
			success: true,
			data: allCategorys,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

exports.getFullCategoryDetails = async (req, res) => {
  console.log("getfullcategorydetails",req.body);
  try {
    const { categoryId } = req.body
    //console.log(serviceId,userId);
    const categoryDetails = await Category.findOne({
      _id:categoryId,
    })
      .populate({
        path: "Admin",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("services")
      .populate("offers")
      .exec();

     console.log("details",categoryDetails);

    if (!categoryDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find category with id: ${categoryId}`,
      })
    }

    return res.status(200).json({
      success: true,
      data: {
        categoryDetails,
      }
    })
  } catch (error) {
    console.log("Error",error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

//categoryPageDetails 

exports.categoryPageDetails = async (req, res) => {
    try {
      const { categoryId } = req.body
      console.log("PRINTING CATEGORY ID: ", categoryId);
      // Get courses for the specified category
      const selectedCategory = await Category.findById(categoryId)
        .populate({
          path: "services",
          match: { status: "Published" },
          populate: "ratingAndReviews",
        })
        .exec()
  
      //console.log("SELECTED COURSE", selectedCategory)
      // Handle the case when the category is not found
      if (!selectedCategory) {
        console.log("Category not found.")
        return res
          .status(404)
          .json({ success: false, message: "Category not found" })
      }

      console.log("selected category",selectedCategory);
      // Handle the case when there are no courses
      if (selectedCategory.services.length === 0) {
        console.log("No services found for the selected category.")
        return res.status(404).json({
          success: false,
          message: "No services found for the selected category.",
        })
      }
  
      // Get services for other categories
      // const categoriesExceptSelected = await Category.find({
      //   _id: { $ne: categoryId },
      // })
      // console.log("categoiresExcepselected",categoriesExceptSelected);
      // let differentCategory = await Category.findOne(
      //   categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
      //     ._id
      // )
      //   .populate({
      //     path: "services",
      //     match: { status: "Published" },
      //   }).exec()

      // console.log("Different servies", differentCategory)

      // Get top-selling services across all categories
      
      const allCategories = await Category.find()
        .populate({
          path: "services",
          match: { status: "Published" },
          populate: {
            path: "Admin",
        },
        }).exec()

      // const allServices = allCategories.flatMap((category) => category.services)
      // const mostBookingServices = allServices
      //   .sort((a, b) => b.sold - a.sold)
      //   .slice(0, 10)
       // console.log("mostSellingCourses COURSE", mostSellingCourses)
      res.status(200).json({
        success: true,
        data: {
          selectedCategory,
          // differentCategory,
          // mostBookingServices,
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }

  // Get a list of Course for a given Admin
exports.getAdminCategories = async (req, res) => {
  try {
    // Get the instructor ID from the authenticated user or request body
    const adminId = req.user.id

    // Find all courses belonging to the admin
    const adminCategories = await Category.find({
      Admin:adminId,
    }).sort({ createdAt: -1 })


    // Return the instructor's courses
    res.status(200).json({
      success: true,
      message:"seccess",
      data: adminCategories,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to retrieve admin categories",
      error: error.message,
    })
  }
}