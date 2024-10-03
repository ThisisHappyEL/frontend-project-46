#!/usr/bin/env node

import { readFileSync } from 'node:fs';
import path from 'node:path';
import parser from './parser.js';
import getDifferenceTree from './getDifferenceTreeFile.js';
import formatter from './formatters/index.js';

const getFullPath = (filePath) => path.resolve(process.cwd(), filePath);

const getExtension = (filename) => path.extname(filename).slice(1);

const getData = (filePath) => parser(readFileSync(filePath, 'utf-8'), getExtension(filePath));

const getDiffFunction = (path1, path2, format = 'stylish') => {
  const filePath1 = getFullPath(path1);
  const filePath2 = getFullPath(path2);

  const data1 = getData(filePath1);
  const data2 = getData(filePath2);

  return formatter(getDifferenceTree(data1, data2), format);
};

export default getDiffFunction;
