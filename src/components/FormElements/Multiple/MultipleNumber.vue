<template>
  <div>
    <el-form-item
      v-for="(item, index) in value"
      :label="`${title} ${index + 1}.`"
      :prop="`${code}.${index}`"
      :key="index"
      :rules="rules"
    >
      <el-input-number class="multiple-item" :precision="getPrecision" :value="item" @input="(data) => handleInput(index, data)" />
      <el-button @click.prevent="removeElement(index)">Delete</el-button>
    </el-form-item>
    <el-form-item :label="titleAction" :prop="code" :rules="getRequiredRule">
      <el-button @click="addElement">Додати {{ title }}</el-button>
    </el-form-item>
  </div>
</template>

<script>
  export default {
    name: "MultipleNumber",
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
      isFloat: {
        type: Boolean,
        required: true,
      }
    },
    computed: {
      getRequiredRule() {
        return Array.isArray(this.rules) ? this.rules.filter(rule => rule.required) : [];
      },
      titleAction() {
        return (!this.value || !this.value.length) && this.title || '';
      },
      getPrecision() {
        return this.isFloat ? 2 : 0;
      }
    },
    methods: {
      handleInput(index, data) {
        this.$emit('change:data', { index, value: data });
      },
      addElement() {
        const data = this.value;
        if (!data || !Array.isArray(data)) {
          this.$emit('change:data', [undefined]);
          return;
        }

        const index = data.length;
        this.$emit('change:data', { index, value: undefined });
      },
      removeElement(index) {
        this.$emit('delete:data', index);
      }
    }
  }
</script>

<style scoped>
  .multiple-item {
    width: 75%;
    margin-right: 10px;
  }
</style>
