const {validateToken}=require('../services/authentication.js')

function checkforAuthentication(cookieName) {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];

    // NO COOKIE → USER IS LOGGED OUT
    if (!tokenCookieValue) {
      res.locals.user = null;
       req.user = null;
      return next();
    }

    try {
      const userPayload = validateToken(tokenCookieValue);

      req.user = userPayload;
      res.locals.user = userPayload; // MISSING LINE (important)
      return next();
    } catch (error) {
      // TOKEN INVALID → LOGOUT STATE
       console.log("TOKEN ERROR:", error.message);
      res.locals.user = null;
       req.user = null;
      return next();
    }
  };
}

module.exports = {
  checkforAuthentication,
};
