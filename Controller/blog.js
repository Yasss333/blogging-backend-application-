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
    
    // Check if request came from blog detail page or home page
    const referer = req.headers.referer || '';
    const blogId = req.params.id;
    
    if (referer.includes(`/blog/${blogId}`)) {
      // Rerender blog detail page
      const Comment = require('../Model/comment.js');
      const comments = await Comment.find({
        blogID: blogId,
      }).populate('createdBY');
      
      const blog = await Blog.findById(blogId).populate('createdBY');
      
      if (!blog) {
        return res.redirect('/');
      }
      
      let isSaved = false;
      if (req.user) {
        const user = await User.findById(req.user._id);
        isSaved = user?.savedBlogs?.some(
          (id) => id.toString() === blog._id.toString()
        ) || false;
      }
      
      return res.render('viewblog', {
        user: req.user,
        blog,
        comments,
        isSaved,
      });
    } else {
      // Rerender home page
      const allBlog = await Blog.find({}).populate('createdBY', 'fullname profileImage');
      
      let savedBlogIds = [];
      if (req.user) {
        const user = await User.findById(req.user._id);
        savedBlogIds = user?.savedBlogs?.map(id => id.toString()) || [];
      }
      
      return res.render('home', {
        user: req.user,
        blog: allBlog,
        savedBlogIds: savedBlogIds,
      });
    }
  } catch (error) {
    console.log("Failed to like:", error.message);
    return res.redirect('/');
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

    // Check if blog is already saved (compare as strings)
    const isAlreadySaved = user.savedBlogs.some(
      (id) => id.toString() === blogID
    );
    
    if (isAlreadySaved) {
      // Unsave: remove from saved blogs
      user.savedBlogs = user.savedBlogs.filter(
        (id) => id.toString() !== blogID
      );
      await user.save();
    } else {
      // Save: add to saved blogs
      user.savedBlogs.push(blogID);
      await user.save();
    }

    // Check if request came from blog detail page or home page
    const referer = req.headers.referer || '';
    
    if (referer.includes(`/blog/${blogID}`)) {
      // Rerender blog detail page
      const Comment = require('../Model/comment.js');
      const comments = await Comment.find({
        blogID: blogID,
      }).populate('createdBY');
      
      const blog = await Blog.findById(blogID).populate('createdBY');
      
      if (!blog) {
        return res.redirect('/');
      }
      
      const updatedUser = await User.findById(req.user._id);
      const isSaved = updatedUser?.savedBlogs?.some(
        (id) => id.toString() === blog._id.toString()
      ) || false;
      
      return res.render('viewblog', {
        user: req.user,
        blog,
        comments,
        isSaved,
      });
    } else {
      // Rerender home page
      const allBlog = await Blog.find({}).populate('createdBY', 'fullname profileImage');
      
      const updatedUser = await User.findById(req.user._id);
      const savedBlogIds = updatedUser?.savedBlogs?.map(id => id.toString()) || [];
      
      return res.render('home', {
        user: req.user,
        blog: allBlog,
        savedBlogIds: savedBlogIds,
      });
    }
  } catch (error) {
    console.log("Failed to save:", error.message);
    return res.redirect('/');
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