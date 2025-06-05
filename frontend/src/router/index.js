import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Register from "@/views/Register.vue";
import Login from "@/views/Login.vue";
import DonorForm1 from "@/views/DonorForm1.vue";
import DonorForm2 from "@/views/DonorForm2.vue";
import Rewards from "@/views/Rewards.vue";
import DonorForm3 from "@/views/DonorForm3.vue";
import Community from "@/views/Community.vue";
import DonorReservation from "@/views/DonorReservation.vue";

const routes = [
  { path: "/", name: "Login", component: Login },
  { path: "/home", name: "Home", component: Home },
  { path: "/register", name: "Register", component: Register },
  { path: "/donorform1", name: "DonorForm1", component: DonorForm1 },
  { path: "/donorform2", name: "DonorForm2", component: DonorForm2 },
  { path: "/donorform3", name: "DonorForm3", component: DonorForm3 },
  { path: "/rewards", name: "Rewards", component: Rewards },
  { path: "/community", name: "Community", component: Community },
  {
    path: "/reservation/:type/:id",
    name: "DonorReservation",
    component: DonorReservation,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;