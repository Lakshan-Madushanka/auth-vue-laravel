<template>
  <div class="container">
    <div class="panel panel-default">
      <div class="card">
        <div class="card-header text-primary">Verify Email</div>
        <div class="card-body">
          <h5 class="card-title">
            Please verify email to finished the registration process
          </h5>
          <p class="card-text text-info">
            {{
              state.isSent
                ? "Email verification link sent to your email address"
                : "Click below button to re-send verification email"
            }}
          </p>
          <Spinner v-if="state.isLoading" />
          <template v-else>
            <button class="btn btn-primary m-2" @click="verifyEmail">
              Re-Send
            </button>
            <button class="btn btn-primary" @click="refresh">Refresh</button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Spinner from "../../components/Spinner.vue";
import { VERIFY_EMAIL } from "../../store/types";
import { reactive, watch } from "vue";
import { useStore } from "vuex";

export default {
  components: {
    Spinner,
  },
  setup() {
    const state = reactive({
      isSent: false,
      isLoading: false,
      isVerified: false,
    });

    const store = useStore();

    watch(store.state.auth, function (authState) {
      state.isLoading = authState.isLoading;
      state.isSent = true;
      state.isVerified = authState.verified;
    });

    function verifyEmail() {
      store.dispatch(VERIFY_EMAIL);
    }

    function refresh() {
      window.location.reload();
    }

    return {
      state,
      verifyEmail,
      refresh,
    };
  },
};
</script>
