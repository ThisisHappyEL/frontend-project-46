import _ from 'lodash';

const getDifferenceTree = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const sortedKeys = _.union(keys1, keys2);

  const latestPush = [];
  const diff = sortedKeys.reduce((acc, key) => {
    if (Object.hasOwn(data1, key) && !Object.hasOwn(data2, key)) {
      acc.push(` - ${key}: ${data1[key]}`);
    }
    if (Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
      if (data1[key] === data2[key]) {
        acc.push(`   ${key}: ${data1[key]}`);
      } else {
        acc.push(` - ${key}: ${data1[key]}`);
        latestPush.push(` + ${key}: ${data2[key]}`);
      }
    }
    if (!Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
      acc.push(` + ${key}: ${data2[key]}`);
    }
    return acc;
  }, ['{']);

  diff.push(latestPush);
  diff.push('}');
  return diff.join('\n');
};

export default getDifferenceTree;