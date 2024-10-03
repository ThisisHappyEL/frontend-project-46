import formatToStylish from './stylish.js';
import formatToPlain from './plain.js';

const formatter = (data, format) => {
  switch (format) {
    case ('stylish'):
      return formatToStylish(data);

    case ('plain'):
      return formatToPlain(data);

    case ('json'):
      return JSON.stringify(data);
    default:
      throw new Error('Unknown format data');
  }
};
//
export default formatter;
