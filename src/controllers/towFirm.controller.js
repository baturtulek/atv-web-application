const moment = require('moment');
const db = require('../config/db');
const { RESPONSE_MESSAGE } = require('../messages');

const ROUTE_NAME = 'Çekici Firma';

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
      registrationDate: getCurrentTimeStamp(),
      isActive: getCheckboxStatus(towFirm.isActive),
    });
    req.session.flashMessages = { message: `${ROUTE_NAME} ${RESPONSE_MESSAGE.ADDED}`, type: 'success' };
    return res.redirect('/towfirm/add');
  } catch (error) {
    console.log(error);
    req.session.flashMessages = { message: `${ROUTE_NAME} ${RESPONSE_MESSAGE.ADD_ERROR}`, type: 'danger' };
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
  console.log('UPATE TOW FIRM');
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
    req.session.flashMessages = { message: `${ROUTE_NAME} ${RESPONSE_MESSAGE.UPDATED}`, type: 'success' };
    return res.redirect(`/towfirm/update/${towFirm.id}`);
  } catch (error) {
    req.session.flashMessages = { message: `${ROUTE_NAME} ${RESPONSE_MESSAGE.UPDATE_ERROR}`, type: 'danger' };
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
    req.session.flashMessages = { message: `${ROUTE_NAME} ${RESPONSE_MESSAGE.DELETED}`, type: 'success' };
    return res.redirect('/towfirm/list');
  } catch (error) {
    req.session.flashMessages = { message: `${ROUTE_NAME} ${RESPONSE_MESSAGE.DELETE_ERROR}`, type: 'danger' };
    return res.redirect('/towfirm/list');
  }
};

const getCurrentTimeStamp = () => {
  return moment().tz('Europe/Istanbul').format('YYYY-MM-DD HH:mm:ss');
};

const getCheckboxStatus = (input) => {
  if (input == undefined) {
    return false;
  }
  return true;
};

const getNullableInput = (input) => {
  if (input === '' || input === undefined) {
    return null;
  }
  return input;
};
