const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const Vendor = require("../models/Vendor");
const mailSender = require("../utils/mailSender");

exports.signup = async (req, res) => {
  console.log("registration");

  try {
    const {
      fullName,
      email,
      mobileNo,
      DOB,
      work,
      city,
      aadharNo,
      referralCode,
    } = req.body;

    console.log("data",req.body);

    const profileImage = req.files.profileImage;
    console.log("profile",profileImage);
    const aadharImageFront= req.files.aadharImageFront
    console.log("aadar",aadharImageFront);
    const aadharImageBack=req.files.aadharImageBack
    console.log("back",aadharImageBack);
    const panImage=req.files.panImage
    console.log("pan",panImage);


    if (!fullName || !email || !mobileNo || !DOB || !work || !city || !aadharNo || !panImage || !aadharImageFront || !aadharImageBack  || !profileImage ) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const existingVendor = await Vendor.findOne({ mobileNo });
    if (existingVendor) {
      return res.status(400).json({ success: false, message: "Vendor already exists. Please sign in to continue." });
    }

    const profileImageCloud=uploadImageToCloudinary(profileImage, process.env.FOLDER_NAME)
    const aadharFrontImageCloud=uploadImageToCloudinary(aadharImageFront, process.env.FOLDER_NAME)
    const aadharImageBackCloud=uploadImageToCloudinary(aadharImageBack, process.env.FOLDER_NAME)
    const panImageCloud=uploadImageToCloudinary(panImage, process.env.FOLDER_NAME)


    let approved = referralCode ? true : false;

    const vendor = await Vendor.create({
      fullName,
      email,
      mobile: mobileNo,
      DOB,
      work,
      city,
      profileImage: profileImageCloud.secure_url,
      aadharNo,
      aadharImageFront: aadharFrontImageCloud.secure_url,
      aadharImageBack: aadharImageBackCloud.secure_url,
      panImage: panImageCloud.secure_url,
      referralCode: referralCode || null,
      accountType: "Vendor",
      approved: approved,
    });

    return res.status(201).json({ success: true, user: vendor, message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "User cannot be registered. Please try again." });
  }
};
