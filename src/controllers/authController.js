const db = require("../config/db");
const bcrypt = require("bcrypt");
const httpStatus = require("http-status");
const helper = require("../shared/helper");

exports.loginView = (req, res) => {
  if (helper.IsAuthorized(req, res)) {
    return res.status(httpStatus.OK).json({
      message: `You're logged in. this should show loginView` // return searchVehicleView
    });
  }
};

exports.login = async (req, res) => {
  const credentials = req.body;
  try {
    const user = await db.User.findOne({
      where: { username: credentials.username }
    });
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: `User not found this sould redirect to invalid credentials View`
      });
    }
    const result = await bcrypt.compare(credentials.password, user.password);
    if (result) {
      req.session.user = user;
      return res.redirect("/");
    } else {
      console.log("Authfailed");
      return res.status(httpStatus.UNAUTHORIZED).json({
        // If password is not correct, this return will work
        username: "Auth Failed"
      });
    }
  } catch (exception) {
    console.log(exception);
  }
};

exports.logout = (req, res) => {
  delete req.session.user;
  return res.status(httpStatus.OK).json({
    message: `user logged out ` // redirect to appropiate view
  });
};
