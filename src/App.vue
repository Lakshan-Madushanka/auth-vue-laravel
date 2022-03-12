<template>
  <appLoader v-if="appStatus.isLoading" />
  <template v-else>
    <div class="container">
      <appHeader v-if="!appStatus.isLoading" />
      <FixedAlert
        v-if="authStatus.authenticated && !authStatus.verified"
        msg="Please verify your email to finish authentication"
      >
        <button
          type="button"
          class="btn btn-primary btn-sm"
          @click="$router.push({ name: 'resentVerficationNotice' })"
        >
          Info
        </button>
      </FixedAlert>
      <appAlert :errors="appStatus.errors" />

      <router-view />
    </div>
  </template>
</template>

<script>
import { reactive, watch } from "vue";
import { useStore } from "vuex";
import Header from "./components/Header.vue";
import Alert from "./components/Alert.vue";
import Spinner from "./components/Spinner.vue";
import FixedAlert from "./components/FixedAlert.vue";
//import { mapState } from "vuex";
import { GET_ERRORS, LOADING } from "./store/types";

export default {
  name: "App",
  components: {
    appHeader: Header,
    appAlert: Alert,
    appLoader: Spinner,
    FixedAlert,
  },
  setup() {
    const appStatus = reactive({ isLoading: false, errors: [] });
    const authStatus = reactive({ authenticated: false, verified: false });
    const store = useStore();

    watch(
      store.state,
      function () {
        console.log("eaai");
        appStatus.errors = store.getters[GET_ERRORS];
        appStatus.isLoading = store.getters[LOADING];
        authStatus.authenticated = store.state.auth.isAuthenticated;
        authStatus.verified = store.state.auth.emailVerified;
      },
      {
        immediate: true,
      }
    );

    // store.dispatch(LOAD_CURRENT_USER);

    return { appStatus, authStatus };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

a:hover {
  text-decoration: none;
}
</style>
