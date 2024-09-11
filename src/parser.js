#!/usr/bin/env node

import yaml from 'js-yaml';

const parser = (file, extension) => {
  switch (extension) {
    case 'json':
      return JSON.parse(file);
    case 'yaml':
      return yaml.load(file);
    case 'yml':
      return yaml.load(file);
    default:
      return 'Дефолт для линтера'
  }
}

export default parser;

/*
Хитрый способ через создание объекта parser и последующего его вызова в экспорте через анонимную функцию
Расширение становится ключом для обрящения к объекту parse и за счёт него мгновенно вызывается функция парсинга к данным
const parser = {
  json: JSON.parse,
  yaml: yaml.load,
  yml: yaml.load,
};

export default (data, extension) => parser[extension](data);

------------------------------------------------------------------

Старая реализация
const parse = (file1, file2, ) => {
  const parseObj1 = JSON.parse(file1);
  const parseObj2 = JSON.parse(file2);

  return [parseObj1, parseObj2];
};

*/
