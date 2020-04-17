const i18n = require('../services/i18n');
const routeNames = require('../locales/routeNamesTR.json');
const { DB } = require('../services/sequelize');

exports.requestAnnualLeaveView = (req, res) => {
  return res.render('layouts/main', {
    partialName: 'requestAnnualLeave',
  });
};

exports.requestAnnualLeave = async (req, res) => {
  const {
    user, numberOfDays, type, startDate, endDate,
  } = req.body;

  try {
    await DB.AnnualLeave.create({
      user,
      numberOfDays,
      type,
      startDate,
      endDate,
      status: 'requested',
    });

    return res.redirect('/annualleave/request');
  } catch (err) {
    return res.redirect('/annualleave/request');
  }
};

exports.annualLeaveList = async (req, res) => {
  try {
    const annualLeaveList = await DB.AnnualLeave.findAll({
      raw: true,
    });
    console.log('ANNUALLEAVEAAAAA', annualLeaveList);
    return res.render('layouts/main', {
      partialName: 'annualLeaveList',
      annualLeaveList,
    });
  } catch (err) {
    console.log('ANNUALLEAVEAAAAA ERROR', err);
    return res.render('layouts/main', {
      partialName: 'annualLeaveList',
    });
  }
};

exports.acceptAnnualLeaveRequest = async (req, res) => {
  const { id } = req.query;
  let { result } = req.params;

  if (result === 'approved') {
    result = 'onaylandı';
  } else {
    result = 'reddedildi';
  }
  try {
    await DB.AnnualLeave.update(
      { status: result },
      { where: { id } },
    );
  } catch (err) {
    return res.redirect('/annualleave/list');
  }
  return res.redirect('/annualleave/list');
};
