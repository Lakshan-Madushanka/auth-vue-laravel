<template>
  <section class="page_404">
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <div class="col-sm-12 col-sm-offset-1 text-center">
            <div class="four_zero_four_bg">
              <h1 class="text-center">{{ errorDetails.errorCode }}</h1>
            </div>

            <div class="contant_box_404">
              <h3 class="h2">Something went wrong !</h3>

              <p class="error">{{ errorDetails.message }} !</p>

              <router-link to="/" class="link_404"> Go to Home </router-link>

              <br />

              <button
                type="button"
                class="btn btn-primary"
                @click="$router.back()"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { reactive, watch } from "vue";
import { useRoute } from "vue-router";
export default {
  setup() {
    let errorCode = 404;
    const errorMessages = {
      404: "The page you are looking for not available",
      403: "Ooops you can't be here ",
      429: "Too many attempts try again later",
      500: "Server Error!",
      default: "Something went wrong ",
    };

    const $route = useRoute();

    const errorDetails = reactive({
      errorCode: 404,
      message: "Something went wrong",
    });

    watch($route.query.status, function () {
      setErrorDetails($route.query.status);
    });

    function setErrorDetails(status) {
      const message = getErrorMessage(status);
      errorDetails.message = message;

      setErrorCode();
    }

    function setErrorCode() {
      const routeStatus = $route.query.status;
      errorCode = routeStatus ? routeStatus : 404;
      errorDetails.errorCode = errorCode;
    }

    function getErrorMessage(errorCode) {
      switch (errorCode) {
        case 404:
          return errorMessages[404];
        case 429:
          return errorMessages[429];
        case 403:
          return errorMessages[403];
        default:
          return errorMessages["default"];
      }
    }

    setErrorDetails();

    return {
      errorDetails: errorDetails,
    };
  },
};
</script>

<style>
.page_404 {
  padding: 40px 0;
  background: #fff;
  font-family: "Arvo", serif;
}

.page_404 img {
  width: 100%;
}

.four_zero_four_bg {
  background-image: url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif);
  height: 400px;
  background-position: center;
}

.four_zero_four_bg h1 {
  font-size: 80px;
}

.four_zero_four_bg h3 {
  font-size: 80px;
}

.link_404 {
  color: #fff !important;
  padding: 10px 20px;
  background: #39ac31;
  margin: 20px 0;
  display: inline-block;
}
.contant_box_404 {
  margin-top: -50px;
}
.error {
  color: red;
}
</style>
