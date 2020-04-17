const { DB } = require('../services/sequelize');

const competencyList = [];

exports.loadAppCompetencyList = async (app) => {
  app.locals.appCompetencyList = await this.getCompetencyList();
};

exports.getCompetencyList = async () => {
  if (competencyList.length === 0) {
    await this.getAppCompetencyList();
  }
  return competencyList;
};

exports.getAppCompetencyList = async () => {
  const appCompetencyList = await this.getAllCompetencies();
  for (const competency of appCompetencyList) {
    competencyList[competency.description] = competency.id;
  }
  return competencyList;
};

exports.getAllCompetencies = async () => {
  const appCompetency = await DB.Competency.findAll({
    raw: true,
  });
  return appCompetency;
};

exports.getRoleCompetencies = async (roleId) => {
  const roleCompetencyList = await DB.RoleCompetency.findAll({
    where: { roleId },
    raw: true,
  });
  return roleCompetencyList;
};
