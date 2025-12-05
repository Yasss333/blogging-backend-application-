const express = require("express");
const multer = require("multer");
const { Router } = require("express");
const router = Router();
const upload = require("../middleware/upload");
const Comment=require('../Model/comment.js')
router.get("/add-new", (req, res) => {
  return res.render("blog", {
    user: req.user,
  });
});

const { createBlog } = require("../Controller/blog.js");
const Blog = require("../Model/blog.js");

router.get("/add-new", (req, res) => {
  return res.render("blog", { user: req.user });
});

router.get('/:id',async (req,res)=>{
  const comments=await Comment.find({
    blogID:req.params.id
  }).populate("createdBY");
  console.log("Comments :",comments);
  
  const blog = await Blog.findById(req.params.id).populate("createdBY");
  console.log("blog",blog);
  
   return res.render('viewblog',{
    user:req.user,
    blog,
    comments
   })
})

// Clean + Short Route
router.post("/", upload.single("coverImage"), createBlog);

router.post("/comment/:blogId",async (req,res)=>{
  console.log("REQ BODY: ", req.body);
  console.log("REQ USER: ", req.user);
  const comment = await Comment.create({
    content:req.body.content,
    blogID:req.params.blogId,
    createdBY:req.user._id  
  });
  return res.redirect(`/blog/${req.params.blogId}`)
})


module.exports = router;
