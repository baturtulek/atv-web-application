const announcementController = require('../controllers/announcement.controller');

const routes = (app) => {
  app
    .route(['/announcement', '/announcement/list'])
    .get(announcementController.listAnnouncements);

  app
    .route('/announcement/add')
    .get(announcementController.addAnnouncementView)
    .post(announcementController.addAnnouncement);

  app
    .route('/announcement/update/:id?')
    .get(announcementController.updateAnnouncementView)
    .post(announcementController.updateAnnouncement);

  app
    .route('/announcement/delete/:id?')
    .get(announcementController.deleteAnnouncement);
};

module.exports = routes;
