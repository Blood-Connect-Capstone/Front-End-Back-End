<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <router-link class="navbar-brand d-flex" to="/home">
        <img class="logo" src="/src/assets/images/logo.svg" alt="" />
        <div class="d-flex flex-column align-items-start">
          <span class="title">BloodConnect</span>
          <!-- <small class="text">Temukan donor & permintaan darah di sekitar Anda</small> -->
        </div>
      </router-link>
      <button class="navbar-toggler small-toggler" type="button" data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
            <router-link class="nav-link menu" aria-current="page" to="#">Profile</router-link>
            </li>
            <li class="nav-item">
            <router-link class="nav-link menu" to="/rewards">Rewards</router-link>
            </li>
            <li class="nav-item">
            <router-link class="nav-link menu" to="/community">Community</router-link>
            </li>
          <li class="nav-item">
            <!-- <a class="nav-link login" href="#">Logout</a> -->
            <button class="nav-link login logout-btn" type="button" @click="handleLogout">Logout</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { LogoutPresenter } from "../presenters/AuthPresenter";
import { useRouter } from "vue-router";
const router = useRouter();

function handleLogout() {
  LogoutPresenter(router);
}
</script>

<style scoped>
/* Navbar CSS - Updated */
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap");

* {
  font-family: "Inter", sans-serif;
}

.navbar {
  padding: 24px 0;
  box-shadow: 0 1px 3px 0px rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: white;
}

.navbar>.container-fluid {
  padding: 0 80px;
  z-index: 1001;
}

.logo {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.navbar-brand {
  gap: 12px;
  align-items: center;
  word-wrap: break-word;
  white-space: normal;
}

.title {
  color: #e7000b;
  font-weight: bold;
  font-size: 24px;
  line-height: 30px;
}

.text {
  color: #6a7282;
  line-height: 16px;
  font-size: 16px;
}

.small-toggler {
  padding: 2px 6px;
  font-size: 0.9rem;
  line-height: 1;
  width: 32px;
  height: 32px;
}

.small-toggler .navbar-toggler-icon {
  width: 20px;
  height: 20px;
}

.navbar-expand-lg .navbar-nav {
  gap: 48px;
  align-items: center;
}

.navbar-expand-lg .navbar-nav .nav-link {
  font-weight: 500;
}

button.nav-link.login.logout-btn {
  padding: 10px 24px;
}

.menu {
  color: black;
}
.menu:hover {
  color: #e7000b;
}

.login {
  background-color: black;
  color: white;
  border-radius: 8px;
}
.login:hover {
  color: white;
}

@media (max-width: 1200px) {
  .navbar>.container-fluid {
    padding: 0 24px;
  }
}

@media (max-width: 600px) {
  .navbar-expand-lg .navbar-nav {
    gap: 16px;
  }

  .title {
    font-size: 18px;
    line-height: 22px;
  }

  .text {
    font-size: 12px;
    line-height: 14px;
  }
}
</style>
