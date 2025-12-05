const Blog=require('../Model/blog.js')

const createBlog = async (req, res) => {
  const {title,body,}=req.body;
  console.log("REQ.USER AT CONTROLLER:", req.user);

  if (!req.user) {
    return res.status(401).send("User must be logged in to create a blog");
  }
   const blog = await Blog.create({
     title,
     body,
     createdBY: req.user._id,
     coverImage: `/uploads/photos/images/${req.file.filename}`,
     blog
   });

  return res.redirect(`/blog/${blog._id}`);
};


module.exports={
    createBlog
};