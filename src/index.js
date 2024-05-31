#!/usr/bin/env node

import _ from 'lodash';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import parse from './parser.js';

/* При передаче в качетсве аргумента правильно написанного относительного пути выводит абсолютный

console.log(buildFullPath('../__fixtures__/file1.json'));

💻 src (main) $ node index.js
/home/ThisisHappy/LearnDir/frontend-project-46/__fixtures__/file1.json
*/

const buildFullPath = (filePath) => path.resolve(process.cwd(), filePath);

const genDiffFunction = (path1, path2) => {
  const fullPath1 = buildFullPath(path1);
  const fullPath2 = buildFullPath(path2);

  const data1 = readFileSync(fullPath1, 'utf-8');
  const data2 = readFileSync(fullPath2, 'utf-8');

  const [parsedObj1, parsedObj2] = parse(data1, data2);

  // Найти пересечение с помощью union из лудаш

  const keys1 = Object.keys(parsedObj1);
  const keys2 = Object.keys(parsedObj2);
  const sortedKeys = _.union(keys1, keys2);

  const latestPush = [];
  const diff = sortedKeys.reduce((acc, key) => {
    if (Object.hasOwn(parsedObj1, key) && !Object.hasOwn(parsedObj2, key)) {
      acc.push(` - ${key}: ${parsedObj1[key]}`);
    }
    if (Object.hasOwn(parsedObj1, key) && Object.hasOwn(parsedObj2, key)) {
      if (parsedObj1[key] === parsedObj2[key]) {
        acc.push(`   ${key}: ${parsedObj1[key]}`);
      } else {
        acc.push(` - ${key}: ${parsedObj1[key]}`);
        latestPush.push(` + ${key}: ${parsedObj2[key]}`);
      }
    }
    if (!Object.hasOwn(parsedObj1, key) && Object.hasOwn(parsedObj2, key)) {
      acc.push(` + ${key}: ${parsedObj2[key]}`);
    }
    return acc;
  }, ['{']);

  diff.push(latestPush);
  diff.push('}');
  return diff.join('\n');
};

export default genDiffFunction;
