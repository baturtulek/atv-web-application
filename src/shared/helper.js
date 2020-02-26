
exports.IsAuthorized = (req, res) => {
  if (!req.session.user) {
    return false;
  }
  return true;
};
