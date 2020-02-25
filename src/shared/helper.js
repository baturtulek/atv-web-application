const httpStatus = require("http-status");

exports.IsAuthorized = (req, res) => {
  if (!req.session.user) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      message: `You're not logged in. this should redirect auth view or given an appropiate error view` //not logged in redirect auth
    });
  }
  return true;
};
