const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  loginTime: { type: Date, default: Date.now },
  logoutTime: { type: Date },
  ipAddress: { type: String, required: true },
});

module.exports = mongoose.model("Session", sessionSchema);
