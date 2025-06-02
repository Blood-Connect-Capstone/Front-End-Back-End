import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Register from "@/views/Register.vue";
import Login from "@/views/Login.vue";

const routes = [
  { path: "/", name: "Login", component: Login },
  { path: "/home", name: "Home", component: Home },
  { path: "/register", name:"Register", component: Register },
  { path: "/donorform1", name: "DonorForm1", component: () => import("@/views/DonorForm1.vue") },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
