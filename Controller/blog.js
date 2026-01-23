const Blog=require('../Model/blog.js');
const User = require('../Model/user.js');

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
     
   });

  return res.redirect(`/blog/${blog._id}`);
};

const incrementLike = async (req, res) => {
  try {
    await Blog.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } }
    );
      
    return res.redirect(`/`);
  } catch (error) {
    console.log("Failed to like:", error.message);
    return res.redirect("back");
  }
};
const saveBlogHandler=async(req,res)=>{
  const user=req.user;
  const blogID=req.user.id; 
  try {

    if(user.savedBlogs.includes(blogID)){
      return res.redirect("back")
    };
      user.savedBlogs.push(blogID);
      await user.save();
    return res.redirect("/")
   } catch (error) {
    console.log("Failed to save:", error.message);
    return res.redirect("back");
   }
}

const displaysavedBlogs= async (req, res) => {
  const user = await User.findById(req.user._id)
    .populate("savedBlogs");

  res.render("savedBlogs", {
    user,
    blogs: user.savedBlogs
  })};

module.exports={
    createBlog,incrementLike,saveBlogHandler,displaysavedBlogs
};