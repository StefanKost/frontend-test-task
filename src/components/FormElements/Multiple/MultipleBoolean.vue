<template>
  <div>
    <el-form-item
      v-for="(item, index) in model"
      :key="index"
      :label="`${title} ${index + 1}.`"
      :prop="`${code}.${index}`"
      :rules="rules"
    >
      <el-checkbox class="multiple-item" v-model="model[index]" />
      <el-button @click.prevent="removeElement(index)">Delete</el-button>
    </el-form-item>
    <el-form-item :label="titleAction" :prop="code" :rules="getRequiredRule">
      <el-button @click="addElement">Додати {{ title }}</el-button>
    </el-form-item>
  </div>
</template>

<script>
  export default {
    name: "MultipleBoolean",
    props: {
      title: {
        type: String,
        required: true,
      },
      code: {
        type: String,
        required: true,
      },
      value: Array,
      rules: Array,
    },
    data: () => ({
      model: [],
    }),
    computed: {
      getRequiredRule() {
        return Array.isArray(this.rules) ? this.rules.filter(rule => rule.required) : [];
      },
      titleAction() {
        return (!this.value || !this.value.length) && this.title || '';
      }
    },
    methods: {
      addElement() {
        this.model.push(false);
      },
      removeElement(index) {
        this.model.splice(index, 1);
      }
    },
    watch: {
      model(data) {
        const value = (data.length) ? data : undefined;
        this.$emit('change:data', value);
      },
    },
  }
</script>

<style scoped>
  .multiple-item {
    width: 75%;
    margin-right: 10px;
  }
</style>
