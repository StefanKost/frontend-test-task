<template>
  <div>
    <el-form-item
      v-for="(item, index) in model"
      :label="`${title} ${index + 1}.`"
      :prop="`${code}.${index}`"
      :key="index"
      :rules="rules"
    >
      <el-input-number
        class="multiple-item"
        :precision="getPrecision"
        v-model="model[index]"
      />
      <el-button @click.prevent="removeElement(index)">
        Delete
      </el-button>
    </el-form-item>
    <el-form-item
      :label="titleAction"
      :prop="code"
      :rules="getRequiredRule"
    >
      <el-button @click="addElement">
        Додати {{ title }}
      </el-button>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: 'MultipleNumber',
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
      type: Array,
      default: () => ([]),
    },
    rules: {
      type: Array,
      default: () => ([]),
    },
    isFloat: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    model: [],
  }),
  computed: {
    getRequiredRule() {
      return this.rules.filter(rule => rule.required);
    },
    titleAction() {
      return !this.value.length && this.title ? this.title : '';
    },
    getPrecision() {
      return this.isFloat ? 2 : 0;
    },
  },
  methods: {
    addElement() {
      this.model.push(undefined);
    },
    removeElement(index) {
      this.model.splice(index, 1);
    },
  },
  watch: {
    model(data) {
      const value = (data.length) ? data : undefined;
      this.$emit('change:data', value);
    },
  },
};
</script>

<style scoped>
  .multiple-item {
    width: 75%;
    margin-right: 10px;
  }
</style>
