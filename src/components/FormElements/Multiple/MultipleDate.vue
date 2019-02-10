<template>
  <div>
    <el-form-item
      v-for="(item, index) in value"
      :key="index"
      :label="`${title} ${index + 1}.`"
      :prop="`${code}.${index}`"
      :rules="rules"
    >
      <el-date-picker class="multiple-item" :value="item" @input="(data) => handleInput(index, data)" />
      <el-button @click.prevent="removeElement(index)">Delete</el-button>
    </el-form-item>
    <el-form-item :label="titleAction" :prop="code" :rules="getRequiredRule">
      <el-button @click="addElement">Додати {{ title }}</el-button>
    </el-form-item>
  </div>
</template>

<script>
  export default {
    name: "MultipleDate",
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
    computed: {
      getRequiredRule() {
        return Array.isArray(this.rules) ? this.rules.filter(rule => rule.required) : [];
      },
      titleAction() {
        return (!this.value || !this.value.length) && this.title || '';
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

<style>
  .multiple-item {
    width: 75%;
    margin-right: 10px;
  }
</style>
