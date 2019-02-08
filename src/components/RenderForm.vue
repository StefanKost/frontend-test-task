<template>
  <div>
    <h1>{{meta.code}}</h1>
    <el-form ref="form" :model="form" label-width="120px">
      <template v-for="(metaItem, index) in meta.attributes">
        <FormElements :key="index" :meta="metaItem" :model="form" />
      </template>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">Submit</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import FormElements from './FormElements';
import deepClone from '../utils/deepClone';
export default {
  name: "RenderForm",
  props: {
    meta: {
      type: Object,
      required: true,
    },
  },
  components: {
    FormElements,
  },
  data: () => ({
    form: {},
  }),
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.info(deepClone(this.form));
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}
</script>
