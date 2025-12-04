const mongoose = require("mongoose");

const theatreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    pinCode: {
      type: String,
      required: true,
      minLength: [6, "Pin code must be at least 6 characters long"],
      trim: true,
    },
  },
  { timestamps: true }
);

const Theatre = mongoose.model("Theatre", theatreSchema); //creates a new Model
module.exports = Theatre; // return the model
