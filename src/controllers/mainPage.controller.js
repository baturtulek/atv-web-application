const { DB } = require('../services/sequelize');

exports.listAnnouncements = async (req, res) => {
  const announcementList = await DB.Announcement.findAll({
    raw: true,
  });
  return res.render('layouts/main', {
    partialName: 'mainPage',
    announcementList,
  });
};