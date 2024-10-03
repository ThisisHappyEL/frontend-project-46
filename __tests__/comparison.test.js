import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { test, expect } from '@jest/globals';

import genDiffFunction from '../src/index.js';
import resultStylish from '../__fixtures__/resultStylish.js';
import resultPlain from '../__fixtures__/resultPlain.js';
import resultJSON from '../__fixtures__/resultJSON.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('comparison', () => {
  const correctFile1Path = getFixturePath('file1.json');
  const correctFile2Path = getFixturePath('file2.json');
  expect(genDiffFunction(correctFile1Path, correctFile2Path)).toEqual(resultStylish);
  expect(genDiffFunction(correctFile1Path, correctFile2Path, 'plain')).toEqual(resultPlain);
  expect(genDiffFunction(correctFile1Path, correctFile2Path, 'json')).toEqual(resultJSON);
});

test('comparisonYaml', () => {
  const correctFile1Path = getFixturePath('file1.yaml');
  const correctFile2Path = getFixturePath('file2.yaml');
  expect(genDiffFunction(correctFile1Path, correctFile2Path)).toEqual(resultStylish);
  expect(genDiffFunction(correctFile1Path, correctFile2Path, 'plain')).toEqual(resultPlain);
  expect(genDiffFunction(correctFile1Path, correctFile2Path, 'json')).toEqual(resultJSON);
});

test('comparisonYml', () => {
  const correctFile1Path = getFixturePath('file1.yml');
  const correctFile2Path = getFixturePath('file2.yml');
  expect(genDiffFunction(correctFile1Path, correctFile2Path)).toEqual(resultStylish);
  expect(genDiffFunction(correctFile1Path, correctFile2Path, 'plain')).toEqual(resultPlain);
  expect(genDiffFunction(correctFile1Path, correctFile2Path, 'json')).toEqual(resultJSON);
});
