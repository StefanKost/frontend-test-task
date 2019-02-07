<template>
  <el-form-item :label=title :prop=code :rules=rules>
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
      },
      rules: {
        type: Array,
      }
    },
    methods: {
      handleInput(data) {
        this.$emit('change:data', data);
      }
    }
  }
</script>
