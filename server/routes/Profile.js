const express = require("express")
const router = express.Router()
const { auth, isAdmin } = require("../middlewares/auth")
const {
  deleteAccount,
  updateProfile,
  getAllUserDetails,
  updateDisplayPicture,
  getBookServices,
  AdminDashboard,
} = require("../controllers/Profile")

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delet User Account
router.delete("/deleteProfile", auth, deleteAccount)
router.put("/updateProfile", auth, updateProfile)
router.get("/getUserDetails", auth, getAllUserDetails)
// Get Enrolled Courses
router.get("/getBookServices", auth, getBookServices)
router.put("/updateDisplayPicture", auth, updateDisplayPicture)
router.get("/AdminDashboard", auth, isAdmin, AdminDashboard)

module.exports = router