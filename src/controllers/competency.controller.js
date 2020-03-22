// const db = require('../config/db');
const { db } = require('../models');

const competencyList = [];

exports.getCompetencyList = async () => {
  if (competencyList.length === 0) {
    await this.loadAppCompetencyList();
  }
  return competencyList;
};

exports.loadAppCompetencyList = async () => {
  const appCompetencyList = await this.getAllCompetencies();
  for (const competency of appCompetencyList) {
    competencyList[competency.description] = competency.id;
  }
  return competencyList;
};

exports.getAllCompetencies = async () => {
  const appCompetency = await db.Competency.findAll({
    raw: true,
  });
  return appCompetency;
};

exports.getRoleCompetencies = async (roleId) => {
  const roleCompetencyList = await db.RoleCompetency.findAll({
    where: { roleId },
    raw: true,
  });
  return roleCompetencyList;
};
