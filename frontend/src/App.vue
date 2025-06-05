<!-- <script setup>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
</script> -->

<template>
  <!-- <Navbar></Navbar> -->

  <main>
    <router-view></router-view>
  </main>

  <a id="chatbot-link" href="/chatbot">
    <img style="width: 24px;" src="https://img.icons8.com/?size=100&id=118374&format=png&color=FFFFFF" alt="">
  </a>

  <!-- <Footer></Footer> -->
</template>

<style scoped>
#chatbot-link {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
  background: #DC2626;
  color: white;
  border: none;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  font-size: 24px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>