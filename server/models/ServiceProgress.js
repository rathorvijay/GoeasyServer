const mongoose = require("mongoose")

const serviceProgress = new mongoose.Schema({
  serviceID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
})

module.exports = mongoose.model("serviceProgress", serviceProgress)