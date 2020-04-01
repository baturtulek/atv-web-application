const i18n = require('../services/i18n');
const routeNames = require('../locales/routeNamesTR.json');
const { db } = require('../models/DB');

exports.listEnforcementOffices = async (req, res) => {
  const enforcementOfficeList = await db.EnforcementOffice.findAll({
    raw: true,
  });
  return res.render('layouts/main', {
    partialName: 'listEnforcementOffice',
    enforcementOfficeList,
  });
};

exports.addEnforcementOfficeView = async (req, res) => {
  return res.render('layouts/main', {
    partialName: 'addEnforcementOffice',
    endPoint: 'add',
  });
};

exports.addEnforcementOffice = async (req, res) => {
  const enforcementOffice = req.body;
  try {
    await db.EnforcementOffice.create({
      name: enforcementOffice.name,
      description: enforcementOffice.description,
    });
    req.session.flashMessages = {
      message: i18n.__('ADDED', routeNames.ENFORCEMENT_OFFICE),
      type: 'success',
    };
    return res.redirect('/enforcementoffice/add');
  } catch (error) {
    req.session.flashMessages = {
      message: i18n.__('ADD_ERROR', routeNames.ENFORCEMENT_OFFICE),
      type: 'danger',
    };
    return res.redirect('/enforcementoffice/add');
  }
};

exports.updateEnfocementOfficeView = async (req, res) => {
  const { id } = req.params;
  try {
    const enforcementOffice = await db.EnforcementOffice.findOne({
      where: { id },
      raw: true,
    });
    if (!enforcementOffice) {
      return res.redirect('/enforcementoffice/list');
    }
    return res.render('layouts/main', {
      partialName: 'addEnforcementOffice',
      endPoint: 'update',
      enforcementOffice,
    });
  } catch (error) {
    return res.redirect('/enforcementoffice/list');
  }
};

exports.updateEnfocementOffice = async (req, res) => {
  const enforcementOffice = req.body;
  try {
    await db.EnforcementOffice.update(
      {
        name: enforcementOffice.name,
        description: enforcementOffice.description,
      },
      {
        where: {
          id: enforcementOffice.id,
        },
        raw: true,
      },
    );
    req.session.flashMessages = {
      message: i18n.__('UPDATED', routeNames.ENFORCEMENT_OFFICE),
      type: 'success',
    };
    return res.redirect(`/enforcementoffice/update/${enforcementOffice.id}`);
  } catch (error) {
    req.session.flashMessages = {
      message: i18n.__('UPDATE_ERROR', routeNames.ENFORCEMENT_OFFICE),
      type: 'danger',
    };
    return res.redirect(`/enforcementOffice/update/${enforcementOffice.id}`);
  }
};

exports.deleteEnfocementOffice = async (req, res) => {
  const { id } = req.params;
  try {
    const enforcementOffice = await db.EnforcementOffice.findOne({
      where: { id },
    });
    if (!enforcementOffice) {
      return res.redirect('/enforcementoffice/list');
    }
    await db.EnforcementOffice.destroy({
      where: { id },
    });
    req.session.flashMessages = {
      message: i18n.__('DELETED', routeNames.ENFORCEMENT_OFFICE),
      type: 'success',
    };
    return res.redirect('/enforcementoffice/list');
  } catch (error) {
    req.session.flashMessages = {
      message: i18n.__('DELETE_ERROR', routeNames.ENFORCEMENT_OFFICE),
      type: 'danger',
    };
    return res.redirect('/enforcementoffice/list');
  }
};
