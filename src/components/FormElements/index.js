import Vue from 'vue';
import InputText from './InputText.vue';
import InputNumber from './InputNumber.vue';
import Enum from './Enum';
import InputDate from './InputDate.vue';
import InputBoolean from './InputBoolean.vue';
import normalizeValidation from '../../utils/normalizeValidation';
import Multiple from './Multiple';

const mapTypes = {
  'string': InputText,
  'int': InputNumber,
  'float': InputNumber,
  'enum': Enum,
  'date': InputDate,
  'boolean': InputBoolean,
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
