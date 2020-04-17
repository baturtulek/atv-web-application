const chalk = require('chalk');
const http = require('http');
const app = require('./app');
const { initializeDatabase } = require('./services/sequelize');
const { loadAppCompetencyList } = require('./controllers/competency.controller');

const server = http.createServer(app);
server.listen(process.env.PORT);

server.on('listening', async () => {
  await initializeDatabase();
  await loadAppCompetencyList(app);
  console.log(chalk.green.bold(`App is running at port: ${process.env.PORT} in ${app.get('env')} mode.`));
});

server.on('error', (error) => {
  console.log(chalk.red.bold(error));
  process.exit();
});
