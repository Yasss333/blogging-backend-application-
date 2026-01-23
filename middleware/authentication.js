const { verifyjwt } = require('../services/verifyjwt.js');

// Legacy wrapper for backward compatibility
function checkforAuthentication(cookieName) {
  return verifyjwt(cookieName);
}

module.exports = {
  checkforAuthentication,
};
