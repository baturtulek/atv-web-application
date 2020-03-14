const chalk = require('chalk');
const http = require('http');
const app = require('./app');
const { getCompetencyList } = require('./controllers/competency.controller');

const server = http.createServer(app);
server.listen(process.env.PORT);

server.on('listening', async () => {
  await loadAppCompetencies();
  console.log(chalk.green.bold(`App is running at port: ${process.env.PORT} in ${app.get('env')} mode.`));
});

server.on('error', (error) => {
  console.log(chalk.red.bold(error));
  process.exit();
});

const loadAppCompetencies = async () => {
  app.locals.competencyList = await getCompetencyList();
};
