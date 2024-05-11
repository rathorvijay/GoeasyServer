const ServiceProgress = require("../models/ServiceProgress");


exports.updateServiceProgress = async(req,res) => {
    const {serviceId} = req.body;
    const userId = req.user.id;

    try{

        //check for old entry 
        let serviceProgress = await ServiceProgress.findOne({
            serviceID:serviceId,
            userId:userId,
        });
        if(!serviceProgress) {
            return res.status(404).json({
                success:false,
                message:"service Progress does not exist"
            });
        }
        else {
            console.log("service Progress Validation Done");

        }
        await serviceProgress.save();
        console.log("service Progress Save call Done");
        return res.status(200).json({
            success:true,
            message:"service Progress Updated Successfully",
        })
    }
    catch(error) {
        console.error(error);
        return res.status(400).json({error:"Internal Server Error"});
    }
}