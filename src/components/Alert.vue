<template>
  <div :class="alert.alertClass" role="alert">
    <strong>{{ alert.message }}</strong>
    <button
      type="button"
      class="close"
      data-dismiss="alert"
      aria-label="Close"
      @click="closeAlert()"
    >
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</template>

<script>
import { reactive, watch } from "vue";
import { useStore } from "vuex";
import { CLEAR_ALERT } from "../store/types";
export default {
  props: ["data"],
  setup(props) {
    const store = useStore();

    const alert = reactive({
      alertClass: "alert alert-dismissible fade show",
      message: props.message,
    });

    function closeAlert() {
      store.commit(CLEAR_ALERT);
    }

    watch(
      () => props.data,
      function (data) {
        alert.alertClass = alert.alertClass + " " + "alert-" + data.type;
        alert.message = data.message;
      },
      {
        immediate: true,
      }
    );

    return { alert, closeAlert };
  },
};
</script>
