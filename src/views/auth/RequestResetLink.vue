<template>
  <form class="password-reset-wrapper" @submit.prevent="send()">
    <div class="form-group">
      <label for="exampleInputEmail1">Email address</label>
      <input
        type="email"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
        placeholder="Enter email"
        v-model="state.Email"
        @blur="v$.Email.$touch()"
      />
      <VuelidateErrors :errors="v$.Email.$errors" />

      <small id="emailHelp" class="form-text text-muted"
        >We'll never share your email with anyone else.</small
      >
    </div>
    <button
      v-if="!isLoading"
      :class="{ disabled: v$.$error }"
      :disabled="v$.$error"
      type="submit"
      class="btn btn-primary"
    >
      Send
    </button>
    <Spinner v-else />
  </form>
</template>

<script>
import { reactive, computed } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import Errors from "../../components/errors/Vuelidate.vue";
import Spinner from "../../components/Spinner.vue";
import { PASSWORD_FORGOT } from "../../store/types";
import { useStore } from "vuex";
//import { useRouter } from "vue-router";

export default {
  components: {
    VuelidateErrors: Errors,
    Spinner: Spinner,
  },
  setup() {
    const store = useStore();

    //const $router = useRouter();

    const state = reactive({
      Email: "",
    });

    function send() {
      if (!validateForm()) {
        return;
      }
      store.dispatch(PASSWORD_FORGOT, state.Email);
    }
    function validateForm() {
      v$.value.$validate();
      if (v$.value.$error) {
        return false;
      }
      return true;
    }
    function validationRules() {
      let rules = {
        Email: { required, email },
      };

      return rules;
    }
    let v$ = useVuelidate(validationRules(), state, { $lazy: true });

    return {
      v$,
      send,
      state,
      isLoading: computed(() => store.state.auth.isLoading),
    };
  },
};
</script>

<style scoped>
.password-reset-wrapper {
  width: 50%;
  border: 1px solid blue;
  padding: 5px;
  margin: 0 auto;
}

.disabled {
  cursor: not-allowed;
}
</style>
