const { BigQuery } = require('@google-cloud/bigquery');
const i18n = require('../services/i18n');
const routeNames = require('../locales/routeNamesTR.json');
const { DB } = require('../services/sequelize');

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
