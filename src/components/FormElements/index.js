import Vue from 'vue';
import InputText from './InputText.vue';
import InputNumber from './InputNumber.vue';
import Enum from './Enum/index';
import Date from './Date.vue';
import Boolean from './Boolean.vue';

const mapTypes = {
  'string': InputText,
  'int': InputNumber,
  'float': InputNumber,
  'enum': Enum,
  'date': Date,
  'boolean': Boolean,
};

export default {
  name: 'FormElement',
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
    model: {
      type: Object,
      required: true,
    },
    enumType: {
      type: String,
    }
  },
  render: function (createElement, { props }) {

    const { type, model, title, code } = props;
    const element = mapTypes[type];
    const additionalProps = {};
    if (type === 'enum') {
      additionalProps.type = props.enumType || '';
    }

    return createElement(element, {
      props: {
        title, code, value: model[code], ...additionalProps,
      },
      on: {
        'change:data': (data) => {
          Vue.set(model, code, data);
        },
      },
    });
  }
}
