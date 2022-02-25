<template>
  <appLoader v-if="appStatus.isLoading" />
  <template v-else>
    <appHeader v-if="!appStatus.isLoading" />
    <appAlert :errors="appStatus.errors" />

    <router-view />
  </template>
</template>

<script>
import { reactive, watch } from "vue";
import { useStore } from "vuex";
import Header from "./components/Header.vue";
import Alert from "./components/Alert.vue";
import Spinner from "./components/Spinner.vue";
import { mapState } from "vuex";
import { GET_ERRORS, LOAD_CURRENT_USER, LOADING } from "./store/types";

export default {
  name: "App",
  components: { appHeader: Header, appAlert: Alert, appLoader: Spinner },
  setup() {
    const appStatus = reactive({ isLoading: false, errors: [] });
    const store = useStore();

    watch(store.state, function () {
      appStatus.errors = store.getters[GET_ERRORS];
      appStatus.isLoading = store.getters[LOADING];
    });

    store.dispatch(LOAD_CURRENT_USER);

    return { appStatus };
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
