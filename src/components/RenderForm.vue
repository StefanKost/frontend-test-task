<template>
  <div>
    <h1>{{meta.code}}</h1>
    <el-form ref="form" :model="form" label-width="120px">
      <FormElement
        v-for="(metaItem, index) in meta.attributes"
        :key="index"
        :meta="metaItem"
        :model="form"
      />
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">Submit</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import FormElement from './FormElements';
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
    FormElement,
  },
  data: () => ({
    form: {},
  }),
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.info(deepClone(this.form));
          return;
        }

        console.log('error submit!!');
        return false;
      });
    }
  }
}
</script>
