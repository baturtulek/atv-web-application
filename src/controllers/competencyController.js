const db = require("../config/db");
const httpStatus = require("http-status");
const helper = require("../shared/helper");

exports.competencyView = (req, res) => {
  if (helper.IsAuthorized(req, res)) {
    return res.status(httpStatus.OK).json({
      message: `You're logged in. this should show competencyView` // return searchVehicleView
    });
  }
};

exports.addCompetency = async (req, res) => {
  if (helper.IsAuthorized) {
    const { description } = req.body;
    try {
      const found = await db.Competency.findOne({
        where: {
          description
        },
        raw: true
      });

      if (!found) {
        const createdCompetency = await db.Competency.create({
          description: description
        });
        if (createdCompetency) {
          const result = {
            message: `Record has been added with the competency description = ${description}`,
            success: true
          };
          return res.status(httpStatus.CREATED).json(result); // return the appropiate view that confirms vehicle has been added
        }
      } else {
        return res.status(httpStatus.CONFLICT).json({
          message: `there is already a record with description = ${description}`
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
};

exports.listCompetency = async (req, res) => {
  if (helper.IsAuthorized(req, res)) {
    try {
      const allCompetencies = await db.Competency.findAll({
        raw: true
      });
      if (allCompetencies) {
        console.log(allCompetencies);
        return JSON.stringify(allCompetencies);
      } else {
        return res.status(httpStatus.NOT_FOUND).json({
          message: `there is no record to show`
        });
      }
    } catch (exception) {
      console.log(exception);
    }
  }
};

exports.competencyDeleteView = (req, res) => {
  if (helper.IsAuthorized(req, res)) {
    return res.status(httpStatus.OK).json({
      message: `You're logged in. this should show competencyDeleteView`
    });
  }
};

exports.deleteCompetency = async (req, res) => {
  if (helper.IsAuthorized(req, res)) {
    const { description } = req.body;
    try {
      const found = await db.Competency.findOne({
        where: {
          description
        }
      });
      if (!found) {
        return res.status(httpStatus.NOT_FOUND).json({
          message: `competency not found with the description of ${description}`
        });
      }
      await db.Competency.destroy({
        where: {
          description
        }
      });
      return res.status(httpStatus.OK).json({
        message: `competency deleted with the description of ${description}`
      });
    } catch (ex) {
      console.log(ex);
    }
  }
};
