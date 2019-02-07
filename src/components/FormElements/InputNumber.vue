<template>
  <el-form-item :label=title :prop=code>
    <el-input-number :value=value @input=handleInput></el-input-number>
  </el-form-item>
</template>

<script>
  export default {
    name: "InputNumber",
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
        type: Number,
      },
    },
    methods: {
      handleInput(data) {
        this.$emit('change:data', data);
      }
    }
  }
</script>
