const express=require("express");
const router=express.Router();
const User =require("../models/User");

router.get("/userservices",(req,res)=>{
    const userid="6497e817a2fa26a1adfa8d07";
    const user=User.findById(userid);
   if(!user){
    console.log("user does not exit");
   }
   console.log(user.services);
    
})

module.exports=router