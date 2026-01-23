const { Router } = require('express');
const router = Router();
const upload = require('../middleware/upload');
const Comment = require('../Model/comment.js');
const Blog = require('../Model/blog.js');
const {
  createBlog,
  incrementLike,
  saveBlogHandler,
  displaysavedBlogs,
} = require('../Controller/blog.js');

router.get('/add-new', (req, res) => {
  if (!req.user) {
    return res.redirect('/user/signin');
  }
  return res.render('blog', { user: req.user });
});

router.get('/saved', displaysavedBlogs);

router.get('/:id', async (req, res) => {
  try {
    const comments = await Comment.find({
      blogID: req.params.id,
    }).populate('createdBY');

    const blog = await Blog.findById(req.params.id).populate('createdBY');

    if (!blog) {
      return res.status(404).redirect('/');
    }

    let isSaved = false;
    if (req.user) {
      const User = require('../Model/user.js');
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
  } catch (error) {
    console.log("Error loading blog:", error.message);
    return res.redirect('/');
  }
});

// Clean + Short Route
router.post("/", upload.single("coverImage"), createBlog);

router.post("/comment/:blogId", async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).redirect('/user/signin');
    }

    const comment = await Comment.create({
      content: req.body.content,
      blogID: req.params.blogId,
      createdBY: req.user._id,
    });
    return res.redirect(`/blog/${req.params.blogId}`);
  } catch (error) {
    console.log("Failed to add comment:", error.message);
    return res.redirect('back');
  }
});

router.post('/:id/like', incrementLike);
router.post("/:id/save", saveBlogHandler);

module.exports = router;
