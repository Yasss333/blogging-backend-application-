// const express=require('express');
const User=require('../Model/user.js');


async function handlerUserSignup(req, res) {
  const { fullname, email, password } = req.body;
  
  // Basic validation
  if (!fullname || !email || !password) {
    return res.status(400).render('signup.ejs', {
      error: 'All fields are required',
      user: req.user,
    });
  }

  try {
    await User.create({
      fullname,
      email,
      password,
    });
    // After successful signup, redirect to signin
    return res.redirect('/user/signin');
  } catch (error) {
    console.log("Failed to signup:", error.message);
    
    let errorMessage = 'Signup failed. Please try again.';
    if (error.message.includes('duplicate') || error.code === 11000) {
      errorMessage = 'Email already exists. Please use a different email.';
    } else if (error.message.includes('validation')) {
      errorMessage = 'Invalid input. Please check your details.';
    }
    
    return res.status(400).render('signup.ejs', {
      error: errorMessage,
      user: req.user,
    });
  }
}

async function handlerUserSignin(req, res) {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).render("signin.ejs", {
      error: "Email and password are required",
      user: req.user,
    });
  }

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
      user: req.user,
    });
  }
}

module.exports={
  handlerUserSignup,handlerUserSignin
}