<template v-if="errors">
  <template v-if="Array.isArray(errors) || errors.length > 0">
    <p class="error-text" v-for="error of errors" :key="error.id">
      {{ error }}
    </p>
  </template>
  <template v-else>
    {{ error }}
  </template>
</template>

<script>
export default {
  props: ["errors"],
};
</script>

<style scoped>
.error-text {
  color: red;
  margin-top: 5px;
}
</style>
