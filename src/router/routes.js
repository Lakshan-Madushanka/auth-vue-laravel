import Auth from "../views/Auth.vue";

export const routes = [
  // { path: "/", redirect: { name: "auth" } },
  { path: "/", name: "auth", component: Auth },
];
