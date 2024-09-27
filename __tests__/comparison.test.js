import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { test, expect } from '@jest/globals';

import genDiffFunction from '../src/index.js';
import result from '../__fixtures__/result.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('comparison', () => {
  const correctFile1Path = getFixturePath('file1.json');
  const correctFile2Path = getFixturePath('file2.json');
  expect(genDiffFunction(correctFile1Path, correctFile2Path)).toEqual(result);
});

test('comparisonYaml', () => {
  const correctFile1Path = getFixturePath('file1.yaml');
  const correctFile2Path = getFixturePath('file2.yaml');
  expect(genDiffFunction(correctFile1Path, correctFile2Path)).toEqual(result);
});

test('comparisonYml', () => {
  const correctFile1Path = getFixturePath('file1.yml');
  const correctFile2Path = getFixturePath('file2.yml');
  expect(genDiffFunction(correctFile1Path, correctFile2Path)).toEqual(result);
});