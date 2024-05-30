#!/usr/bin/env node

import { program } from 'commander';
import genDiffFunction from '../src/index.js';

program
  .name('gendiff')
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1>, <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    console.log(genDiffFunction(filepath1, filepath2));
  });

program.parse();
