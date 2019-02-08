<template>
  <el-form-item :label="title" :prop="code" :rules="rules">
    <el-select :value="computedValue" :placeholder="title" :multiple="isMultiple" @change="handleChange">
      <el-option v-for="item in values" :key="item.id" :label="item.title" :value="item.id" />
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
        type: [Number, String, Array],
      },
      values: {
        type: Array,
        required: true,
      },
      rules: {
        type: Array,
      },
      isMultiple: {
        type: Boolean,
      }
    },
    data: () => ({
      multipleDefault: [],
    }),
    computed: {
      computedValue() {
        return this.isMultiple && !Array.isArray(this.value) ? this.multipleDefault : this.value;
      }
    },
    methods: {
      handleChange(data) {
        this.$emit('change:data', data);
      }
    }
  }
</script>
