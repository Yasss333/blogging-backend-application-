const {Router}=require("express")
const router=Router();
const {handlerUserSignup,handlerUserSignin}=require('../Controller/user.js');
const User = require("../Model/user.js");

router.get("/signin", (req, res) => {
  res.render("signin.ejs", { error: null, user: req.user });
});

router.get('/signup',(req,res)=>{
  return res.render("signup.ejs")
});

router.get("/logout", (req, res) => {
  res.clearCookie("token"); // NOT the value!
  req.user = null;
  res.locals.user = null;
  return res.render("signin.ejs");
}); 

router.post("/signup",handlerUserSignup)
router.post("/signin",handlerUserSignin)

module.exports=router;