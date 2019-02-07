import Vue from 'vue';
import InputText from './InputText.vue';
import InputNumber from './InputNumber.vue';
import Enum from './Enum/index';
import Date from './Date.vue';
import Boolean from './Boolean.vue';
import normalizeValidation from '../../utils/normalizeValidation';
import Multiple from './Multiple/index';

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
    meta: {
      type: Object,
      required: true,
    },
    model: {
      type: Object,
      required: true,
    },
  },
  render: function (createElement, { props: { meta, model } }) {

    const { type = 'string', title, code } = meta;
    const element = mapTypes[type];
    const additionalProps = {};
    if (type === 'enum') {
      additionalProps.type = meta.enumType || '';
      additionalProps.isMultiple = !!meta.multiple;
    }

    if (['int', 'float'].includes(type)) {
      additionalProps.isFloat = type === 'float';
    }

    if (meta.validation) {
      additionalProps.rules = normalizeValidation(meta.validation);
    }

    if (meta.multiple && type !== 'enum') {
      return createElement(Multiple, {
        props: {
          title, code, value: model[code], ...additionalProps, type,
        },
        on: {
          'change:data': (data) => {
            if (Array.isArray(data)) {
              Vue.set(model, code, data);
              return;
            }
            const { index, value } = data;
            Vue.set(model[code], index, value);
          },
          'delete:data': (index) => {
            model[code].splice(index, 1);
            if (!model[code].length) {
              Vue.set(model, code, undefined);
            }
          },
        },
      });
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
