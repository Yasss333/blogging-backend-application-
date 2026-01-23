const Blog=require('../Model/blog.js');
const User = require('../Model/user.js');

const createBlog = async (req, res) => {
  try {
    const { title, body } = req.body;

    if (!req.user) {
      return res.status(401).redirect('/user/signin');
    }

    if (!req.file) {
      return res.status(400).redirect('back');
    }

    const blog = await Blog.create({
      title,
      body,
      createdBY: req.user._id,
      coverImage: `/uploads/photos/images/${req.file.filename}`,
    });

    return res.redirect(`/blog/${blog._id}`);
  } catch (error) {
    console.log("Failed to create blog:", error.message);
    return res.redirect('back');
  }
};

const incrementLike = async (req, res) => {
  try {
    await Blog.findByIdAndUpdate(req.params.id, { $inc: { likes: 1 } });
    return res.redirect('back');
  } catch (error) {
    console.log("Failed to like:", error.message);
    return res.redirect('back');
  }
};
const saveBlogHandler = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).redirect('/user/signin');
    }

    const blogID = req.params.id;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).redirect('/');
    }

    // Check if blog is already saved
    if (user.savedBlogs.includes(blogID)) {
      // Unsave: remove from saved blogs
      user.savedBlogs = user.savedBlogs.filter(
        (id) => id.toString() !== blogID
      );
      await user.save();
      return res.redirect('back');
    }

    // Save: add to saved blogs
    user.savedBlogs.push(blogID);
    await user.save();
    return res.redirect('back');
  } catch (error) {
    console.log("Failed to save:", error.message);
    return res.redirect('back');
  }
};

const displaysavedBlogs = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).redirect('/user/signin');
    }

    const user = await User.findById(req.user._id).populate('savedBlogs');

    res.render('savedBlogs', {
      user: req.user,
      blogs: user.savedBlogs || [],
    });
  } catch (error) {
    console.log("Failed to display saved blogs:", error.message);
    return res.redirect('/');
  }
};

module.exports = {
  createBlog,
  incrementLike,
  saveBlogHandler,
  displaysavedBlogs,
};