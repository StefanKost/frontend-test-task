import enumTypes from '../../../config/enumTypes';
import Enum from './Enum';
import EnumHierarchy from './EnumHierarchy';

const isHierarchy = (values) => values.some(item => !!item.parentId);

export default {
  name: 'Enum',
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
    }
  },
  render(createElement, { props, listeners }) {
    const { type, value, title, code, rules } = props;
    const values = enumTypes[type];

    const hierarchy = isHierarchy(values);
    const element = !hierarchy ? Enum : EnumHierarchy;

    return createElement(element, {
      props: {
        title, code, value, values, rules,
      },
      on: listeners,
    });

  }
}
