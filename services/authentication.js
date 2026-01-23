const jwt=require('jsonwebtoken');
require('dotenv').config();


const secret=process.env.SECRET1;
 async function generateJWTtoken(user){
   const payload = {
     _id: user._id,
     email: user.email,
    //  profileImage: user.profileImage,
     role:user.role,
   };
   const token=jwt.sign(payload,secret);
   return token;
 }

function validateToken(token){
    const payload=jwt.verify(token,secret);
    return payload;

}

module.exports={
    generateJWTtoken,validateToken
}