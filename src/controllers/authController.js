
const db = require('../config/db');
const bcrypt = require('bcrypt');


exports.loginView = (req, res) => {
    if (req.session.user) {
         return  res.status(200).json({
          message: `You're logged in. this should show main view`
        });
    }
    return res.status(401).json({
      message: `You're not logged in. this should show auth view`
    });
  };

exports.login = async (req, res) => {
    const credentials = req.body;

    const user = await db.User.findOne({where: { name: credentials.name}});
        if (!user) {
            return res.status(403).json({
              message: `User not found this sould redirect to invalid credentials View`
            });
          }    
    const result = await bcrypt.compare(credentials.password, user.password);
          if(result) {
            req.session.user = user;
            return res.redirect('/');
          }
          else {
            console.log("Authfailed");
            return res.status(401).json({ // If password is not correct, this return will work
              username: 'Auth Failed',
            }); 
          }
  };

exports.logout = (req, res) => {
    delete req.session.user;
    return res.status(403).json({
      message: `user logged out ` // redirect to appropiate view
    });
};
