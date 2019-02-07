<template>
  <el-form-item :label=title :prop=code>
    <el-input :value=value @input=handleInput></el-input>
  </el-form-item>
</template>

<script>
  export default {
    name: "InputText",
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
        type: String,
      }
    },
    methods: {
      handleInput(data) {
        this.$emit('change:data', data);
      }
    }
  }
</script>
