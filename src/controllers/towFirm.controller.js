const i18n = require('../services/i18n');
const routeNames = require('../locales/routeNamesTR.json');
const { db } = require('../services/sequelize');
const { getNullableInput, getCheckboxStatus } = require('../utils/formHelpers');
const { getFormattedTimeStamp } = require('../utils/timezoneHelpers');

exports.listTowFirms = async (req, res) => {
  const towFirmList = await db.TowFirm.findAll({
    raw: true,
  });
  return res.render('layouts/main', {
    partialName: 'listTowFirm',
    towFirmList,
  });
};

exports.addTowFirmView = async (req, res) => {
  return res.render('layouts/main', {
    partialName: 'addTowFirm',
    endPoint: 'add',
  });
};

exports.addTowFirm = async (req, res) => {
  const towFirm = req.body;
  try {
    await db.TowFirm.create({
      code: towFirm.code,
      name: towFirm.name,
      provinceCode: towFirm.provinceCode,
      phoneNumber: getNullableInput(towFirm.phoneNumber),
      faxNumber: getNullableInput(towFirm.faxNumber),
      registrationDate: getFormattedTimeStamp('YYYY-MM-DD HH:mm:ss'),
      isActive: getCheckboxStatus(towFirm.isActive),
    });
    req.session.flashMessages = {
      message: i18n.__('ADDED', routeNames.TOW_FIRM),
      type: 'success',
    };
    return res.redirect('/towfirm/add');
  } catch (error) {
    console.log(error);
    req.session.flashMessages = {
      message: i18n.__('ADD_ERROR', routeNames.TOW_FIRM),
      type: 'danger',
    };
    return res.redirect('/towfirm/add');
  }
};

exports.updateTowFirmView = async (req, res) => {
  const { id } = req.params;
  try {
    const towFirm = await db.TowFirm.findOne({
      where: { id },
      raw: true,
    });
    if (!towFirm) {
      return res.redirect('/towfirm/list');
    }
    return res.render('layouts/main', {
      partialName: 'addTowFirm',
      endPoint: 'update',
      towFirm,
    });
  } catch (error) {
    return res.redirect('/towfirm/list');
  }
};

exports.updateTowFirm = async (req, res) => {
  const towFirm = req.body;
  try {
    await db.TowFirm.update(
      {
        code: towFirm.code,
        name: towFirm.name,
        provinceCode: towFirm.provinceCode,
        phoneNumber: getNullableInput(towFirm.phoneNumber),
        faxNumber: getNullableInput(towFirm.faxNumber),
        isActive: getCheckboxStatus(towFirm.isActive),
      },
      {
        where: {
          id: towFirm.id,
        },
        raw: true,
      },
    );
    req.session.flashMessages = {
      message: i18n.__('UPDATED', routeNames.TOW_FIRM),
      type: 'success',
    };
    return res.redirect(`/towfirm/update/${towFirm.id}`);
  } catch (error) {
    req.session.flashMessages = {
      message: i18n.__('UPDATE_ERROR', routeNames.TOW_FIRM),
      type: 'danger',
    };
    return res.redirect(`/towfirm/update/${towFirm.id}`);
  }
};

exports.deleteTowFirm = async (req, res) => {
  const { id } = req.params;
  try {
    const towFirm = await db.TowFirm.findOne({
      where: { id },
    });
    if (!towFirm) {
      return res.redirect('/towfirm/list');
    }
    await db.TowFirm.destroy({
      where: { id },
    });
    req.session.flashMessages = {
      message: i18n.__('DELETED', routeNames.TOW_FIRM),
      type: 'success',
    };
    return res.redirect('/towfirm/list');
  } catch (error) {
    req.session.flashMessages = {
      message: i18n.__('DELETE_ERROR', routeNames.TOW_FIRM),
      type: 'danger',
    };
    return res.redirect('/towfirm/list');
  }
};
