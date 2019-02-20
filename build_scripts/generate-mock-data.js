/* This script generates mock data for local development.
   This way you don't have to point to an actual API,
   but you can enjoy realistic, but randomized data,
   and rapid page loads due to local, static data.
 */

/* eslint-disable no-console */
const jsf = require('json-schema-faker');
const chalk = require('chalk');
const fs = require('fs');

// import {schema} from './mock-data-schema';
const schema = require('./mock-data-schema');

const json = JSON.stringify(jsf(schema));
const { log } = console;

fs.writeFile('./src/api/db.json', json, (err) => {
  if (err) {
    return log(chalk.red(err));
  }
  return log(chalk.green('Mock data generated'));
});
