import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiffFunction from '../src/index.js';
import result from '../__fixtures__/result.js';

const { test } = require('jest');
const { expect } = require('jest');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('comprasion', () => {
  const correctFile1Path = getFixturePath('file1.json');
  const correctFile2Path = getFixturePath('file2.json');
  expect(genDiffFunction(correctFile1Path, correctFile2Path)).toEqual(result);
});
