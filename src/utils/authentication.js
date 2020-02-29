
exports.validateUserAndNavigate = (req, res, next) => {
  if (!res.locals.session.user) {
    return res.redirect('/login');
  }
  return next();
};
