<template>
  <Navbar />
  <div class="container-lg my-5">
    <form @submit.prevent="handleSubmit" class="mx-auto"
      style="max-width: 750px; border-radius: 20px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); padding: 40px 60px">
      <h2 class="mb-4 text-center">Kuesioner Donor Darah</h2>
      <div class="d-flex flex-row justify-content-between mt-4">
        <div>
          <div class="mb-3">
            <label for="nik" class="form-label">NIK*</label>
            <input id="nik" v-model="form.nik" class="form-control" placeholder="Enter NIK" required />
          </div>

          <div class="mb-3">
            <label for="full_name" class="form-label">Full Name*</label>
            <input id="full_name" v-model="form.full_name" class="form-control" placeholder="Enter full name"
              required />
          </div>

          <div>
            <label for="gender" class="form-label">Gender*</label>
            <div class="mb-3 d-flex flex-row justify-content-between">
              <div class="mb-2">
                <input type="radio" id="Male" value="Male" v-model="form.gender" />
                <label for="Male">Male</label>
              </div>
              <div class="mb-2">
                <input type="radio" id="Female" value="Female" v-model="form.gender" />
                <label for="Female">Female</label>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div class="mb-3">
            <label for="weight" class="form-label">Weight (kg)*</label>
            <input id="weight" v-model.number="form.weight" type="number" step="0.01" class="form-control"
              placeholder="Enter weight in kg" required />
          </div>

          <div class="mb-3">
            <label for="height" class="form-label">Height (cm)*</label>
            <input id="height" v-model.number="form.height" type="number" step="0.01" class="form-control"
              placeholder="Enter height in cm" required />
          </div>
        </div>
      </div>

      <div class="d-flex flex-row justify-content-between">
        <div>
          <div class="mb-3 d-flex flex-column">
            <label for="religion" class="form-label">Religion* </label>
            <select v-model="form.religion" class="form-control">
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
          <div class="mb-3">
            <label for="place_of_birth" class="form-label">Place of Birth* </label>
            <input v-model="form.place_of_birth" class="form-control mb-3" placeholder="Place of Birth" required />
          </div>
          <div class="mb-3">
            <label for="date_of_birth" class="form-label">Date of Birth* </label>
            <input id="date_of_birth" v-model="form.date_of_birth" type="date" class="form-control"
              placeholder="Date of Birth" required />
          </div>
          <div class="mb-3">
            <label for="address" class="form-label">Full Address* </label>
            <textarea v-model="form.full_address" class="form-control mb-3" placeholder="Full Address" required />
          </div>
        </div>

        <div>
          <div class="mb-3">
            <label for="province" class="form-label">Province* </label>
            <input v-model="form.province" class="form-control mb-3" placeholder="Province" required />
          </div>
          <div class="mb-3">
            <label for="city_or_regency" class="form-label">City or Regency* </label>
            <input v-model="form.city_or_regency" class="form-control mb-3" placeholder="City or Regency" required />
          </div>
          <div class="mb-3">
            <label for="district" class="form-label">District* </label>
            <input v-model="form.district" class="form-control mb-3" placeholder="District" required />
          </div>
          <div class="mb-3">
            <label for="sub_district" class="form-label">Sub District* </label>
            <input v-model="form.sub_district" class="form-control mb-3" placeholder="Sub District" required />
          </div>
        </div>
      </div>

      <div class="d-flex flex-row justify-content-between">
        <div>
          <div class="mb-3">
            <label for="occupation" class="form-label">Occupation* </label>
            <input v-model="form.occupation" class="form-control mb-3" placeholder="Occupation" required />
          </div>
          <div class="mb-3">
            <label for="blood_type" class="form-label">Blood Type* </label>
            <input v-model="form.blood_type" class="form-control mb-3" placeholder="Blood Type" required />
          </div>
          <div class="mb-3">
            <label for="total_donors" class="form-label">Total Previous Donors* </label>
            <input v-model.number="form.total_donors" type="number" class="form-control mb-3"
              placeholder="Total Previous Donors" required />
          </div>
        </div>
        <div>
          <div class="mb-3">
            <label for="last_donor_date" class="form-label">Last Donor Date</label>
            <input v-model="form.last_donor_date" type="date" class="form-control mb-3" placeholder="Last Donor Date" />
          </div>
          <div class="mb-3">
            <label for="last_donor_place" class="form-label">Last Donor Place</label>
            <input v-model="form.last_donor_place" class="form-control mb-3" placeholder="Last Donor Place" />
          </div>
          <div class="mb-3">
            <label for="donor_card_number" class="form-label">Previous Donor Card Number</label>
            <input v-model="form.donor_card_number" class="form-control mb-3"
              placeholder="Previous Donor Card Number" />
          </div>
        </div>
      </div>
      <p class="text-muted mb-4">Pastikan semua data yang diisi sudah benar sebelum mengirimkan kuesioner.</p>
      <button type="submit" class="btn btn-danger w-100">Selanjutnya</button>
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
.form-control {
  min-width: 280px;
  width: 100%;
  padding: 8px 12px;
}
</style>
