<script setup>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import { RewardsPresenter } from "../presenters/RewardsPresenter";

const { rewards, claimReward, loadRewards, getPoint } = RewardsPresenter();

import { ref, onMounted } from "vue";

const totalPoints = ref(0);
const pointHistories = ref([]);

onMounted(async () => {
  loadRewards();

  const response = await getPoint();
  totalPoints.value = response.reduce((sum, item) => sum + (item.amount || 0), 0);

  pointHistories.value = response.map(item => ({
    amount: item.amount,
    createdAt: new Date(item.created_at).toLocaleString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }),
  }));
});

</script>

<template>
  <Navbar />
  <div class="total">
    <div class="total-section">
      <div class="total-title">Total Poin</div>
      <div class="total-text">Jumlah poin kamu sekarang</div>
    </div>
    <div class="total-points">
      <img src="/assets/icons/points.svg" alt="Points" />
      <span class="points">{{ totalPoints }}</span>
    </div>
  </div>
  <div class="history">
    <div class="history-title">History poin</div>
    <div class="history-container">
      <div v-for="point in pointHistories" class="history-section">
        <span>Kamu mendapat {{ point.amount }} poin. Kumpulkan untuk tukar merchandise atau diskon mitra!</span>
        <div class="history-time">{{ point.createdAt }}</div>
      </div>
    </div>
  </div>
  <div class="container">
    <h1 class="text-center my-5">Rewards</h1>
    <div class="row">
      <div class="col-12 col-sm-6 col-md-4 mb-5 d-flex justify-content-center" v-for="reward in rewards"
        :key="reward.id">
        <div class="card h-100" style="width: 100%; max-width: 377px;">
          <img :src="reward.image" class="card-img-top" alt="Reward Image" />
          <div class="card-body">
            <h5 class="card-title">{{ reward.title }}</h5>
            <p class="card-description">{{ reward.description }}</p>
          </div>
          <div class="card-section d-flex justify-content-between align-items-center px-3 pb-3">
            <p class="card-text mb-0 sm:text-sm xs:text-xs">{{ reward.points }} Pts</p>
            <button class="redeem btn sm:px-4 sm:py-2 sm:text-sm xs:px-3 xs:py-1 xs:text-xs"
              @click="claimReward(reward.id)">Redeem -></button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<style scoped>
.total {
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 8px;
  margin: 40px 0;
  padding: 0 80px;
  justify-content: space-between;
  font-family: 'Inter', sans-serif;
}

.total-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.total-title {
  font-size: 24px;
  font-weight: 600;
}

.total-text {
  font-size: 20px;
  color: #828282;
  font-weight: 500;
}

.total-points {
  display: flex;
  align-items: center;
  gap: 10px;
}

.points {
  font-size: 24px;
  font-weight: 500;
}

.history {
  padding: 0 80px;
  font-family: 'Inter', sans-serif;
  margin-bottom: 20px;
}

.history-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 25px;
}

.history-container {
  border: 1px solid black;
  border-radius: 20px;
  padding: 26px;
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.history-section {
  background-color: #D9D9D9;
  border-radius: 10px;
  padding: 40px 35px 14px 35px;
}

.history-time {
  text-align: right;
}

.container {
  margin-bottom: 122px;
}

.card-section {
  padding: 16px;
  border-top: 1px solid #E4E4E7;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.03);
  font-size: 13px;
}

.card {
  border-radius: 8px;
  box-shadow: 0px 1px 15px 1px rgba(0, 0, 0, 0.25);
  /* height: 562px !important; */
}

.card-title {
  font-size: 20px;
  color: #FF5483;
}

.card-text {
  margin-bottom: 0;
  font-size: 20px;
  text-shadow: -1px -1px 0 #E4E4E7, 1px -1px 0 #E4E4E7, -1px 1px 0 #E4E4E7, 1px 1px 0 #E4E4E7;
}

.card-description {
  font-size: 14px;
}

.redeem {
  background-color: rgba(0, 0, 0, 0);
  color: black;
  border: none;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  text-shadow: -1px -1px 0 #E4E4E7, 1px -1px 0 #E4E4E7, -1px 1px 0 #E4E4E7, 1px 1px 0 #E4E4E7;
}

.redeem:hover {
  color: #DC2626;
  background-color: rgba(0, 0, 0, 0);
  text-shadow: 0 0 4px #ffffff;
}

@media (max-width: 1200px) {
  .container {
    padding: 0 24px;
  }

  .total {
    padding: 0 24px;
  }

  .history {
    padding: 0 24px;
  }
}
</style>