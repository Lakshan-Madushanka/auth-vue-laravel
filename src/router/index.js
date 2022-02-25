import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Header from "../components/Header.vue";
import * as guards from "./guards";

const Auth = () => import("../views/auth/Auth.vue");
const Dashboard = () => import("../views/admin/Dashboard.vue");
const Error = () => import("../views/errors/Error.vue");

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      components: {
        default: Home,
        header: Header,
      },
    },

    {
      path: "/sign-up",
      component: Auth,
      name: "signUp",
      beforeEnter: guards.authGuard,
    },
    {
      path: "/sign-in",
      component: Auth,
      name: "signIn",
      beforeEnter: guards.authGuard,
    },
    {
      path: "/admin",
      component: Dashboard,
      beforeEnter: guards.adminGuard,
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: { name: "Error" },
    },
    {
      path: "/errors",
      component: Error,
      name: "Error",
    },
  ],
});

export default router;
