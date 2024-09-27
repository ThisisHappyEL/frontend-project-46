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
  const lines = keys.map((key) => `${currentSpaceForDeeplyChild(depth)}  ${key}: ${stringify(data[key], depth + 1)}`);
  return joinStrings(lines, depth);
}

const formatToStylish = (data) => {
  const result = [];
  const formatNode = (node, depth) => {
    switch (node.type) {
      case 'mainAncestor':
        result.push(`{`);
        node.children.forEach((child) => formatNode(child, depth));
        result.push(`}`);
        break;

      case 'ancestor':
        result.push(`${currentSpaceFirstStep(depth)}${node.key}: {`);
        node.children.forEach((child) => formatNode(child, depth + 1));
        result.push(`${currentSpaceFirstStep(depth)}}`);
        break;
        
      case 'notRedacted':
        result.push(`${currentSpace(depth)}  ${node.key}: ${stringify(node.value, depth)}`);
        break;
        
      case 'deleted':
        result.push(`${currentSpace(depth)}- ${node.key}: ${stringify(node.value, depth)}`);
        break;
        
      case 'added':
        result.push(`${currentSpace(depth)}+ ${node.key}: ${stringify(node.value, depth)}`);
        break;
        
      case 'redacted':
        result.push(`${currentSpace(depth)}- ${node.key}: ${stringify(node.oldValue, depth)}`);
        result.push(`${currentSpace(depth)}+ ${node.key}: ${stringify(node.newValue, depth)}`);
        break;
        
      default:
        throw new Error ('Not detected node type');
      }
    };

    formatNode(data, 1);

  const formattedData = result.join('\n');
  return formattedData;
};

export default formatToStylish;