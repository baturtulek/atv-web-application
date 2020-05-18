const { DB } = require('../services/sequelize');
const { checkExpiredAnnouncements, getActiveAnnouncements } = require('./announcement.controller');

exports.listAnnouncements = async (req, res) => {
  await checkExpiredAnnouncements();
  const announcementList = await getActiveAnnouncements();
  return res.render('layouts/main', {
    partialName: 'mainPage',
    announcementList,
  });
};
