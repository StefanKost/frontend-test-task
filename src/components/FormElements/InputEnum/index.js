import enumTypes from '../../../config/enumTypes';
import Enum from './Enum';
import EnumHierarchy from './EnumHierarchy';

const isHierarchy = (values) => values.some(item => !!item.parentId);

export default {
  name: 'InputEnum',
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
    type: {
      type: String,
      default: 'string',
    },
    value: {
      type: [Array, String, Number]
    },
    rules: {
      type: Array,
    },
    isMultiple: {
      type: Boolean,
    }
  },
  render(createElement, { props, listeners }) {
    const { type, value, title, code, rules, isMultiple } = props;
    const values = enumTypes[type];

    const hierarchy = isHierarchy(values);
    const element = !hierarchy ? Enum : EnumHierarchy;

    return createElement(element, {
      props: {
        title, code, value, values, rules, isMultiple,
      },
      on: listeners,
    });

  }
}
