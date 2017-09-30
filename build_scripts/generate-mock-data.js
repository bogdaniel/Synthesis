/* This script generates mock data for local development.
   This way you don't have to point to an actual API,
   but you can enjoy realistic, but randomized data,
   and rapid page loads due to local, static data.
 */

/* eslint-disable no-console */

import jsf from 'json-schema-faker';
import fs from 'fs';
import chalk from 'chalk';
import { schema } from './mock-data-schema';


const json = JSON.stringify(jsf(schema));
const log = console.log;

fs.writeFile('./src/api/db.json', json, (err) => {
  if (err) {
    return log(chalk.red(err));
  }
  return log(chalk.green('Mock data generated'));
});
