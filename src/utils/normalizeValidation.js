const required = (value) => ({
  required: value, message: 'Обов\'язкове поле',
});

const pattern = (pattern) => {
  let regex;
  try {
    regex = new RegExp(pattern);
  } catch (err) {
    console.error(err.message);
    return;
  }

  return {
    validator: (rule, value, callback) => {
      if (!value || value.trim() === '') { return callback(); }
      if (!regex.test(value)) {
        return callback(new Error(`Поле не відповідає патерну: ${pattern}`));
      }
      return callback();
    },
  };
};

const email = () => ({ type: 'email', message: 'Поле не містить email адресу' });

const minlength = (length) => ({ min: length, message: `Мінімальна довжина рядка: ${length}` });
const maxlength = (length) => ({ max: length, message: `Максимальна довжина рядка: ${length}` });

const min = (min) => ({
  validator: (rule, value, callback) => {
    if (typeof value === 'undefined' || value.toString().trim() === '') { return callback(); }
    if (+value < +min) {
      return callback(new Error(`Значення повинно бути більшим за ${min.toString()}`));
    }
    return callback();
  },
});

const max = (max) => ({
  validator: (rule, value, callback) => {
    if (typeof value === 'undefined' || value.toString().trim() === '') { return callback(); }
    if (+max < +value) {
      return callback(new Error(`Значення повинно бути меншим за ${max.toString()}`));
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


export default (validation = {}) => {
  return Object.keys(validation).reduce((result, key) => {
    const value = validation[key];

    const normalizeCallback = mapParams[key];
    if (!normalizeCallback) { return result; }

    const resultValue = normalizeCallback(value);
    result.push(resultValue);
    return result;
  }, [])
};
