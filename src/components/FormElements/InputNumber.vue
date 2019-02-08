<template>
  <el-form-item :label="title" :prop="code" :rules="rules">
    <el-input-number :value="value" :precision="getPrecision" @input="handleInput" />
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
      rules: {
        type: Array,
      },
      isFloat: {
        type: Boolean,
        required: true,
      }
    },
    computed: {
      getPrecision() {
        return this.isFloat ? 2 : 0;
      },
    },
    methods: {
      handleInput(data) {
        this.$emit('change:data', data);
      }
    }
  }
</script>
