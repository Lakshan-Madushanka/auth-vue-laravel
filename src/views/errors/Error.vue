<template>
  <section class="page_404">
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <div class="col-sm-12 col-sm-offset-1 text-center">
            <div class="four_zero_four_bg">
              <h1 class="text-center">{{ errorCode }}</h1>
            </div>

            <div class="contant_box_404">
              <h3 class="h2">Something went wrong !</h3>

              <p class="error">{{ getErrorMessage() }} !</p>

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
export default {
  data() {
    return {
      errorCode: this.$route.query.status ?? 404,
      errorMessages: {
        404: "The page you are looking for not available",
        403: "Ooops you can't be here ",
        429: "Too many attempts try again later",
        500: "Server Error!",
        default: "Something went wrong ",
      },
    };
  },
  methods: {
    getErrorMessage() {
      switch (this.errorCode) {
        case 404:
          return this.errorMessages[404];
        case 429:
          return this.errorMessages[429];
        case 403:
          return this.errorMessages[403];
        default:
          return this.errorMessages["default"];
      }
    },
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
