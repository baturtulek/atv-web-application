const db = require('../config/db');
const bcrypt = require('bcrypt');


exports.loginGET = (req, res) => {
    if (req.session.user) {
         return res.render('main/main');
    }
    return res.render('auth/login');
  };

exports.loginPOST = (req, res) => {
    const credentials = req.body;

    db.User.findOne({where: { name: credentials.name}}).then(user => {
        if (!user) {
            return res.redirect('/auth/login?error=invalid_credentials');
          }    
        bcrypt.compare(credentials.password, user.password).then(result => {
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
        })
    }).catch(err => {
        console.log(err);
    })
  };

exports.logout = (req, res) => {
    delete req.session.user;
    res.redirect('/');
};
