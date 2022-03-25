<template>
  <h2 class="mt-5">User Profile</h2>
  <ul class="list-group profile-wrapper m-auto text-left">
    <li class="list-group-item">
      Name <span class="float-right">{{ user.userName }}</span>
    </li>
    <li class="list-group-item">
      Email <span class="float-right">{{ user.email }}</span>
    </li>
  </ul>

  <div class="wrapper">
    <router-link tag="li" to="/forgot-password" active-class="text-danger">
      <button class="btn btn-primary" href="!#">Reset Password</button>
    </router-link>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { GET_AUTH_USER } from "../../store/types";
export default {
  setup() {
    const store = useStore();

    const shouldReset = ref(true);

    function changeShouldResetState() {
      shouldReset.value = !shouldReset.value;
    }
    console.log(shouldReset.value);

    function changeShouldResetStateTest() {
      console.log(shouldReset.value);
    }
    const authUser = store.getters[GET_AUTH_USER].user;
    return {
      user: authUser,
      changeShouldResetState,
      changeShouldResetStateTest,
    };
  },
};
</script>

<style scoped>
.profile-wrapper {
  width: 70%;
}
.profile-item {
  padding: 0 3rem;
}
.wrapper {
  margin-top: 2rem;
}
</style>
