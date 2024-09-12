const formatter = (data, format) => {
  const result = [];
  const space = '  ';

  const formatNode = (node, depth) => {
    const currentSpace = space.repeat(depth);

    switch (node.type) {
      case 'main ancestor':
        result.push(`${currentSpace}{`);
        node.children.forEach((child) => formatNode(child, depth + 1));
        result.push(`${currentSpace}}`);
        break;

      case 'not redacted':
        result.push(`${currentSpace}  ${node.key}: ${node.value}`);
        break;

      case 'deleted':
        result.push(`${currentSpace}- ${node.key}: ${node.value}`);
        break;

      case 'added':
        result.push(`${currentSpace}+ ${node.key}: ${node.value}`);
        break;

      case 'changed':
        result.push(`${currentSpace}- ${node.key}: ${node.oldValue}`);
        result.push(`${currentSpace}+ ${node.key}: ${node.newValue}`);
        break;

      case 'ancestor':
        result.push(`${currentSpace}${node.key}: {`);
        node.children.forEach((child) => formatNode(child, depth + 1));
        result.push(`${currentSpace}}`);
        break;

      default:
        break;
    }
  };

  formatNode(data, 1);

  const formattedData = result.join('\n');

  return formattedData;
};

export default formatter;