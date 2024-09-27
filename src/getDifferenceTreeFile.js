import _ from 'lodash';

const createChildrenTrees = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const sortedKeys = _.sortBy(_.union(keys1, keys2));

  // - если есть в первом, но нет во втором
  //   если есть в обоих
  // + если есть во втором, но нет в первом

  const children = sortedKeys.map((key) => {
    if (! _.has(data1, key)) {
      return {
        type: 'added',
        key,
        value: data2[key]
      };
    }
    if (! _.has(data2, key)) {
      return {
        type: 'deleted',
        key,
        value: data1[key],
      };
    }
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return {
        type: 'ancestor',
        key,
        children: createChildrenTrees(data1[key], data2[key]),
      };
    } 
    if (_.isEqual(data1[key], data2[key])) {
      return {
        type: 'notRedacted',
        key,
        value: data1 [key],
      };
    }
    return {
      type: 'redacted',
      key,
      oldValue: data1[key],
      newValue: data2[key],
    };
  });
  return children
};

const getDifferenceTree = (data1, data2) => ({
  type: 'mainAncestor',
  children: createChildrenTrees(data1, data2),
});

export default getDifferenceTree;

/*
Старый гетДифферентТри
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
*/