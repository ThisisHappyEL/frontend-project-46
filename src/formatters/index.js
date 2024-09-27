import formatToStylish from "./stylish.js";

const formatter = (data, format) => {
  switch (format) {
    case ('stylish'):
      return formatToStylish(data);
    
    case ('plain'):
      return ''
    
    case ('json'):
      return JSON.stringify(data);
  }
};

export default formatter;