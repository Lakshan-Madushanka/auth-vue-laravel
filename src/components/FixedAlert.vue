<template>
  <div class="alert alert-warning" role="alert">
    <span>{{ msg }}</span>
    <span class="float-right"><slot></slot></span>
  </div>
</template>

<script>
export default {
  props: ["msg"],

  setup() {},
};
</script>
