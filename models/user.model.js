const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email",
      ],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "Password must be at least 8 characters long"],
      trim: true,
    },
    userRole: {
      type: String,
      required: true,
      default: "CUSTOMER",
    },
    userStatus: {
      type: String,
      required: true,
      default: "APPROVED",
    },
  },
  { timestamps: true }
);

// encrypt the password before the user is saved to the database
userSchema.pre("save", async function () {
  // a trigger to encrypt the password before the user is saved to the database
  //console.log(this);
  const hash = await bcrypt.hash(this.password, 10);
  //console.log(hash);
  this.password = hash;
  //console.log(this);
});

// compare the password with the encrypted password
//userSchema.compare()

const User = mongoose.model("User", userSchema);
module.exports = User;
