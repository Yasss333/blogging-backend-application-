const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const { mongoConnect } = require('./connect.js');
const userRoutes = require('./Routes/user.js');
const blogRoutes = require('./Routes/blog.js');
const cookieparser = require('cookie-parser');
const { verifyjwt } = require('./services/verifyjwt.js');
const Blog = require('./Model/blog.js');

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieparser());
app.use(verifyjwt('token'));
app.use(express.static('public'));

app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 5000;

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

async function startServer() {
  try {
    await mongoConnect(process.env.MONGO_URI);
    console.log('MONGO connected');

    app.listen(PORT, () => {
      console.log(`App listening on Port ${PORT}`);
    });
  } catch (err) {
    console.error('Mongo connection failed:', err);
    process.exit(1);
  }
}

startServer();

app.get("/", async (req, res) => {
  try {
    const allBlog = await Blog.find({}).populate('createdBY', 'fullname profileImage');
    
    let savedBlogIds = [];
    if (req.user) {
      const user = await require('./Model/user.js').findById(req.user._id);
      savedBlogIds = user?.savedBlogs?.map(id => id.toString()) || [];
    }

    return res.render('home', {
      user: req.user,
      blog: allBlog,
      savedBlogIds: savedBlogIds,
    });
  } catch (error) {
    console.log('Error loading home:', error.message);
    return res.render('home', {
      user: req.user,
      blog: [],
      savedBlogIds: [],
    });
  }
});


app.use('/user', userRoutes);
app.use('/blog', blogRoutes);