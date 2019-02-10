import Vue from 'vue';
import InputText from './InputText.vue';
import InputNumber from './InputNumber.vue';
import EnumInput from './InputEnum';
import InputDate from './InputDate.vue';
import InputBoolean from './InputBoolean.vue';
import normalizeValidation from '../../utils/normalizeValidation';
import Multiple from './Multiple';
import types from '../../config/types';

const {
  STRING,
  INT,
  FLOAT,
  ENUM,
  DATE,
  BOOLEAN,
} = types;

const mapTypes = {
  [STRING]: InputText,
  [INT]: InputNumber,
  [FLOAT]: InputNumber,
  [ENUM]: EnumInput,
  [DATE]: InputDate,
  [BOOLEAN]: InputBoolean,
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

    const { type = STRING, title, code } = meta;
    let element = mapTypes[type];
    const additionalProps = {};
    if (type === ENUM) {
      additionalProps.type = meta.enumType || '';
      additionalProps.isMultiple = !!meta.multiple;
    }

    if ([INT, FLOAT].includes(type)) {
      additionalProps.isFloat = type === FLOAT;
    }

    if (meta.validation) {
      additionalProps.rules = normalizeValidation(meta.validation);
    }

    if (meta.multiple && type !== ENUM) {
      element = Multiple;
      additionalProps.type = type;
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
