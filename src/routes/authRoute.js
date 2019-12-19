const authController = require('../controllers/authController');
const routes = (app) => {
    app.route('/auth/login')
        .get(authController.loginGET)
        .post(authController.loginPOST);
    app.route('/auth/logout')
        .get(authController.logout);
}

module.exports = routes;