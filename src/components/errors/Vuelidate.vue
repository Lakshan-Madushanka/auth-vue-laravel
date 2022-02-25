<template>
  <template v-if="errors.length > 0">
    <p class="error-text" v-for="error of errors" :key="error.uid">
      {{ $filters.formatErrorMessage(error.$message, error.$property) }}
    </p>
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
