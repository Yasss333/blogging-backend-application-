const express=require("express");
const app=express()
const dotenv=require("dotenv")
const path=require("path");
const multer = require("multer");
const {mongoConnect}=require('./connect.js')
const { log, error } = require("console");
const userRoutes=require('./Routes/user.js');
const blogRoutes=require('./Routes/blog.js');
const cookieparser=require("cookie-parser")
const {checkforAuthentication}=require('./middleware/authentication.js')
const Blog=require('./Model/blog.js');

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cookieparser());
app.use(checkforAuthentication('token'));
app.use(express.static("public"));

app.use("/uploads", express.static("uploads"));


mongoConnect(process.env.MONGO_URL)
  .then(() => {
    console.log("MONGO connected");
  })
  .catch(() => {
    console.log(error);
  });

const PORT=process.env.PORT || 5000;

app.set("view engine","ejs");
app.set("views",path.resolve("./views"))

app.get("/",async(req,res)=>{
  const allBlog= await Blog.find({});
  return res.render("home",{
    user:req.user,
    blog:allBlog
  });

})


app.use('/user',userRoutes);
app.use('/blog',blogRoutes);


app.listen(PORT,()=>{
    console.log(` App lsitening on Port ${PORT}`);    
})

