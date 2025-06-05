<template>
  <div class="register container m-auto " style="width: 50%">
    <h2 class="m-5 text-center">Register</h2>
    <form @submit.prevent="handleRegister" class="d-flex flex-column">
      <input v-model="email" placeholder="Alamat Email" type="email" class="form-label mb-4" required />
      <input type="password" v-model="password" class="form-label mb-4" placeholder="Kata Sandi" required />
      <input v-model="nik" placeholder="NIK" class="form-label mb-4" maxlength="20" required />
      <input v-model="name" placeholder="Nama Lengkap" class="form-label mb-4" required />
      <select v-model="gender" class="form-label mb-4" required>
        <option value="" disabled selected hidden>Pilih Jenis Kelamin</option>
        <option value="Male">Laki-laki</option>
        <option value="Female">Perempuan</option>
      </select>
      <select v-model="religion" class="form-label mb-4" required>
        <option value="" disabled selected hidden>Pilih Agama</option>
        <option value="Islam">Islam</option>
        <option value="Kristen Protestan">Kristen Protestan</option>
        <option value="Kristen Katolik">Kristen Katolik</option>
        <option value="Hindu">Hindu</option>
        <option value="Buddha">Buddha</option>
        <option value="Konghucu">Konghucu</option>
        <option value="Lainnya">Lainnya</option>
      </select>
      <input v-model="placeOfBirth" placeholder="Tempat Lahir" class="form-label mb-4" required />
      <input v-model="dateOfBirth" type="date" class="form-label mb-4" required />
      <input v-model="occupation" placeholder="Pekerjaan" class="form-label mb-4" required />
      <select v-model="bloodType" class="form-label mb-4" required>
        <option value="" disabled selected hidden>Pilih Golongan Darah</option>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="AB">AB</option>
        <option value="O">O</option>
        <option value="Tidak Tahu">Tidak Tahu</option>
        <option value="Diskrepansi">Diskrepansi / Tidak Cocok</option>
      </select>
      <input v-model="province" placeholder="Provinsi" class="form-label mb-4" required />
      <input v-model="cityOrRegency" placeholder="Kota/Kabupaten" class="form-label mb-4" required />
      <input v-model="district" placeholder="Kecamatan" class="form-label mb-4" required />
      <input v-model="subDistrict" placeholder="Kelurahan/Desa" class="form-label mb-4" required />
      <textarea v-model="fullAddress" placeholder="Alamat Lengkap" class="form-label mb-4" rows="3" required></textarea>
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
      email: "",
      password: "",
      nik: "",
      name: "",
      gender: "",
      religion: "",
      placeOfBirth: "",
      dateOfBirth: "",
      fullAddress: "",
      bloodType: "",
      occupation: "",
      province: "",
      cityOrRegency: "",
      district: "",
      subDistrict: "",
    };
  },
  methods: {
    async handleRegister() {
      const formData = {
        email: this.email,
        password: this.password,
        profile: {
          nik: this.nik,
          name: this.name,
          gender: this.gender,
          religion: this.religion,
          place_of_birth: this.placeOfBirth,
          date_of_birth: this.dateOfBirth,
          full_address: this.fullAddress,
          blood_type: this.bloodType,
          occupation: this.occupation,
          province: this.province,
          city_or_regency: this.cityOrRegency,
          district: this.district,
          sub_district: this.subDistrict,
        }
      };
      await RegisterPresenter(formData, this.$router);
    },
  },
};
</script>