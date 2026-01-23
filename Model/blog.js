const mongoose = require("mongoose");
const { type } = require("os");
const { Schema } = mongoose;
// const User=require(./user.js)

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    tagline:{
      type:String,
    },
    body: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      required: false,
    },
    likes:{
      type:Number,
      default:0
    },
    saved:{
      type:Boolean,
      required:false
    },
    createdBY: {
      type: Schema.Types.ObjectId,
      ref: "User", // Must match your user model name
      required: true,
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
