/* eslint-disable no-undef */
/* eslint-disable guard-for-in */
/* eslint-disable no-await-in-loop */
const { BigQuery } = require('@google-cloud/bigquery');
const i18n = require('../services/i18n');
const routeNames = require('../locales/routeNamesTR.json');
const { DB } = require('../services/sequelize');
const { vehicleStates } = require('../services/enums');

exports.createReportByDayView = async (req, res) => {
  res.render('layouts/main', {
    partialName: 'createReportByDay',
  });
};

exports.createReportByDay = async (req, res) => {
  const { date } = req.body;
  const bigqueryClient = new BigQuery();
  let report;
  const sqlQuery = `SELECT * FROM EXTERNAL_QUERY("atvsignum.us.atv", "select * from TOWED_VEHICLE WHERE DATE_FORMAT(towedDate, '%Y %m %d') = DATE_FORMAT('${date}', '%Y %m %d');");`;

  const options = {
    query: sqlQuery,
  };

  try {
    const [rows] = await bigqueryClient.query(options);
    report = rows;
    console.log('ROWS', rows);
  } catch (err) {
    console.log('ERROR', err);
  }


  res.render('layouts/main', {
    partialName: 'createReportByDay',
    report,
  });
};

exports.towedByReportView = async (req, res) => {
  const parkingLots = await DB.ParkingLot.findAll({
    raw: true,
  });
  res.render('layouts/main', {
    partialName: 'towedByReport',
    parkingLots,
  });
};

exports.towedByReport = async (req, res) => {
  const { date, date2, parkingLotId } = req.body;
  const bigqueryClient = new BigQuery();
  let report;
  const sqlQuery = `SELECT * FROM EXTERNAL_QUERY("atvsignum.us.atv", "select * from TOWED_VEHICLE WHERE parkingLotId = ${parkingLotId} AND DATE_FORMAT(towedDate, '%Y %m %d') BETWEEN DATE_FORMAT('${date}', '%Y %m %d') AND DATE_FORMAT('${date2}', '%Y %m %d');");`;

  const options = {
    query: sqlQuery,
  };

  try {
    const [rows] = await bigqueryClient.query(options);
    for (let i = 0; i < rows.length; i++) {
      const staff = await DB.User.findOne({
        where: { id: rows[i].staffId },
        raw: true,
      });
      rows[i].staffName = staff.name;
    }
    report = rows;
    console.log('ROWS', rows);
  } catch (err) {
    console.log('ERROR', err);
  }


  res.render('layouts/main', {
    partialName: 'towedByReport',
    report,
  });
};
exports.vehiclesInParkingLotReportView = async (req, res) => {
  const parkingLots = await DB.ParkingLot.findAll({
    raw: true,
  });
  const vehicleTypes = await DB.VehicleType.findAll({
    raw: true,
  });

  res.render('layouts/main', {
    partialName: 'vehiclesInParkingLotReport',
    parkingLots,
    vehicleTypes,
  });
};
exports.vehiclesInParkingLotReport = async (req, res) => {
  const { vehicleTypeId, parkingLotId, date, date2 } = req.body;
  const bigqueryClient = new BigQuery();
  let report;
  const sqlQuery = `SELECT * FROM EXTERNAL_QUERY("atvsignum.us.atv", "select v.chassisNo, v.modelYear, c.description, t.plate, p.receiver, t.entranceParkingLotDate, t.exitParkingLotDate from TOWED_VEHICLE t INNER JOIN PRICE p ON t.plate = p.plate INNER JOIN VEHICLE v ON t.plate = v.plate INNER JOIN VEHICLE_COLOR c ON v.colorId = c.id WHERE v.vehicleTypeId = ${vehicleTypeId} AND t.parkingLotId = ${parkingLotId} AND DATE_FORMAT(t.towedDate, '%Y %m %d') BETWEEN DATE_FORMAT('${date}', '%Y %m %d') AND DATE_FORMAT('${date2}', '%Y %m %d');");`;

  const options = {
    query: sqlQuery,
  };

  try {
    const [rows] = await bigqueryClient.query(options);
    report = rows;
    console.log('ROWS', rows);
  } catch (err) {
    console.log('ERROR', err);
  }


  res.render('layouts/main', {
    partialName: 'vehiclesInParkingLotReport',
    report,
  });
};

exports.outgoingVehiclesReportView = async (req, res) => {
  const parkingLots = await DB.ParkingLot.findAll({
    raw: true,
  });
  res.render('layouts/main', {
    partialName: 'outgoingVehicles',
    parkingLots,
  });
};
exports.outgoingVehiclesReport = async (req, res) => {
  const { parkingLotId, date, date2 } = req.body;
  const bigqueryClient = new BigQuery();
  let report;
  const sqlQuery = `SELECT * FROM EXTERNAL_QUERY("atvsignum.us.atv", "select t.plate, p.receiver, t.entranceParkingLotDate, t.exitParkingLotDate from TOWED_VEHICLE t INNER JOIN PRICE p ON t.plate = p.plate WHERE t.parkingLotId = ${parkingLotId} AND t.stateId = ${vehicleStates.OUTGOING} AND DATE_FORMAT(t.towedDate, '%Y %m %d') BETWEEN DATE_FORMAT('${date}', '%Y %m %d') AND DATE_FORMAT('${date2}', '%Y %m %d');");`;

  const options = {
    query: sqlQuery,
  };

  try {
    const [rows] = await bigqueryClient.query(options);
    report = rows;
    console.log('ROWS', rows);
  } catch (err) {
    console.log('ERROR', err);
  }


  res.render('layouts/main', {
    partialName: 'outgoingVehicles',
    report,
  });
};

exports.parkingLotZReportView = async (req, res) => {
  const parkingLots = await DB.ParkingLot.findAll({
    raw: true,
  });
  res.render('layouts/main', {
    partialName: 'parkingLotZ',
    parkingLots,
  });
};
exports.parkingLotZReport = async (req, res) => {
  const { parkingLotId, date, date2 } = req.body;
  const bigqueryClient = new BigQuery();
  let report;
  const sqlQuery = `SELECT * FROM EXTERNAL_QUERY("atvsignum.us.atv", "select t.plate, p.receiver, p.fullPrice, p.discountPrice, t.entranceParkingLotDate, t.exitParkingLotDate from TOWED_VEHICLE t INNER JOIN PRICE p ON t.plate = p.plate WHERE t.parkingLotId = ${parkingLotId} AND t.stateId = ${vehicleStates.OUTGOING} AND DATE_FORMAT(t.towedDate, '%Y %m %d') BETWEEN DATE_FORMAT('${date}', '%Y %m %d') AND DATE_FORMAT('${date2}', '%Y %m %d');");`;

  const options = {
    query: sqlQuery,
  };

  try {
    const [rows] = await bigqueryClient.query(options);
    report = rows;
    console.log('ROWS', rows);
  } catch (err) {
    console.log('ERROR', err);
  }
  let totalPrice = 0;
  report.forEach(rep => {
    console.log(rep);
    totalPrice += rep.discountPrice;
  });
  console.log(totalPrice);

  res.render('layouts/main', {
    partialName: 'parkingLotZ',
    report,
    totalPrice,
  });
};
