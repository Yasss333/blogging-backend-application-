// const express=require('express');
const User=require('../Model/user.js');


async function handlerUserSignup(req,res){
  const {fullname ,email ,password } =req.body;
  await User.create({
    fullname,
    email,
    password
  })
   return res.redirect('/')
}

async function handlerUserSignin(req, res) {
  const { email, password } = req.body;

  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);
    return res
      .cookie("token", token, { httpOnly: true, secure: false })
      .redirect("/"); // SUCCESS
  } catch (error) {
    console.log("Login Error:", error.message);

    // Render signin page again WITH error message
    return res.status(401).render("signin.ejs", {
      error: "Invalid Email or Password",
    });
  }
}

module.exports={
  handlerUserSignup,handlerUserSignin
}