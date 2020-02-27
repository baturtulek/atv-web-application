const chalk = require('chalk');
const app = require('./app');

app.listen(process.env.PORT, () => {
  console.log(chalk.green.bold(`App is running at port: ${process.env.PORT}.`));
}).on('error', (error) => {
  console.log(chalk.red.bold(error));
  process.exit();
});
