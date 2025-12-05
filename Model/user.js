const mongoose = require("mongoose");
const { createHmac, randomBytes } = require("crypto");
const { generateJWTtoken } = require("../services/authentication");
require("dotenv").config();

const UserSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // keep email unique
    },
    password: {
      type: String,
      required: true,
      // DO NOT mark password unique
    },
    salt: {
      type: String,
    },
    profileImage: {
      type: String,
      default: "/images/image.png",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    }
  },
  { timestamps: true }
);

// Pre-save hook: hash password if modified
UserSchema.pre("save", function () {
  if (!this.isModified("password")) return;

  const salt = randomBytes(16).toString("hex");
  const hashedPassword = createHmac("sha256", salt)
    .update(this.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashedPassword;
});


// Static method to validate credentials and return token
UserSchema.statics.matchPasswordAndGenerateToken = async function (
  email,
  password
) {
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error("User Not Found");
  }

  const hashedAttempt = createHmac("sha256", user.salt)
    .update(password)
    .digest("hex");

  if (hashedAttempt !== user.password) {
    throw new Error("Password did not match");
  }

  // generateJWTtoken should return a string token
  const token = generateJWTtoken(user);
  return token;
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
