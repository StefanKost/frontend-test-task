<template>
  <el-form-item :label=title :prop=code>
    <el-select :value=value :placeholder=title @change=handleChange>
      <el-option
        v-for="item in values"
        :key=item.id
        :label=item.title
        :value=item.id>
      </el-option>
    </el-select>
  </el-form-item>
</template>

<script>
  export default {
    name: "Enum",
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
        type: [Number, String],
      },
      values: {
        type: Array,
        required: true,
      }
    },
    methods: {
      handleChange(data) {
        this.$emit('change:data', data);
      }
    }
  }
</script>
