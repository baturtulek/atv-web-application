
const db = require('../config/db');
const { getMessage } = require('../messages/messageCodes');

const ROUTE_NAME = 'İcra kurumu';

exports.listEnforcementOffices = async (req, res) => {
  const { errorMessage, successMessage } = getMessage(ROUTE_NAME, req.query);
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
  const { errorMessage, successMessage } = getMessage(ROUTE_NAME, req.query);
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
    return res.redirect('/enforcementoffice/add?success=added');
  } catch (error) {
    return res.redirect('/enforcementoffice/add?error=add_error');
  }
};

exports.updateEnfocementOfficeView = async (req, res) => {
  const { errorMessage, successMessage } = getMessage(ROUTE_NAME, req.query);
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
    return res.redirect(`/enforcementoffice/update/${enforcementOffice.id}?success=updated`);
  } catch (error) {
    return res.redirect(`/enforcementOffice/update/${enforcementOffice.id}?error=update_error`);
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
    return res.redirect('/enforcementoffice/list?success=deleted');
  } catch (error) {
    return res.redirect('/enforcementoffice/list?error=delete_error');
  }
};
