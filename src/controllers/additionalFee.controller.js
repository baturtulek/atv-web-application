
// const db = require('../config/db');
const db = require('../models');
const { RESPONSE_MESSAGE } = require('../messages');

const ROUTE_NAME = 'Ek Ücret';

exports.listAdditionalFees = async (req, res) => {
  const additionalFeeList = await db.AdditionalFee.findAll({
    raw: true,
  });
  return res.render('layouts/main', {
    partialName: 'listAdditionalFees',
    additionalFeeList,
  });
};

exports.addAdditionalFeeView = async (req, res) => {
  return res.render('layouts/main', {
    partialName: 'addAdditionalFee',
    endPoint: 'add',
  });
};

exports.addAdditionalFee = async (req, res) => {
  const additionalFee = req.body;
  try {
    await db.AdditionalFee.create({
      name: additionalFee.name,
      fee: additionalFee.fee,
    });
    req.session.flashMessages = { message: `${ROUTE_NAME} ${RESPONSE_MESSAGE.ADDED}`, type: 'success' };
    return res.redirect('/additionalfee/add');
  } catch (error) {
    req.session.flashMessages = { message: `${ROUTE_NAME} ${RESPONSE_MESSAGE.ADD_ERROR}`, type: 'danger' };
    return res.redirect('/additionalfee/add');
  }
};

exports.updateAdditionalFeeView = async (req, res) => {
  const { id } = req.params;
  try {
    const additionalFee = await db.AdditionalFee.findOne({
      where: { id },
      raw: true,
    });
    if (!additionalFee) {
      return res.redirect('/additionalfee/list');
    }
    return res.render('layouts/main', {
      partialName: 'addAdditionalFee',
      endPoint: 'update',
      additionalFee,
    });
  } catch (error) {
    return res.redirect('/additionalfee/list');
  }
};

exports.updateAdditionalFee = async (req, res) => {
  const additionalFee = req.body;
  try {
    await db.AdditionalFee.update(
      {
        name: additionalFee.name,
        fee: additionalFee.fee,
      },
      {
        where: {
          id: additionalFee.id,
        },
        raw: true,
      },
    );
    req.session.flashMessages = { message: `${ROUTE_NAME} ${RESPONSE_MESSAGE.UPDATED}`, type: 'success' };
    return res.redirect(`/additionalfee/update/${additionalFee.id}`);
  } catch (error) {
    req.session.flashMessages = { message: `${ROUTE_NAME} ${RESPONSE_MESSAGE.UPDATE_ERROR}`, type: 'danger' };
    return res.redirect(`/additionalfee/update/${additionalFee.id}`);
  }
};

exports.deleteAdditionalFee = async (req, res) => {
  const { id } = req.params;
  try {
    const additionalFee = await db.AdditionalFee.findOne({
      where: { id },
    });
    if (!additionalFee) {
      return res.redirect('/additionalfee/list');
    }
    await db.AdditionalFee.destroy({
      where: { id },
    });
    req.session.flashMessages = { message: `${ROUTE_NAME} ${RESPONSE_MESSAGE.DELETED}`, type: 'success' };
    return res.redirect('/additionalfee/list');
  } catch (error) {
    req.session.flashMessages = { message: `${ROUTE_NAME} ${RESPONSE_MESSAGE.DELETE_ERROR}`, type: 'danger' };
    return res.redirect('/additionalfee/list');
  }
};
