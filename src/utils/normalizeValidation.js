const required = value => ({
  required: value, message: 'Обов\'язкове поле',
});

const pattern = (patternValue) => {
  let regex;
  try {
    regex = new RegExp(patternValue);
  } catch (err) {
    console.error(err.message);
    return undefined;
  }

  return {
    validator: (rule, value, callback) => {
      if (!value || value.trim() === '') { return callback(); }
      if (!regex.test(value)) {
        return callback(new Error(`Поле не відповідає патерну: ${patternValue}`));
      }
      return callback();
    },
  };
};

const email = () => ({ type: 'email', message: 'Поле не містить email адресу' });

const minlength = length => ({ min: length, message: `Мінімальна довжина рядка: ${length}` });
const maxlength = length => ({ max: length, message: `Максимальна довжина рядка: ${length}` });

const min = minValue => ({
  validator: (rule, value, callback) => {
    if (typeof value === 'undefined' || value.toString().trim() === '') { return callback(); }
    if (+value < +minValue) {
      return callback(new Error(`Значення повинно бути більшим за ${minValue.toString()}`));
    }
    return callback();
  },
});

const max = maxValue => ({
  validator: (rule, value, callback) => {
    if (typeof value === 'undefined' || value.toString().trim() === '') { return callback(); }
    if (+maxValue < +value) {
      return callback(new Error(`Значення повинно бути меншим за ${maxValue.toString()}`));
    }
    return callback();
  },
});

const mapParams = {
  required,
  pattern,
  email,
  min,
  max,
  minlength,
  maxlength,
};


export default (validation = {}) => Object.keys(validation).reduce((result, key) => {
  const value = validation[key];

  const normalizeCallback = mapParams[key];
  if (!normalizeCallback) { return result; }

  const resultValue = normalizeCallback(value);
  result.push(resultValue);
  return result;
}, []);
