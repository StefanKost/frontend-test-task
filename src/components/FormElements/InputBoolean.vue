<template>
  <el-form-item
    :label="title"
    :prop="code"
    :rules="rules"
  >
    <el-checkbox
      :value="value"
      @input="handleInput"
    />
  </el-form-item>
</template>

<script>
export default {
  name: 'InputBoolean',
  props: {
    title: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    value: Boolean,
    rules: {
      type: Array,
      default: () => ([]),
    },
  },
  methods: {
    handleInput(data) {
      this.$emit('change:data', data);
    },
  },
};
</script>
