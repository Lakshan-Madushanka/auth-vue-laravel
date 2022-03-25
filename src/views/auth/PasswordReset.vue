<template>
  <div class="alert alert-info" role="alert" v-if="status == 'notReset'">
    <span>Reset code sent to your email address</span>
  </div>

  <div class="alert alert-danger" role="alert" v-if="status == 'exceeded'">
    <span>Max attempts exceeded !</span>
  </div>

  <div class="alert alert-danger" role="alert" v-if="status == 'expired'">
    <span>Time limit exceeded !</span>
  </div>
  <form class="password-reset-wrapper" @submit.prevent="send">
    <div class="form-group">
      <label for="code">Code</label>
      <input
        type="text"
        class="form-control"
        id="code"
        aria-describedby="code"
        placeholder="Enter the code sent to your email address"
        v-model="state.code"
        @blur="v$.code.$touch()"
      />
      <VuelidateErrors :errors="v$.code.$errors" />
    </div>
    <div class="form-group">
      <label for="exampleInputEmail1">Password</label>
      <input
        type="password"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
        placeholder="Enter password"
        v-model="state.password"
        @blur="v$.password.$touch()"
      />
      <VuelidateErrors :errors="v$.password.$errors" />
    </div>
    <div class="form-group">
      <label for="exampleInputPasswordConfirm">Re enter password</label>
      <input
        type="password"
        class="form-control"
        id="exampleInputPasswordConfirm"
        placeholder="Password"
        v-model="state.password_confirmation"
        @blur="v$.password_confirmation.$touch()"
      />
      <VuelidateErrors :errors="v$.password_confirmation.$errors" />
    </div>

    <template v-if="status === 'notReset'">
      <button
        v-if="!isLoading"
        :class="{ disabled: v$.$error }"
        :disabled="v$.$error"
        type="submit"
        class="btn btn-primary"
      >
        Reset
      </button>
      <Spinner v-else />
    </template>
    <router-link
      tag="li"
      to="/forgot-password"
      active-class="text-danger"
      v-else
    >
      <button class="btn btn-primary btn-sm" href="!#">Resend link</button>
    </router-link>
  </form>
</template>

<script>
import { useRoute } from "vue-router";

import { ref, reactive, toRefs, computed, watch } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, sameAs, minLength } from "@vuelidate/validators";
import Errors from "../../components/errors/Vuelidate.vue";
import Spinner from "../../components/Spinner.vue";
import { useStore } from "vuex";
import { PASSWORD_RESET } from "../../store/types";

export default {
  components: {
    VuelidateErrors: Errors,
    Spinner: Spinner,
  },
  setup() {
    const route = useRoute();
    const store = useStore();

    const status = ref("notReset");

    const state = reactive({
      code: "",
      password: "",
      password_confirmation: "",
    });

    watch(
      () => store.state.auth.resetStatus,
      function (resetStatus) {
        if (resetStatus) {
          status.value = resetStatus;
        }
      }
    );

    const stateRefs = toRefs(state);

    function send() {
      if (!validateForm()) {
        return;
      }

      store.dispatch(PASSWORD_RESET, {
        code: state.code,
        password: state.password,
        password_confirmation: state.password_confirmation,
        email: route.params.email,
      });
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
        code: { required },
        password: { required, length: minLength(5) },
        password_confirmation: {
          required,
          sameAsPassword: sameAs(stateRefs.password),
        },
      };

      return rules;
    }
    let v$ = useVuelidate(validationRules(), state, { $lazy: true });

    return {
      v$,
      send,
      state,
      isLoading: computed(() => store.state.auth.isLoading),
      status,
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
