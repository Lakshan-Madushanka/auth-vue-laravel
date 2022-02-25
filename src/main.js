import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import * as filters from "./filters/common.js";
import VueAxios from "vue-axios";
import axios from "./http/axios";
import { store } from "./store/index.js";

const app = createApp(App);

app.use(VueAxios, axios);

app.use(router);

app.use(store);

app.config.devtools = true;

app.config.globalProperties.$filters = filters;

app.mount("#app");
