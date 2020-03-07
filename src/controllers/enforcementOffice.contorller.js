
const db = require('../config/db');
const { getMessageFromURL, URL_MESSAGE } = require('../messages');

const ROUTE_NAME = 'İcra kurumu';

exports.listEnforcementOffices = async (req, res) => {
  const { errorMessage, successMessage } = getMessageFromURL(ROUTE_NAME, req.query);
  const enforcementOfficeList = await db.EnforcementOffice.findAll({
    raw: true,
  });
  return res.render('layouts/main', {
    partialName: 'listEnforcementOffice',
    enforcementOfficeList,
    success: successMessage,
    error: errorMessage,
  });
};

exports.addEnforcementOfficeView = async (req, res) => {
  const { errorMessage, successMessage } = getMessageFromURL(ROUTE_NAME, req.query);
  return res.render('layouts/main', {
    partialName: 'addEnforcementOffice',
    endPoint: 'add',
    success: successMessage,
    error: errorMessage,
  });
};

exports.addEnforcementOffice = async (req, res) => {
  const enforcementOffice = req.body;
  try {
    await db.EnforcementOffice.create({
      name: enforcementOffice.name,
      description: enforcementOffice.description,
    });
    return res.redirect(`/enforcementoffice/add?${URL_MESSAGE.success.add}`);
  } catch (error) {
    return res.redirect(`/enforcementoffice/add?${URL_MESSAGE.error.add}`);
  }
};

exports.updateEnfocementOfficeView = async (req, res) => {
  const { errorMessage, successMessage } = getMessageFromURL(ROUTE_NAME, req.query);
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
      error: errorMessage,
      success: successMessage,
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
    return res.redirect(`/enforcementoffice/update/${enforcementOffice.id}?${URL_MESSAGE.success.update}`);
  } catch (error) {
    return res.redirect(`/enforcementOffice/update/${enforcementOffice.id}?${URL_MESSAGE.error.update}`);
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
    return res.redirect(`/enforcementoffice/list?${URL_MESSAGE.success.delete}`);
  } catch (error) {
    return res.redirect(`/enforcementoffice/list?${URL_MESSAGE.error.delete}`);
  }
};
