const httpStatus = require('http-status');
const db = require('../config/db');

exports.listCompetency = async (req, res) => {
  if (res.locals.session.user) {
    try {
      const competencies = await db.Competency.findAll({
        raw: true,
      });
      if (competencies) {
        return res.render('layouts/main', { partialName: 'listCompetencies', competencies });
      }
      return res.status(httpStatus.NOT_FOUND).json({
        message: 'there is no record to show',
      });
    } catch (exception) {
      console.log(exception);
    }
  }
  return res.redirect('/auth/login');
};

exports.addCompetencyView = async (req, res) => {
  if (res.locals.session.user) {
    return res.render('layouts/main', { partialName: 'addCompetency' });
  }
  return res.redirect('/auth/login');
};
exports.addCompetency = async (req, res) => {
  const { description } = req.body;
  try {
    const found = await db.Competency.findOne({
      where: {
        description,
      },
      raw: true,
    });

    if (!found) {
      const createdCompetency = await db.Competency.create({
        description,
      });
      if (createdCompetency) {
        const result = {
          message: `Record has been added with the competency description = ${description}`,
          success: true,
        };
        return res.status(httpStatus.CREATED).json(result); // return the appropiate view that confirms vehicle has been added
      }
    } else {
      return res.status(httpStatus.CONFLICT).json({
        message: `there is already a record with description = ${description}`,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.deleteCompetency = async (req, res) => {
  if (res.locals.session.user) {
    const { description } = req.body;
    const { id } = req.params;

    if (description) {
      try {
        const found = await db.Competency.findOne({
          where: {
            description,
          },
        });
        if (!found) {
          return res.status(httpStatus.NOT_FOUND).json({
            message: `competency not found with the description of ${description}`,
          });
        }
        await db.Competency.destroy({
          where: {
            description,
          },
        });
        return res.status(httpStatus.OK).json({
          message: `competency deleted with the description of ${description}`,
        });
      } catch (ex) {
        console.log(ex);
      }
    } else if (id) {
      try {
        const found = await db.Competency.findOne({
          where: {
            id,
          },
        });
        if (!found) {
          return res.status(httpStatus.NOT_FOUND).json({
            message: `competency not found with the id of ${id}`,
          });
        }
        await db.Competency.destroy({
          where: {
            id,
          },
        });
        return res.status(httpStatus.OK).json({
          message: `competency deleted with the description of ${id}`,
        });
      } catch (ex) {
        console.log(ex);
      }
    } else {
      return res.status(httpStatus.NOT_FOUND).json({
        message: 'no such competency found with given parameter',
      });
    }
  }
  return res.redirect('/auth/login');
};
