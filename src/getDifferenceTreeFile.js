import _ from 'lodash';

const addedData = (newData, key) => ({
  type: 'added',
  key,
  value: newData[key],
});

const deletedData = (oldData, key) => ({
  type: 'deleted',
  key,
  value: oldData[key],
});

const nonChangeData = (data, key) => ({
  type: 'notRedacted',
  key,
  value: data[key],
});

const changeData = (oldData, newData, key) => ({
  type: 'redacted',
  key,
  oldValue: oldData[key],
  newValue: newData[key],
});

const createChildrenTrees = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const sortedKeys = _.sortBy(_.union(keys1, keys2));

  const ancestorData = (firstFileData, SecondFileData, key) => ({
    type: 'ancestor',
    key,
    children: createChildrenTrees(firstFileData[key], SecondFileData[key]),
  });

  const children = sortedKeys.map((key) => {
    if (!_.has(data1, key)) {
      return addedData(data2, key);
    }
    if (!_.has(data2, key)) {
      return deletedData(data1, key);
    }
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return ancestorData(data1, data2, key);
    }
    if (_.isEqual(data1[key], data2[key])) {
      return nonChangeData(data1, key);
    }
    return changeData(data1, data2, key);
  });
  return children;
};

const getDifferenceTree = (data1, data2) => ({
  type: 'mainAncestor',
  children: createChildrenTrees(data1, data2),
});

export default getDifferenceTree;
