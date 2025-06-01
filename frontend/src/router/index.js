import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Register from "@/views/Register.vue";
import Login from "@/views/Login.vue";
import DonorForm2 from "@/views/DonorForm2.vue";
import Rewards from "@/views/Rewards.vue";

const routes = [
  { path: "/", name: "Login", component: Login },
  { path: "/home", name: "Home", component: Home },
  { path: "/register", name:"Register", component: Register },
  { path: "/donorform2", name: "DonorForm2", component: DonorForm2 },
  { path: "/rewards", name: "Rewards", component: Rewards }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
