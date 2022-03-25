import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Header from "../components/Header.vue";
import * as guards from "./guards";

const Auth = () => import("../views/auth/Auth.vue");
const Dashboard = () => import("../views/admin/Dashboard.vue");
const Error = () => import("../views/errors/Error.vue");
const EmailVerification = () => import("../views/auth/EmailVerification.vue");
const Profile = () => import("../views/user/Profile.vue");
const UserHome = () => import("../views/user/Home.vue");
const PasswordResetLink = () => import("../views/auth/RequestResetLink.vue");
const PasswordReset = () => import("../views/auth/PasswordReset.vue");

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
      beforeEnter: guards.guestGuard,
    },
    {
      path: "/sign-in",
      component: Auth,
      name: "signIn",
      beforeEnter: guards.guestGuard,
    },
    {
      path: "/resend/email-verification",
      component: EmailVerification,
      name: "resentVerficationNotice",
      beforeEnter: guards.verifiedGuard,
    },
    {
      path: "/forgot-password",
      component: PasswordResetLink,
      name: "passwordForgot",
    },
    {
      path: "/:email/reset-password/",
      component: PasswordReset,
      name: "passwordReset",
      beforeEnter: guards.passwordResetGuard,
    },
    {
      path: "/admin",
      component: Dashboard,
      beforeEnter: guards.adminGuard,
    },
    {
      path: "/user",
      component: UserHome,
      children: [
        {
          path: "profile",
          component: Profile,
          name: "userProfile",
        },
      ],
      beforeEnter: guards.authGuard,
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
