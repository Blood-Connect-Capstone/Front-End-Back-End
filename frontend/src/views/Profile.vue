<template>
  <Navbar />
  <div class="container my-5" style="max-width: 800px">
    <div class="profile-card d-flex align-items-center p-4 mb-4">
      <div class="profile-photo me-4">
        <label for="profileImage" style="cursor: pointer">
          <img
            :src="profile?.photo || defaultPhoto"
            alt="Profile"
            class="rounded-circle"
            width="150"
            height="150"
          />
          <span class="visually-hidden">Ganti Foto Profil</span>
          <input
            id="profileImage"
            type="file"
            accept="image/*"
            @change="onImageChange"
            style="display: none"
          />
        </label>
      </div>
      <div>
        <h4>{{ profile?.name || "Nama" }}</h4>
        <div class="mb-2">{{ profile?.email || "email@gmail.com" }}</div>
        <div>Gender: {{ profile?.gender || "-" }}</div>
        <div>Golongan Darah: {{ profile?.blood_type || "-" }}</div>
        <div>Status: {{ profile?.status || "Sehat" }}</div>
      </div>
    </div>

    <div class="mb-2"><b>Total Donor</b></div>
    <div class="stats-card p-4 mb-4">
      <div class="d-flex align-items-center">
        <img src="../assets/icons/blood.png" alt="Blood Icon" />
        <span class="me-4">
          <i class="bi bi-droplet-half"></i>
          {{ totalVolume }}cc
        </span>
        <img src="../assets/icons/barstats.png" alt="Stats Icon" />
        <span>
          <i class="bi bi-bar-chart"></i>
          {{ totalDonor }}x donor
        </span>
      </div>
    </div>

    <div class="mb-2"><b>Riwayat Donor</b></div>
    <div class="row g-3">
      <template v-if="hasHistory">
        <div
          v-for="(item, idx) in profile?.donor_history"
          :key="idx"
          class="col-md-4"
        >
          <div class="history-card p-3">
            <div class="fw-bold mb-2">DONOR{{ idx + 1 }}</div>
            <div class="mb-1">
              <img src="../assets/icons/blood.png" alt="" />
              <i class="bi bi-droplet-half"></i> {{ item.volume }}cc
            </div>
            <div class="mb-1">
              <img src="../assets/icons/loc.png" alt="" />
              <i class="bi bi-geo-alt"></i> {{ item.location }}
            </div>
            <div>
              <img src="../assets/icons/date.png" alt="" />
              <i class="bi bi-calendar"></i>
              {{ formatDate(item.date) }}
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="col-12">
          <div class="history-card p-4 text-center text-muted">
            Belum ada riwayat donor
          </div>
        </div>
      </template>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import { computed, onMounted } from "vue";
import { useProfilePresenter } from "@/presenters/ProfilePresenter";
import defaultPhoto from "@/assets/images/profiledefault.jpg";

const { profile, fetchProfile, updateImage } = useProfilePresenter();

onMounted(() => {
  fetchProfile();
});

const totalDonor = computed(() => profile?.total_donor || 0);
const totalVolume = computed(() => totalDonor.value * 200);
const hasHistory = computed(
  () => Array.isArray(profile?.donor_history) && profile.donor_history.length > 0
);

function onImageChange(e) {
  const file = e.target.files[0];
  if (file) {
    updateImage(file);
  }
}

function formatDate(dateStr) {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
</script>

<style scoped>
.profile-card {
  border: 1px solid #bbb;
  border-radius: 18px;
  background: #fff;
}
.profile-photo img {
  object-fit: cover;
  border: 2px solid #ccc;
}
.stats-card {
  background: #ddd;
  border-radius: 16px;
  font-size: 1.2rem;
}
.history-card {
  background: #ddd;
  border-radius: 16px;
  min-height: 120px;
}
</style>
