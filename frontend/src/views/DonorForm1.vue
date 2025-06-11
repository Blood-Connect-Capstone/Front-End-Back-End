<template>
  <Navbar />
  <div class="container-lg my-5">
    <form @submit.prevent="handleSubmit" class="mx-auto form-container">
      <h2 class="mb-4 text-center form-title">Kuesioner Donor Darah</h2>

      <div class="row g-4 mt-2">
        <div class="col-md-6">
          <div class="form-group">
            <label for="nik" class="form-label">Nomor Induk Kependudukan (NIK)*</label>
            <input id="nik" v-model="form.nik" class="form-control" placeholder="Masukkan NIK" required />
          </div>
        </div>

        <div class="col-md-6">
          <div class="form-group">
            <label for="weight" class="form-label">Berat Badan (Kg)*</label>
            <input id="weight" v-model.number="form.weight" type="number" step="0.01" class="form-control"
              placeholder="Masukkan berat badan" required />
          </div>
        </div>

        <div class="col-md-6">
          <div class="form-group">
            <label for="full_name" class="form-label">Nama Lengkap*</label>
            <input id="full_name" v-model="form.full_name" class="form-control" placeholder="Masukkan nama lengkap"
              required />
          </div>
        </div>

        <div class="col-md-6">
          <div class="form-group">
            <label for="height" class="form-label">Tinggi Badan (Cm)*</label>
            <input id="height" v-model.number="form.height" type="number" step="0.01" class="form-control"
              placeholder="Masukkan tinggi badan" required />
          </div>
        </div>

        <div class="col-md-6">
          <div class="form-group">
            <label class="form-label">Jenis Kelamin*</label>
            <div class="gender-options">
              <div class="form-check">
                <input type="radio" id="Male" value="Male" v-model="form.gender" class="form-check-input" />
                <label for="Male" class="form-check-label">Laki-laki</label>
              </div>
              <div class="form-check">
                <input type="radio" id="Female" value="Female" v-model="form.gender" class="form-check-input" />
                <label for="Female" class="form-check-label">Perempuan</label>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="form-group">
            <label for="province" class="form-label">Provinsi*</label>
            <input v-model="form.province" class="form-control" placeholder="Masukkan provinsi" required />
          </div>
        </div>

        <div class="col-md-6">
          <div class="form-group">
            <label for="religion" class="form-label">Agama*</label>
            <select v-model="form.religion" class="form-control" id="religion">
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

        <div class="col-md-6">
          <div class="form-group">
            <label for="city_or_regency" class="form-label">Kabupaten/Kota*</label>
            <input v-model="form.city_or_regency" class="form-control" placeholder="Masukkan kabupaten/kota" required />
          </div>
        </div>

        <div class="col-md-6">
          <div class="form-group">
            <label for="place_of_birth" class="form-label">Tempat Lahir*</label>
            <input v-model="form.place_of_birth" class="form-control" placeholder="Masukkan tempat lahir" required />
          </div>
        </div>

        <div class="col-md-6">
          <div class="form-group">
            <label for="district" class="form-label">Kecamatan*</label>
            <input v-model="form.district" class="form-control" placeholder="Masukkan kecamatan" required />
          </div>
        </div>

        <div class="col-md-6">
          <div class="form-group">
            <label for="date_of_birth" class="form-label">Tanggal Lahir*</label>
            <input id="date_of_birth" v-model="form.date_of_birth" type="date" class="form-control" required />
          </div>
        </div>

        <div class="col-md-6">
          <div class="form-group">
            <label for="sub_district" class="form-label">Kelurahan*</label>
            <input v-model="form.sub_district" class="form-control" placeholder="Masukkan kelurahan" required />
          </div>
        </div>

        <div class="col-12">
          <div class="form-group">
            <label for="address" class="form-label">Alamat Lengkap*</label>
            <textarea v-model="form.full_address" class="form-control" placeholder="Masukkan alamat lengkap" rows="3"
              required></textarea>
          </div>
        </div>

        <div class="col-md-6">
          <div class="form-group">
            <label for="occupation" class="form-label">Pekerjaan*</label>
            <input v-model="form.occupation" class="form-control" placeholder="Masukkan pekerjaan" required />
          </div>
        </div>

        <div class="col-md-6">
          <div class="form-group">
            <label for="last_donor_date" class="form-label">Kapan terakhir kali donor darah?</label>
            <input v-model="form.last_donor_date" type="date" class="form-control" />
          </div>
        </div>

        <div class="col-md-6">
          <div class="form-group">
            <label for="blood_type" class="form-label">Golongan Darah*</label>
            <select v-model="form.blood_type" class="form-control" id="blood_type" required>
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

        <div class="col-md-6">
          <div class="form-group">
            <label for="last_donor_place" class="form-label">Tempat terakhir donor darah</label>
            <input v-model="form.last_donor_place" class="form-control" placeholder="Masukkan tempat terakhir donor" />
          </div>
        </div>

        <div class="col-md-6">
          <div class="form-group">
            <label for="total_donors" class="form-label">Sudah berapa kali pernah donor darah?*</label>
            <input v-model.number="form.total_donors" type="number" class="form-control"
              placeholder="Masukkan jumlah donor sebelumnya" required />
          </div>
        </div>

        <div class="col-md-6">
          <div class="form-group">
            <label for="donor_card_number" class="form-label">Nomor kartu donor darah sebelumnya</label>
            <input v-model="form.donor_card_number" class="form-control" placeholder="Masukkan nomor kartu donor" />
          </div>
        </div>
      </div>

      <div class="form-footer">
        <p class="text-muted">Pastikan semua data yang diisi sudah benar sebelum mengirimkan kuesioner.</p>
        <button type="submit" class="btn-custom">
          Selanjutnya
        </button>
      </div>
    </form>
  </div>
  <Footer />
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import { donorForm1Presenter } from "../presenters/DonorForm1Presenter";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getCurrentUserWithProfile } from "@/composables/supabaseClient";

const props = defineProps({
  refer_id: String,
  reservation_type: String
});

const emit = defineEmits(['form-submitted']);

const router = useRouter();
const route = useRoute();
const reservationType = ref('');

const form = ref({
  reservation_type: "",
  reservation_refer_id: "",
  user_id: "",
  nik: "",
  full_name: "",
  gender: "",
  religion: "",
  place_of_birth: "",
  date_of_birth: "",
  full_address: "",
  occupation: "",
  blood_type: "",
  total_donors: null,
  weight: null,
  height: null,
  province: "",
  city_or_regency: "",
  district: "",
  sub_district: "",
  last_donor_date: "",
  last_donor_place: "",
  donor_card_number: "",
});

const handleSubmit = async () => {
  const dob = new Date(form.value.date_of_birth);

  if (dob > new Date()) {
    alert("Tanggal lahir tidak boleh di masa depan.");
    return;
  }

  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }

  if (age < 17) {
    alert("Anda harus berusia minimal 17 tahun untuk mendaftar sebagai pendonor.");
    return;
  }

  try {
    const response = await donorForm1Presenter(form.value, router);

    if (response.success) {
      emit('form-submitted');
    } else {
      alert("Gagal mengirimkan kuesioner. Silakan coba lagi.");
    }
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};

onMounted(async () => {
  const user = await getCurrentUserWithProfile();

  reservationType.value = route.params.type;

  form.value.reservation_type = reservationType.value;
  form.value.reservation_refer_id = route.params.id;
  form.value.user_id = user?.user?.id;
  form.value.nik = user?.profile?.nik;
  form.value.full_name = user?.profile?.name;
  form.value.gender = user?.profile?.gender;
  form.value.religion = user?.profile?.religion;
  form.value.place_of_birth = user?.profile?.place_of_birth;
  form.value.date_of_birth = user?.profile?.date_of_birth;
  form.value.full_address = user?.profile?.full_address;
  form.value.occupation = user?.profile?.occupation;
  form.value.blood_type = user?.profile?.blood_type;
  form.value.total_donors = user?.profile?.total_donors;
  form.value.province = user?.profile?.province;
  form.value.city_or_regency = user?.profile?.city_or_regency;
  form.value.district = user?.profile?.district;
  form.value.sub_district = user?.profile?.sub_district;
});
</script>

<style scoped>
.form-container {
  max-width: 900px;
  border-radius: 20px;
  border: 1px solid #e2e8f0;
  padding: 2rem;
  background: #ffffff;
}

.form-title {
  color: #1f2937;
  font-weight: 700;
  margin-bottom: 2rem;
}

.section-divider {
  margin: 2rem 0 1.5rem 0;
  border-bottom: 2px solid #f3f4f6;
  padding-bottom: 0.5rem;
}

.section-title {
  color: #374151;
  font-weight: 600;
  margin: 0;
  font-size: 1.1rem;
}

.form-group {
  margin-bottom: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-weight: 600;
  color: #4a5568;
  display: block;
  font-size: 0.95rem;
}

.form-control {
  width: 100%;
  padding: 0.8rem;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background-color: #ffffff;
}

.form-control:focus {
  outline: none;
  border-color: #DC2626;
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}

.form-control::placeholder {
  color: #a0aec0;
}

.gender-options {
  display: flex;
  gap: 1.5rem;
  margin-top: 0.5rem;
}

.form-check {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.form-check-input {
  margin: 0;
  width: 1.2rem;
  height: 1.2rem;
}

.form-check-label {
  margin: 0;
  cursor: pointer;
  color: #374151;
  font-weight: 500;
}

.form-footer {
  margin-top: 2.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
  text-align: center;
}

.form-footer p {
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
}

.btn-custom {
  background-color: #DC2626;
  border: none;
  color: white;
  padding: 0.875rem 2.5rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  min-width: 200px;
}

@media (max-width: 768px) {
  .form-container {
    padding: 1.5rem;
    margin: 1rem;
  }

  .btn-custom {
    width: 100%;
    min-width: auto;
  }
}
</style>