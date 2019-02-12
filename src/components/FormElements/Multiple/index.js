import MultipleText from './MultipleText.vue';
import MultipleNumber from './MultipleNumber.vue';
import MultipleDate from './MultipleDate.vue';
import MultipleBoolean from './MultipleBoolean.vue';

import types from '../../../config/types';

const {
  STRING,
  INT,
  FLOAT,
  DATE,
  BOOLEAN,
} = types;

const mapTypes = {
  [STRING]: MultipleText,
  [INT]: MultipleNumber,
  [FLOAT]: MultipleNumber,
  [DATE]: MultipleDate,
  [BOOLEAN]: MultipleBoolean,
};

export default {
  name: 'Multiple',
  functional: true,
  props: {
    title: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    value: {
      type: Array,
    },
    type: {
      type: String,
    },
    rules: {
      type: Array,
    },
    isFloat: {
      type: Boolean,
    },
  },
  render(createElement, { props, listeners }) {
    const {
      type, value, title, code, rules, isFloat,
    } = props;

    const element = mapTypes[type];
    if (!element) { return undefined; }

    return createElement(element, {
      props: {
        title, code, value, rules, isFloat,
      },
      on: listeners,
    });
  },
};
