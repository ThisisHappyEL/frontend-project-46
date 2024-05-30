#!/usr/bin/env node

const parse = (file1, file2) => {
  const parseObj1 = JSON.parse(file1);
  const parseObj2 = JSON.parse(file2);

  return [parseObj1, parseObj2];
};

export default parse;
