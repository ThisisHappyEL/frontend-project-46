const getPath = (nodeNames) => nodeNames.flat().join('.');

const getFormattedValue = (value) => {
  switch (typeof value) {
    case 'object': {
      return value ? '[complex value]' : 'null';
    }
    case 'string': {
      return `'${value}'`;
    }
    default: {
      return `${value}`;
    }
  }
};

const formatToPlain = (data) => {
  const formatNode = (node, pathToFile) => node.map((child) => {
    const actualPath = getPath([pathToFile, child.key]);
    switch (child.type) {
      case 'ancestor':
        return formatNode(child.children, actualPath);

      case 'notRedacted':
        return null;
      
      case 'deleted':
        return `Property '${actualPath}' was removed`;
      
      case 'added':
        return `Property '${actualPath}' was added with value: ${getFormattedValue(child.value)}`;
      
      case 'redacted':
        return `Property '${actualPath}' was updated. From ${getFormattedValue(child.oldValue)} to ${getFormattedValue(child.newValue)}`;
      
      default:
        throw new Error ('Not detected node type');
    }
  })

  const dontFormatData = formatNode(data.children, []);
  return dontFormatData.flat(Infinity).filter((arrElement) => arrElement).join('\n')
};

export default formatToPlain;

/*
const formatToPlain = (data) => {
  const result = [];
  const formatNode = (node, pathToFile) => {
    if (typeof node !== 'array') {
      result.push(`Property '${currentPath}' was added with value: [complex value]`)
    }
    node.forEach((child) => {
      const currentPath = getPath([pathToFile, child.key])
      switch (child.type) {
        case 'ancestor':
          formatNode(child.children, currentPath);
          break;
        
        case 'deleted':
          result.push(`Property '${currentPath}' was removed`);
          break;
          
        case 'added':
          result.push(`Property '${currentPath}' was added witch value: ${child.value}`);
          break;
          
        case 'redacted':
          result.push(`Property '${currentPath}' was updated. From ${child.oldValue} to ${child.newValue}`);
          break;
        
        default: {
          throw new Error ('Not detected node type')
        }
      }
    })
  }

  formatNode(data, [])
};
*/