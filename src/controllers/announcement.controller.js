/* eslint-disable no-await-in-loop */
const moment = require('moment');
const i18n = require('../services/i18n');
const routeNames = require('../locales/routeNamesTR.json');
const { DB } = require('../services/sequelize');

const { Op } = DB.Sequelize;

exports.getActiveAnnouncements = async () => {
  const announcementList = await DB.Announcement.findAll({
    raw: true,
    where: {
      isActive: 1,
    },
  });
  return announcementList;
};
exports.checkExpiredAnnouncements = async (req, res) => {
  const announcementList = await DB.Announcement.findAll({
    raw: true,
    where: {
      endDate: { [Op.lte]: moment(new Date()).format('DD-MM-YYYY') },
    },
  });
  for (let i = 0; i < announcementList.length; i++) {
    if (announcementList[i].isActive) {
      await DB.Announcement.update({
        isActive: 0,
      }, {
        where: {
          id: announcementList[i].id,
        },
      });
    }
  }
};
exports.listAnnouncements = async (req, res) => {
  const announcementList = await DB.Announcement.findAll({
    raw: true,
  });
  return res.render('layouts/main', {
    partialName: 'listAnnouncements',
    announcementList,
  });
};

exports.addAnnouncementView = async (req, res) => {
  const roles = await DB.UserRole.findAll({
    raw: true,
  });
  return res.render('layouts/main', {
    partialName: 'addAnnouncement',
    endPoint: 'add',
    roles,
  });
};

exports.addAnnouncement = async (req, res) => {
  const announcement = req.body;
  console.log(announcement);
  try {
    await DB.Announcement.create({
      title: announcement.title,
      content: announcement.content,
      isActive: announcement.isActive,
      isFlash: announcement.isFlash,
      startDate: announcement.startDate,
      endDate: announcement.endDate,
      roleId: announcement.roleId,
    });
    req.session.flashMessages = {
      message: i18n.__('ADDED', routeNames.ANNOUNCEMENT),
      type: 'success',
    };
    return res.redirect('/announcement/add');
  } catch (error) {
    req.session.flashMessages = {
      message: i18n.__('ADD_ERROR', routeNames.ANNOUNCEMENT),
      type: 'danger',
      error: error.message,
    };
    return res.redirect('/announcement/add');
  }
};

exports.updateAnnouncementView = async (req, res) => {
  const { id } = req.params;
  const roles = await DB.UserRole.findAll({
    raw: true,
  });
  try {
    const announcement = await DB.Announcement.findOne({
      where: { id },
      raw: true,
    });
    if (!announcement) {
      return res.redirect('/announcement/list');
    }
    return res.render('layouts/main', {
      partialName: 'addAnnouncement',
      endPoint: 'update',
      announcement,
      roles,
    });
  } catch (error) {
    return res.redirect('/announcement/list');
  }
};

exports.updateAnnouncement = async (req, res) => {
  const announcement = req.body;
  try {
    await DB.Announcement.update(
      {
        title: announcement.title,
        content: announcement.content,
        isActive: announcement.isActive,
        isFlash: announcement.isFlash,
        startDate: announcement.startDate,
        endDate: announcement.endDate,
        roleId: announcement.roleId,
      },
      {
        where: {
          id: announcement.id,
        },
        raw: true,
      },
    );
    req.session.flashMessages = {
      message: i18n.__('UPDATED', routeNames.ANNOUNCEMENT),
      type: 'success',
    };
    return res.redirect(`/announcement/update/${announcement.id}`);
  } catch (error) {
    req.session.flashMessages = {
      message: i18n.__('UPDATE_ERROR', routeNames.ANNOUNCEMENT),
      type: 'danger',
      error: error.message,
    };
    return res.redirect(`/announcement/update/${announcement.id}`);
  }
};

exports.deleteAnnouncement = async (req, res) => {
  const { id } = req.params;
  try {
    const announcement = await DB.Announcement.findOne({
      where: { id },
    });
    if (!announcement) {
      return res.redirect('/announcement/list');
    }
    await DB.Announcement.destroy({
      where: { id },
    });
    req.session.flashMessages = {
      message: i18n.__('DELETED', routeNames.ANNOUNCEMENT),
      type: 'success',
    };
    return res.redirect('/announcement/list');
  } catch (error) {
    req.session.flashMessages = {
      message: i18n.__('DELETE_ERROR', routeNames.ANNOUNCEMENT),
      type: 'danger',
      error: error.message,
    };
    return res.redirect('/announcement/list');
  }
};
