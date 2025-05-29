<script setup>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import { HomePresenter } from "../presenters/HomePresenter";
import DonorLocation from './DonorLocation.vue';
import BloodRequest from './BloodRequest.vue';

const { tabs, cards, activeTab, onTabClick } = HomePresenter();

import { ref, onMounted } from 'vue';

const isMobile = ref(false);

onMounted(() => {
    isMobile.value = window.innerWidth <= 634;
    window.addEventListener('resize', () => {
        isMobile.value = window.innerWidth <= 634;
    });
});
</script>

<template>
    <main>
        <nav>
            <div class="nav nav-tabs" role="tablist">
                <template v-for="tab in tabs" :key="tab.id">
                    <button class="nav-link" :class="{ active: activeTab === tab.id }" type="button"
                        @click="onTabClick(tab.id)">
                        <img :src="tab.icon" class="tab-img" :class="{ active: activeTab === tab.id }" alt="" width="18"
                            height="18" />
                        {{ tab.label }}
                    </button>
                    <div v-if="activeTab === tab.id && isMobile" class="tab-pane-mobile">
                        <div class="tab-pane-content">
                            <DonorLocation v-if="tab.content === 'location'" />
                            <BloodRequest v-else-if="tab.content === 'request'" />
                            <div v-else>{{ tab.content }}</div>
                        </div>
                    </div>
                </template>
            </div>
        </nav>

        <div v-if="!isMobile" class="tab-content-desktop">
            <template v-for="tab in tabs" :key="tab.id">
                <div v-if="activeTab === tab.id" class="tab-pane fade show active">
                    <DonorLocation v-if="tab.content === 'location'" />
                    <BloodRequest v-else-if="tab.content === 'request'" />
                    <div v-else>{{ tab.content }}</div>
                </div>
            </template>
        </div>

        <!-- Benefits Section - Only show on Beranda tab -->
        <section class="py-5" v-show="activeTab === 'beranda'">
            <div class="container">
                <div class="container-header">
                    <h6>Manfaat Donor Darah</h6>
                </div>
                <div class="row text-center">
                    <div class="col-md-3 mb-4" v-for="card in cards" :key="card.title">
                        <div class="card h-100">
                            <div class="card-body">
                                <img :src="card.img" width="64px">
                                <h5 class="card-title">{{ card.title }}</h5>
                                <p class="card-text">{{ card.text }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="py-5">
            <div class="container">
                <div class="container-header">
                    <h6>Manfaat Donor Darah</h6>
                </div>
                <div class="row text-center">
                    <div class="col-md-3 mb-4" v-for="card in cards" :key="card.title">
                        <div class="card h-100">
                            <div class="card-body">
                                <img :src="card.img" width="64px">
                                <h5 class="card-title">{{ card.title }}</h5>
                                <p class="card-text">{{ card.text }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>



<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');

* {
  font-family: "Inter", sans-serif;
}

main {
    margin: 0 100px;
}

.nav-tabs {
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 35px;
  border-bottom: 1px solid #dee2e6;
  justify-content: flex-start;
}

.tab-img {
    margin-right: 8px;
}

.nav-link.active .tab-img,
.tab-img.active {
    filter: invert(28%) sepia(97%) saturate(7492%) hue-rotate(356deg) brightness(97%) contrast(109%);
}

.nav-tabs .nav-link {
  border: none;
  background: none;
  color: #828282;
  position: relative;
  padding: 16px;
  margin: 0;
  font-size: 13px;
  line-height: 20px;
}

.nav-tabs .nav-link.active {
  color: #e7000b;
  font-weight: bold;
}

.nav-tabs .nav-link.active::after {
  content: "";
  display: block;
  height: 1.6px;
  background: #e7000b;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
}

.tab-content-desktop {
    display: block;
    padding-top: 24px;
}

.container {
    margin: 0 auto;
    padding: 0;
    box-shadow:
        0 1px 3px 0px rgba(0, 0, 0, 0.10),
        0 1px 2px -1px rgba(0, 0, 0, 0.10);
    border-radius: 8px;
}

.container-header {
  padding: 16px;
  border-bottom: 1px solid #e5e7eb;
}

.card {
  border: none;
}

.card-body {
    padding: 16px 16px 0;
}

.card-body img {
    margin-bottom: 12px;
}

.card-title {
    font-size: 13px;
    font-weight: 600;
    color: #101828;
}

.card-text {
  font-size: 11px;
  color: #6a7282;
}

.tab-pane-mobile {
    display: none;
}

/* Mobile styles */
@media (max-width: 634px) {
    .nav-tabs {
        flex-direction: column;
        gap: 0;
    }

    .nav-tabs .nav-link {
        width: 100%;
        text-align: left;
        border-radius: 0;
        border-bottom: 1px solid #eee;
    }

    .tab-pane-mobile {
        display: block;
        padding: 16px 0;
        border-bottom: 1px solid #eee;
        background: #fff;
    }

    .tab-content-desktop {
        display: none;
    }
}

@media (min-width: 992px) {
    .container {
        max-width: 1400px;
    }
}

@media (max-width: 1200px) {
  main {
    margin: 0 24px;
  }
}
</style>
