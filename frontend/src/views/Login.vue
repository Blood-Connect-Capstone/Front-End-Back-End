<template>
  <div class="login container m-auto" style="width: 50%">
    <h2 class="m-5 text-center">Login</h2>
    <form @submit.prevent="handleLogin" class="d-flex flex-column">
      <input type="email" v-model="email" placeholder="Email" class="form-label mb-4" required />
      <input type="password" v-model="password" placeholder="Password" class="form-label mb-4" required />
      <p>Belum punya akun? <router-link to="/register">Register</router-link></p>
      <button type="submit" class="btn btn-dark mb-5">Login</button>
    </form>
  </div>
</template>
<script>
import { LoginPresenter } from "../presenters/AuthPresenter";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async handleLogin() {
      const formData = {
        email: this.email,
        password: this.password,
      };
      await LoginPresenter(formData, this.$router);
    },
  },
};
</script>
