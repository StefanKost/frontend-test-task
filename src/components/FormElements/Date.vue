<template>
  <el-form-item :label=title :prop=code :rules=rules>
    <el-date-picker
      :value=value
      type="date"
      :placeholder=title
      @input=handleInput>
    </el-date-picker>
  </el-form-item>
</template>

<script>
  export default {
    name: "Date",
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
        type: Date,
      },
      rules: {
        type: Array,
      }
    },
    methods: {
      handleInput(data) {
        this.$emit('change:data', data);
      }
    },
  }
</script>
