<template>
  <div class="login-wrapper">
    <div class="login-container">
      <div class="login-header">
        <div class="navbar-brand">
          <img class="logo" src="/src/assets/images/logo.svg" alt="Logo" />
          <span class="title">BloodConnect</span>
        </div>
        <h2>Masuk</h2>
        <p>Selamat datang kembali</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-section">
          <div class="form-group">
            <label for="email">Alamat Email</label>
            <input id="email" v-model="email" type="email" class="form-input" placeholder="Masukkan email Anda" required />
          </div>

          <div class="form-group">
            <label for="password">Kata Sandi</label>
            <input id="password" type="password" v-model="password" class="form-input" placeholder="Masukkan passowrd" required />
          </div>
        </div>

        <div class="form-footer">
          <button type="submit" class="btn-login">
            Masuk
          </button>
          <p class="register-link">
            Belum punya akun?
            <router-link to="/register" class="link">Daftar</router-link>
          </p>
        </div>
      </form>
    </div>
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

<style scoped>
.login-wrapper {
  min-height: 100vh;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
}

.login-container {
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
  padding: 3rem;
  width: 100%;
  max-width: 800px;
  border: 1px solid #e2e8f0;
}

.login-header {
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

.login-header h2 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.login-header p {
  color: #718096;
  font-size: 1.1rem;
}

.login-form {
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

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.form-group label {
  font-weight: 600;
  color: #4a5568;
  font-size: 0.95rem;
}

.form-input {
  padding: 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
}

.form-input:focus {
  outline: none;
  border-color: #DC2626;
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}

.form-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.btn-login {
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

.btn-login:hover {
  background: #B91C1C;
}

.register-link {
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
  .login-wrapper {
    padding: 1rem;
  }

  .login-container {
    padding: 2rem 1.5rem;
    border-radius: 15px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  }

  .login-header {
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

  .login-header h2 {
    font-size: 2rem;
  }

  .login-header p {
    font-size: 1rem;
  }

  .login-form {
    gap: 2rem;
  }

  .form-section {
    padding: 1.5rem;
    border-radius: 12px;
  }

  .form-input {
    padding: 0.875rem;
    font-size: 16px;
  }

  .btn-login {
    padding: 0.875rem 2rem;
  }
}

@media (max-width: 480px) {
  .login-container {
    padding: 1.5rem 1rem;
  }

  .login-header h2 {
    font-size: 1.75rem;
  }

  .title {
    font-size: 1.4rem;
  }

  .form-section {
    padding: 1.25rem;
  }

  .form-group {
    margin-bottom: 1.25rem;
  }

  .login-form {
    gap: 1.5rem;
  }
}
</style>