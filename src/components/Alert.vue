<template>
  <template v-if="getErrorMessages().length > 0">
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
export default {
  props: ["errors"],

  data() {
    return {
      messages: [],
      errorClass: "alert alert-",
    };
  },
  methods: {
    getErrorMessages() {
      const errors = this.errors;

      if (errors.messages && errors.messages.length > 0) {
        const payloadMessages = errors.messages;
        this.messages = payloadMessages;
        this.setErrorClass(errors.type);
        this.clearMessages();

        return payloadMessages;
      }
      return [];
    },

    setErrorClass(errorType) {
      this.errorClass = "alert alert-" + errorType;
    },

    clearMessages() {
      const mainTimeout = 1000;
      this.messages.forEach((message, index) => {
        const timeout = mainTimeout * (index + 3);

        setTimeout(() => {
          this.messages.shift();
        }, timeout * (index + 1));
      });
    },
  },
};
</script>

<style scoped></style>
