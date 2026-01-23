const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.SECRET1;

/**
 * Middleware to verify JWT token from cookies
 * Sets req.user if token is valid, otherwise sets req.user to null
 */
function verifyjwt(cookieName = 'token') {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];

    // No cookie → user is logged out
    if (!tokenCookieValue) {
      res.locals.user = null;
      req.user = null;
      return next();
    }

    try {
      const userPayload = jwt.verify(tokenCookieValue, secret);
      req.user = userPayload;
      res.locals.user = userPayload;
      return next();
    } catch (error) {
      // Token invalid → logout state
      console.log("JWT Verification Error:", error.message);
      res.locals.user = null;
      req.user = null;
      return next();
    }
  };
}

module.exports = {
  verifyjwt,
};

