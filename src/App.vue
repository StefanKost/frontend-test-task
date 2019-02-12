<template>
  <div id="app">
    <RenderForm
      id="form-container"
      :meta="meta"
    />
  </div>
</template>

<script>
import RenderForm from './components/RenderForm.vue';

export default {
  name: 'App',
  data: () => ({
    meta: {
      code: 'Person',
      attributes: [
        {
          title: 'Ім\'я',
          code: 'firstName',
          validation: {
            required: true,
          },
        },
        {
          title: 'Прізвище',
          code: 'lastName',
          validation: {
            required: true,
          },
        },
        {
          title: 'Вік',
          code: 'age',
          type: 'int',
        },
        {
          title: 'Email',
          code: 'email',
          validation: {
            email: true,
          },
        },
        {
          title: 'Важливість',
          code: 'importance',
          type: 'enum',
          enumType: 'ImportanceValue',
        },
        {
          title: 'Посада',
          code: 'jobPosition',
          type: 'enum',
          enumType: 'JobPositionValue',
        },
        {
          title: 'Дата виходу на роботу',
          code: 'startJobAt',
          type: 'date',
        },
        {
          title: 'Телефон',
          code: 'phone',
          multiple: true,
          validation: {
            pattern: '^\\+38\\(\\d{3}\\) \\d{3}-\\d{2}-\\d{2}',
          },
        },
      ],
    },
  }),
  components: {
    RenderForm,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#form-container {
  width: 800px;
  margin: 0 auto;
}
</style>
