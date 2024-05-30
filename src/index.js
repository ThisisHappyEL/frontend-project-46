#!/usr/bin/env node

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

  return [parsedObj1, parsedObj2];
};

export default genDiffFunction;
