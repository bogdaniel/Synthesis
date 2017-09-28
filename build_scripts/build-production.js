/* eslint-disable no-console */
import webpack from 'webpack';
import webpackConfig from 'webpack.config.prod';
import chalk from 'chalk';

process.env.NODE_ENV = 'production';
const log = console.log;

log(chalk.blue('Generating minified bundle for production. This will take a moment...'));

webpack(webpackConfig).run((err, stats) => {
  if (err) {
    // So a fatal error occurred Stop here.
    log(chalk.red(err));
    return 1;
  }

  const jsonStats = stats.toJson();

  if (jsonStats.hasErrors) {
    return jsonStats.errors.map(error => log(chalk.red(error)));
  }

  if (jsonStats.hasWarnings) {
    log(chalk.yellow('Webpack generated the following warnings:'));
    jsonStats.warnings.map(warning => log(chalk.yellow(warning)));
  }

  log(`Webpack stats: ${stats}`);

  // If we got so far, the build process is finished with success.
  log(chalk.green('Your application has been built for production and written to the distribution folder'));


  return 0;

});
