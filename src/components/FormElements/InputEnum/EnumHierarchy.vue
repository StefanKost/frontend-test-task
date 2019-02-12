<template>
  <el-form-item
    :label="title"
    :prop="code"
    :rules="rules"
  >
    <el-cascader
      filterable
      :placeholder="title"
      :options="options"
      :value="value"
      @change="handleChange"
    />
  </el-form-item>
</template>

<script>
const normalizeOptions = (parentId = undefined) => (result, item, index, array) => {
  const { id, title } = item;
  if (item.parentId !== parentId) { return result; }

  const children = array.reduce(normalizeOptions(id), []);

  const resultValue = {
    value: id,
    label: title,
  };

  if (children.length) {
    resultValue.children = children;
  }

  result.push(resultValue);

  return result;
};

export default {
  name: 'EnumHierarchy',
  props: {
    title: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    values: {
      type: Array,
      required: true,
    },
    rules: {
      type: Array,
      default: () => ([]),
    },
  },
  data: () => ({
    value: [],
  }),
  computed: {
    options: {
      get() {
        return this.values.reduce(normalizeOptions(), []);
      },
    },
  },
  methods: {
    handleChange(data) {
      const result = Array.isArray(data) && data.length ? data[data.length - 1] : null;
      this.$emit('change:data', result);
    },
  },
};
</script>
