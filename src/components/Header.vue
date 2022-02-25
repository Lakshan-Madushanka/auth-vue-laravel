<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link to="/" active-class="text-danger">
      <a class="nav-link" href="#">Home</a>
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ml-auto">
        <template v-if="!getAuthUser.isAuthenticated">
          <router-link to="/sign-in" tag="li" active-class="text-danger">
            <a class="nav-link" href="!#">Login</a>
          </router-link>
          <router-link tag="li" to="/sign-up" active-class="text-danger">
            <a class="nav-link" href="!#">Sign Up</a>
          </router-link>
        </template>
        <template v-else>
          <router-link tag="li" to="/admin" active-class="text-danger">
            <a class="nav-link" href="!#">Admin</a>
          </router-link>
          <a>
            <a class="nav-link">{{ getAuthUser.user.email }}</a>
          </a>
          <a class="nav-item">
            <a class="nav-link" @click="logOut">Log out</a>
          </a>
        </template>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  margin-bottom: 35px;
}
.nav-item {
  cursor: pointer;
}
.nav-link {
  color: inherit !important;
}
</style>

<script>
import { mapGetters, mapActions } from "vuex";
import { GET_AUTH_USER, LOG_OUT } from "../store/types";
export default {
  computed: {
    ...mapGetters({
      getAuthUser: GET_AUTH_USER,
    }),
  },
  methods: {
    ...mapActions({
      logOut: LOG_OUT,
    }),
  },
};
</script>
