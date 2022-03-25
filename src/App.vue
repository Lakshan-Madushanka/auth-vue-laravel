<template>
  <appLoader v-if="appStatus.isLoading" />
  <template v-else>
    <div class="container">
      <appHeader v-if="!appStatus.isLoading" />
      <appAlert
        :data="appStatus.alert"
        v-if="appStatus.alert && appStatus.alert.message"
      />
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
      <appErrorAlert :errors="appStatus.errors" />

      <router-view />
    </div>
  </template>
</template>

<script>
import { reactive, watch } from "vue";
import { useStore } from "vuex";
import Header from "./components/Header.vue";
import ErrorAlert from "./components/errors/Alert.vue";
import Spinner from "./components/Spinner.vue";
import FixedAlert from "./components/FixedAlert.vue";
//import { mapState } from "vuex";
import Alert from "./components/Alert.vue";
import { GET_ERRORS, GET_ALERT, LOADING } from "./store/types";

export default {
  name: "App",
  components: {
    appHeader: Header,
    appErrorAlert: ErrorAlert,
    appAlert: Alert,
    appLoader: Spinner,
    FixedAlert,
  },
  setup() {
    const appStatus = reactive({
      isLoading: false,
      errors: [],
      alert: { message: "", type: "" },
    });
    const authStatus = reactive({ authenticated: false, verified: false });
    const store = useStore();

    watch(
      store.state,
      function () {
        appStatus.alert = store.getters[GET_ALERT];
        appStatus.errors = store.getters[GET_ERRORS];
        appStatus.isLoading = store.getters[LOADING];
        authStatus.authenticated = store.state.auth.isAuthenticated;
        authStatus.verified = store.state.auth.emailVerified;
      },
      {
        //immediate: true,
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
