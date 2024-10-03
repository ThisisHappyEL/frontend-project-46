const space = ' ';
const indentSize = 4;
const currentSpaceFirstStep = (depth) => space.repeat(indentSize * depth);
const currentSpace = (depth) => space.repeat(indentSize * depth - 2);
const currentSpaceForDeeplyChild = (depth) => space.repeat(indentSize * depth + 2);
const currentSpaceForDeeplyChildBracket = (depth) => space.repeat(indentSize * depth);

const joinStrings = (lines, depth) => [
  '{',
  ...lines,
  `${currentSpaceForDeeplyChildBracket(depth)}}`,
].join('\n');

const stringify = (data, depth) => {
  if (typeof data !== 'object' || data === null) {
    return `${data}`;
  }
  const keys = Object.keys(data);
  const lines = keys.flatMap((key) => `${currentSpaceForDeeplyChild(depth)}  ${key}: ${stringify(data[key], depth + 1)}`);
  return joinStrings(lines, depth);
};

const nodeString = (sign, depth, node) => `${currentSpace(depth)}${sign} ${node.key}: ${stringify(node.value, depth)}`;

const formatNode = (node, depth) => {
  switch (node.type) {
    case 'mainAncestor':
      return [
        '{',
        ...node.children.flatMap((child) => formatNode(child, depth)),
        '}',
      ];

    case 'ancestor':
      return [
        `${currentSpaceFirstStep(depth)}${node.key}: {`,
        ...node.children.flatMap((child) => formatNode(child, depth + 1)),
        `${currentSpaceFirstStep(depth)}}`,
      ];

    case 'notRedacted':
      return nodeString(' ', depth, node);

    case 'deleted':
      return nodeString('-', depth, node);

    case 'added':
      return nodeString('+', depth, node);

    case 'redacted':
      return [
        `${currentSpace(depth)}- ${node.key}: ${stringify(node.oldValue, depth)}`,
        `${currentSpace(depth)}+ ${node.key}: ${stringify(node.newValue, depth)}`,
      ];

    default:
      throw new Error('Not detected node type');
  }
};

const formatToStylish = (data) => formatNode(data, 1).join('\n');

export default formatToStylish;
