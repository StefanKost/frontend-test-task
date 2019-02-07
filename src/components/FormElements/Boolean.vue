<template>
  <el-form-item :label=title :prop=code>
    <el-checkbox :value=value @input=handleInput></el-checkbox>
  </el-form-item>
</template>

<script>
  export default {
    name: "Boolean",
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
        type: Boolean,
      },
    },
    methods: {
      handleInput(data) {
        this.$emit('change:data', data);
      }
    }
  }
</script>
