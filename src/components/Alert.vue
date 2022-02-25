<template>
  <template v-if="messages.length > 0">
    <div
      :class="[errorClass, 'container']"
      role="alert"
      v-for="(message, index) in messages"
      :key="index"
    >
      {{ message }}
    </div>
  </template>
</template>

<script>
import { ref, watch } from "vue";
export default {
  props: ["errors"],

  setup(props) {
    const messages = ref([]);
    const errorClass = ref("alert alert-danger");

    watch(
      () => props.errors,
      function (errors, oldErrors) {
        if (errors.messages && errors.messages.length > 0) {
          const payloadMessages = errors.messages;
          messages.value = payloadMessages;
          setErrorClass(errors.type);
          clearMessages();
        }
      }
    );

    function setErrorClass(errorType) {
      errorClass.value = "alert alert-" + errorType;
    }

    function clearMessages() {
      const mainTimeout = 1000;
      messages.value.forEach((message, index) => {
        const timeout = mainTimeout * (index + 3);

        setTimeout(() => {
          messages.value.shift();
        }, timeout * (index + 1));
      });
    }

    return { messages, errorClass };
  },
};
</script>

<style scoped></style>
