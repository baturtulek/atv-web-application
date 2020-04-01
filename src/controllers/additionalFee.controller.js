const i18n = require('../services/i18n');
const routeNames = require('../locales/routeNamesTR.json');
const { db } = require('../services/sequelize');

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
    req.session.flashMessages = {
      message: i18n.__('ADDED', routeNames.ADDITIONAL_FEE),
      type: 'success',
    };
    return res.redirect('/additionalfee/add');
  } catch (error) {
    req.session.flashMessages = {
      message: i18n.__('ADD_ERROR', routeNames.ADDITIONAL_FEE),
      type: 'danger',
    };
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
    req.session.flashMessages = {
      message: i18n.__('UPDATED', routeNames.ADDITIONAL_FEE),
      type: 'success',
    };
    return res.redirect(`/additionalfee/update/${additionalFee.id}`);
  } catch (error) {
    req.session.flashMessages = {
      message: i18n.__('UPDATE_ERROR', routeNames.ADDITIONAL_FEE),
      type: 'danger',
    };
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
    req.session.flashMessages = {
      message: i18n.__('DELETED', routeNames.ADDITIONAL_FEE),
      type: 'success',
    };
    return res.redirect('/additionalfee/list');
  } catch (error) {
    req.session.flashMessages = {
      message: i18n.__('DELETE_ERROR', routeNames.ADDITIONAL_FEE),
      type: 'danger',
    };
    return res.redirect('/additionalfee/list');
  }
};
