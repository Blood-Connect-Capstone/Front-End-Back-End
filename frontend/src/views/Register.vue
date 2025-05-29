<template>
  <div class="register container m-auto " style="width: 50%">
    <h2 class="m-5 text-center">Register</h2>
    <form @submit.prevent="handleRegister" class="d-flex flex-column">
      <input v-model="name" placeholder="Name" class="form-label mb-4" required />
      <input v-model="email" placeholder="Email" type="email" class="form-label mb-4" required />
      <input type="password" v-model="password" class="form-label mb-4" placeholder="Password" required />
      <select v-model="gender" class="form-label mb-4">
        <option value="" disabled selected hidden>Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <select v-model="bloodType" class="form-label mb-4">
        <option value="" disabled selected hidden>Blood Type</option>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="AB">AB</option>
        <option value="O">O</option>
      </select>
      <select v-model="rhesus" class="form-label mb-4">
        <option value="" disabled selected hidden>Rhesus</option>
        <option value="+">+</option>
        <option value="-">-</option>
      </select>
      <p>Sudah punya akun? <router-link to="/">Login</router-link></p>
      <button type="submit" class="btn btn-dark mb-5">Daftar</button>
    </form>
  </div>
</template>

<script>
import { RegisterPresenter } from "../presenters/AuthPresenter";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      gender: "",
      bloodType: "",
      rhesus: "",
    };
  },
  methods: {
    async handleRegister() {
      const formData = {
        name: this.name,
        email: this.email,
        password: this.password,
        gender: this.gender,
        bloodType: this.bloodType,
        rhesus: this.rhesus,
      };
      await RegisterPresenter(formData, this.$router);
    },
  },
};
</script>
