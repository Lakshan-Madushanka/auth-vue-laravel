<template>
  <div class="auth-container">
    <div class="screen">
      <div class="screen__content">
        <form class="login" @submit.prevent="submit()">
          <div class="login__field" v-if="$route.name === 'signUp'">
            <i class="login__icon fas fa-user"></i>
            <input
              v-model="name"
              @blur="v$.name.$touch()"
              type="text"
              name="name"
              class="login__input"
              placeholder="User name"
            />
            <VuelidateErrors :errors="v$.name.$errors" />
          </div>
          <div class="login__field">
            <i class="login__icon fas fa-user"></i>
            <input
              v-model="email"
              @blur="v$.email.$touch()"
              type="text"
              name="email"
              class="login__input"
              placeholder="User Email"
            />
            <VuelidateErrors :errors="v$.email.$errors" />
          </div>
          <div class="login__field">
            <i class="login__icon fas fa-lock"></i>
            <input
              type="password"
              class="login__input"
              placeholder="Password"
              v-model="password"
              @blur="v$.password.$touch()"
            />
            <VuelidateErrors :errors="v$.password.$errors" />
          </div>

          <div class="login__field" v-if="$route.name === 'signUp'">
            <i class="login__icon fas fa-lock"></i>
            <input
              type="password"
              class="login__input"
              placeholder="Confirm Password"
              v-model="confirmPassword"
              @blur="v$.confirmPassword.$touch()"
            />
            <template v-if="$route.name === 'signUp'">
              <VuelidateErrors :errors="v$.confirmPassword.$errors" />
            </template>
          </div>

          <router-link
            tag="li"
            to="/forgot-password"
            active-class="text-danger"
            v-else
          >
            <button
              class="btn btn-primary btn-sm"
              href="!#"
              v-if="$route.name === 'signIn'"
            >
              Forgot password
            </button>
          </router-link>

          <button
            v-if="!isLoading"
            class="button login__submit"
            :class="{ disabled: v$.$error }"
            :disabled="v$.$error"
          >
            <span class="button__text">{{
              $route.name === "signIn" ? "Sign In Now" : "Sign Up Now"
            }}</span>
            <i class="button__icon fas fa-chevron-right"></i>
          </button>
          <Spinner v-else />
        </form>
        <!-- <div class="social-login">
          <h3>log in via</h3>
          <div class="social-icons">
            <a href="#" class="social-login__icon fab fa-instagram"></a>
            <a href="#" class="social-login__icon fab fa-facebook"></a>
            <a href="#" class="social-login__icon fab fa-twitter"></a>
          </div>
        </div> -->
      </div>
      <div class="screen__background">
        <span
          class="screen__background__shape screen__background__shape4"
        ></span>
        <span
          class="screen__background__shape screen__background__shape3"
        ></span>
        <span
          class="screen__background__shape screen__background__shape2"
        ></span>
        <span
          class="screen__background__shape screen__background__shape1"
        ></span>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed, toRefs, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import useVuelidate from "@vuelidate/core";

import { required, email, minLength, sameAs } from "@vuelidate/validators";
import Errors from "../../components/errors/Vuelidate.vue";
import Spinner from "../../components/Spinner.vue";
import { LOGIN, SIGN_UP } from "../../store/types";

export default {
  components: {
    VuelidateErrors: Errors,
    Spinner: Spinner,
  },
  setup() {
    const store = useStore();
    const $route = useRoute();

    const user = reactive({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      authState: store.state.auth,
    });

    const userRefs = toRefs(user);

    function submit() {
      if (!validateForm()) {
        return;
      }
      if ($route.name == "signUp") {
        let userPayload = {
          name: user.name,
          email: user.email,
          password: user.password,
          password_confirmation: user.confirmPassword,
        };

        store.dispatch(SIGN_UP, userPayload);
      } else {
        store.dispatch(LOGIN, user);
      }
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
        email: { required, email },
        password: {
          required,
          minValue: minLength(5),
        },
      };
      if ($route.name === "signUp") {
        rules["confirmPassword"] = {
          required,
          sameAsPassword: sameAs(userRefs.password),
        };
        rules["name"] = { required };
      }
      return rules;
    }

    let v$ = useVuelidate(validationRules(), user, { $lazy: true });

    watch(
      () => $route.name,
      function () {
        v$ = useVuelidate(validationRules(), user, { $lazy: true });
      }
    );

    return {
      v$,
      name: userRefs.name,
      email: userRefs.email,
      password: userRefs.password,
      confirmPassword: userRefs.confirmPassword,
      authState: store.state.auth,
      isLoading: computed(() => store.state.auth.isLoading),
      submit,
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Raleway:400,700");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: Raleway, sans-serif;
}

body {
  background: linear-gradient(90deg, #c7c5f4, #776bcc);
}

.auth-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.screen {
  background: linear-gradient(90deg, #5d54a4, #7c78b8);
  position: relative;
  width: 360px;
  box-shadow: 0px 0px 24px #5c5696;
}

.screen__content {
  z-index: 1;
  position: relative;
  height: 100%;
}

.screen__background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  -webkit-clip-path: inset(0 0 0 0);
  clip-path: inset(0 0 0 0);
}

.screen__background__shape {
  transform: rotate(45deg);
  position: absolute;
}

.screen__background__shape1 {
  height: 520px;
  width: 520px;
  background: #fff;
  top: -50px;
  right: 120px;
  border-radius: 0 72px 0 0;
}

.screen__background__shape2 {
  height: 220px;
  width: 220px;
  background: #6c63ac;
  top: -172px;
  right: 0;
  border-radius: 32px;
}

.screen__background__shape3 {
  height: 540px;
  width: 190px;
  background: linear-gradient(270deg, #5d54a4, #6a679e);
  top: -24px;
  right: 0;
  border-radius: 32px;
}

.screen__background__shape4 {
  height: 400px;
  width: 200px;
  background: #7e7bb9;
  top: 420px;
  right: 50px;
  border-radius: 60px;
}

.login {
  width: 320px;
  padding: 30px;
  padding-top: 156px;
}

.login__field {
  padding: 20px 0px;
  position: relative;
}

.login__icon {
  position: absolute;
  top: 30px;
  color: #7875b5;
}

.login__input {
  border: none;
  border-bottom: 2px solid #d1d1d4;
  background: none;
  padding: 10px;
  padding-left: 24px;
  font-weight: 700;
  width: 75%;
  transition: 0.2s;
}

.login__input:active,
.login__input:focus,
.login__input:hover {
  outline: none;
  border-bottom-color: #6a679e;
}

.login__submit {
  background: #fff;
  font-size: 14px;
  margin-top: 30px;
  padding: 16px 20px;
  border-radius: 26px;
  border: 1px solid #d4d3e8;
  text-transform: uppercase;
  font-weight: 700;
  display: flex;
  align-items: center;
  width: 100%;
  color: #4c489d;
  box-shadow: 0px 2px 2px #5c5696;
  cursor: pointer;
  transition: 0.2s;
}

.login__submit:active,
.login__submit:focus,
.login__submit:hover {
  border-color: #6a679e;
  outline: none;
}

.button__icon {
  font-size: 24px;
  margin-left: auto;
  color: #7875b5;
}

.social-login {
  position: absolute;
  height: 140px;
  width: 160px;
  text-align: center;
  bottom: 0px;
  right: 0px;
  color: #fff;
}

.social-icons {
  display: flex;
  align-items: center;
  justify-content: center;
}

.social-login__icon {
  padding: 20px 10px;
  color: #fff;
  text-decoration: none;
  text-shadow: 0px 0px 8px #7875b5;
}

.social-login__icon:hover {
  transform: scale(1.5);
}

.disabled {
  cursor: not-allowed;
}
</style>
