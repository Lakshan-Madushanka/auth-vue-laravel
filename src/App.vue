<template>
  <appLoader v-if="isLoading" />
  <template v-else>
    <appHeader v-if="!isLoading" />
    <appAlert :errors="errors" />

    <router-view />
  </template>
</template>

<script>
import Header from "./components/Header.vue";
import Alert from "./components/Alert.vue";
import Spinner from "./components/Spinner.vue";
import { mapState } from "vuex";
import { LOAD_CURRENT_USER } from "./store/types";

export default {
  name: "App",
  components: { appHeader: Header, appAlert: Alert, appLoader: Spinner },

  computed: mapState({
    errors: "errors",
    isLoading: (state) => state.loading,
  }),

  async beforeCreate() {
    await this.$store.dispatch(LOAD_CURRENT_USER);
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
