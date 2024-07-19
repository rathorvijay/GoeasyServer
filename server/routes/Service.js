// Import the required modules
const express = require("express")
const router = express.Router()

// Import the Controllers

// service Controllers Import
const {
  createService,
  getAllServices,
  getServiceDetails,
  getFullServiceDetails,
  editService,
  getAdminServices,
  deleteService,
} = require("../controllers/Service")

// Offer Controllers Import
const {
  createOffer,
  getAllOffers,
  getOfferDetails,
  getFullOfferDetails,
  editOffer,
  getAdminOffer,
  deleteOffer,
} = require("../controllers/Offer")



// Categories Controllers Import
const {
  showAllCategories,
  createCategory,
  deleteCategory,
  editCategory,
  categoryPageDetails,
  getFullCategoryDetails,
  getAdminCategories
} = require("../controllers/Category")


// Rating Controllers Import
const {
  createRating,
  getAverageRating,
  getAllRating,
} = require("../controllers/RatingAndReview")

const {
  updateServiceProgress
} = require("../controllers/serviceProgress");

// Importing Middlewares
const { auth, isVendor, isCustomer, isAdmin } = require("../middlewares/auth")

// ********************************************************************************************************
//                                      Server routes
// ********************************************************************************************************

router.post("/createService", auth, isAdmin, createService)
router.get("/getAllServices", getAllServices)
router.post("/getServiceDetails", getServiceDetails)
router.post("/getFullServiceDetails", auth, getFullServiceDetails)
router.post("/editService", auth, isAdmin, editService)
router.get("/getAdminServices", auth, isAdmin, getAdminServices)
router.delete("/deleteService", deleteService)
router.post("/updateServiceProgress", auth, isCustomer, updateServiceProgress);

// ********************************************************************************************************
//                                      Offer routes (only by Admin)
// ********************************************************************************************************

router.post("/createOffer", auth, isAdmin, createOffer)
router.get("/getAllOffers", getAllOffers)
router.post("/getOfferDetails", getOfferDetails)
router.post("/getFullOfferDetails", auth, getFullOfferDetails)
router.post("/editOffer", auth, isAdmin, editOffer)
router.get("/getAdminOffer", auth, isAdmin, getAdminOffer)
router.delete("/deleteOffer", deleteOffer)

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************

router.post("/createCategory",auth,isAdmin, createCategory)
router.post("/editCategory", auth, isAdmin, editCategory)
router.delete("/deleteCategory", auth, isAdmin, deleteCategory)
router.get("/showAllCategories", showAllCategories)
router.post("/getCategoryPageDetails", categoryPageDetails)
router.post("/getFullCategoryDetails", getFullCategoryDetails)
router.get("/getAdminCategory", auth, isAdmin, getAdminCategories)

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating", auth, isCustomer, createRating)
router.get("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRating)

module.exports = router