const chalk = require('chalk');
const app = require('./app');
const { Competencies } = require('./authorization/competencies');

app.listen(process.env.PORT, () => {
  loadAppCompetencies();
  console.log(chalk.green.bold(`App is running at port: ${process.env.PORT}.`));
}).on('error', (error) => {
  console.log(chalk.red.bold(error));
  process.exit();
});

const loadAppCompetencies = () => {
  app.locals.AppCompetencies = Competencies;
};
