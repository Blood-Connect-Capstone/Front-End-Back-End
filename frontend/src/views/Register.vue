<template>
  <div class="register-wrapper">
    <div class="register-container">
      <div class="register-header">
        <div class="navbar-brand">
          <img class="logo" src="/src/assets/images/logo.svg" alt="Logo" />
          <span class="title">BloodConnect</span>
        </div>
        <h2>Buat Akun</h2>
        <p>Bergabunglah dengan kami hari ini</p>
      </div>

      <form @submit.prevent="handleRegister" class="register-form">
        <div class="form-section">
          <h3>Informasi Akun</h3>
          <div class="form-group">
            <label for="email">Alamat Email</label>
            <input id="email" v-model="email" placeholder="Masukkan email Anda" type="email" class="form-input"
              required />
          </div>

          <div class="form-group">
            <label for="password">Kata Sandi</label>
            <input id="password" type="password" v-model="password" class="form-input"
              placeholder="Buat kata sandi yang aman" required />
          </div>
        </div>

        <div class="form-section">
          <h3>Informasi Pribadi</h3>
          <div class="form-row">
            <div class="form-group">
              <label for="nik">NIK</label>
              <input id="nik" v-model="nik" placeholder="Nomor Induk Kependudukan" class="form-input" maxlength="20"
                required />
            </div>

            <div class="form-group">
              <label for="name">Nama Lengkap</label>
              <input id="name" v-model="name" placeholder="Masukkan nama lengkap" class="form-input" required />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="gender">Jenis Kelamin</label>
              <select id="gender" v-model="gender" class="form-select" required>
                <option value="" disabled selected hidden>Pilih Jenis Kelamin</option>
                <option value="Male">Laki-laki</option>
                <option value="Female">Perempuan</option>
              </select>
            </div>

            <div class="form-group">
              <label for="religion">Agama</label>
              <select id="religion" v-model="religion" class="form-select" required>
                <option value="" disabled selected hidden>Pilih Agama</option>
                <option value="Islam">Islam</option>
                <option value="Kristen Protestan">Kristen Protestan</option>
                <option value="Kristen Katolik">Kristen Katolik</option>
                <option value="Hindu">Hindu</option>
                <option value="Buddha">Buddha</option>
                <option value="Konghucu">Konghucu</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="placeOfBirth">Tempat Lahir</label>
              <input id="placeOfBirth" v-model="placeOfBirth" placeholder="Kota/Tempat lahir" class="form-input"
                required />
            </div>

            <div class="form-group">
              <label for="dateOfBirth">Tanggal Lahir</label>
              <input id="dateOfBirth" v-model="dateOfBirth" type="date" class="form-input" required />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="occupation">Pekerjaan</label>
              <input id="occupation" v-model="occupation" placeholder="Pekerjaan saat ini" class="form-input"
                required />
            </div>
            <div class="form-group">
              <label for="bloodType">Golongan Darah</label>
              <select id="bloodType" v-model="bloodType" class="form-select" required>
                <option value="" disabled selected hidden>Pilih Golongan Darah</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="AB">AB</option>
                <option value="O">O</option>
                <option value="Tidak Tahu">Tidak Tahu</option>
                <option value="Diskrepansi">Diskrepansi / Tidak Cocok</option>
              </select>
            </div>
          </div>
        </div>

        <div class="form-section">
          <h3>Detail Lokasi</h3>
          <div class="form-row">
            <div class="form-group">
              <label for="province">Provinsi</label>
              <input id="province" v-model="province" placeholder="Provinsi" class="form-input" required />
            </div>

            <div class="form-group">
              <label for="cityOrRegency">Kota/Kabupaten</label>
              <input id="cityOrRegency" v-model="cityOrRegency" placeholder="Kota atau Kabupaten" class="form-input"
                required />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="district">Kecamatan</label>
              <input id="district" v-model="district" placeholder="Kecamatan" class="form-input" required />
            </div>

            <div class="form-group">
              <label for="subDistrict">Kelurahan/Desa</label>
              <input id="subDistrict" v-model="subDistrict" placeholder="Kelurahan atau Desa" class="form-input"
                required />
            </div>
          </div>

          <div class="form-group">
            <label for="fullAddress">Alamat Lengkap</label>
            <textarea id="fullAddress" v-model="fullAddress" placeholder="Masukkan alamat lengkap Anda"
              class="form-textarea" rows="3" required></textarea>
          </div>
        </div>

        <div class="form-footer">
          <button type="submit" class="btn-register">
            Buat Akun
          </button>
          <p class="login-link">
            Sudah punya akun?
            <router-link to="/" class="link">Masuk</router-link>
          </p>
        </div>
      </form>
    </div>
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

<style scoped>
.register-wrapper {
  min-height: 100vh;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
}

.register-container {
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
  padding: 3rem;
  width: 100%;
  max-width: 800px;
  border: 1px solid #e2e8f0;
}

.register-header {
  text-align: center;
  margin-bottom: 3rem;
}

.navbar-brand {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.logo {
  width: 50px;
  height: 50px;
}

.title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #DC2626;
}

.register-header h2 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.register-header p {
  color: #718096;
  font-size: 1.1rem;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.form-section {
  background: #f8fafc;
  padding: 2rem;
  border-radius: 15px;
  border: 1px solid #e2e8f0;
}

.form-section h3 {
  font-size: 1.4rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e2e8f0;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.form-group:last-child {
  margin-bottom: 0;
}

.form-group label {
  font-weight: 600;
  color: #4a5568;
  font-size: 0.95rem;
}

.form-input,
.form-select,
.form-textarea {
  padding: 0.8rem;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: #DC2626;
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

.form-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.btn-register {
  background: #DC2626;
  color: white;
  border: none;
  padding: 1rem 3rem;
  border-radius: 12px;
  font-weight: 600;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-link {
  color: #718096;
  text-align: center;
  margin: 0;
}

.link {
  color: #DC2626;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.link:hover {
  color: #B91C1C;
  text-decoration: underline;
}

@media (max-width: 768px) {
  .register-wrapper {
    padding: 1rem;
  }

  .register-container {
    padding: 2rem 1.5rem;
    border-radius: 15px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  }

  .register-header {
    margin-bottom: 2rem;
  }

  .navbar-brand {
    margin-bottom: 1.5rem;
  }

  .logo {
    display: none;
  }

  .title {
    font-size: 1.5rem;
  }

  .register-header h2 {
    font-size: 2rem;
  }

  .register-header p {
    font-size: 1rem;
  }

  .register-form {
    gap: 2rem;
  }

  .form-section {
    padding: 1.5rem;
    border-radius: 12px;
  }

  .form-section h3 {
    font-size: 1.2rem;
    margin-bottom: 1.25rem;
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .form-input,
  .form-select,
  .form-textarea {
    padding: 0.875rem;
    font-size: 16px;
  }

  .btn-register {
    padding: 0.875rem 2rem;
  }
}

@media (max-width: 480px) {
  .register-container {
    padding: 1.5rem 1rem;
  }

  .register-header h2 {
    font-size: 1.75rem;
  }

  .title {
    font-size: 1.4rem;
  }

  .form-section {
    padding: 1.25rem;
  }

  .form-section h3 {
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }

  .form-group {
    margin-bottom: 1.25rem;
  }

  .register-form {
    gap: 1.5rem;
  }
}
</style>