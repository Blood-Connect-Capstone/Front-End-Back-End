<script setup>
import { HomePresenter } from '../presenters/HomePresenter';
const { tabs, cards, activeTab, onTabClick } = HomePresenter();
</script>

<template>
    <main>
        <nav>
            <div class="nav nav-tabs" role="tablist">
                <template v-for="tab in tabs" :key="tab.id">
                <button
                    class="nav-link"
                    :class="{ active: activeTab === tab.id }"
                    type="button"
                    @click="onTabClick(tab.id)"
                >
                    <img
                        :src="tab.icon"
                        class="tab-img"
                        :class="{ active: activeTab === tab.id }"
                        alt=""
                        width="18"
                        height="18"
                    />
                    {{ tab.label }}
                </button>
                <div
                    v-if="activeTab === tab.id"
                    class="tab-pane-mobile"
                >
                    <div class="tab-pane-content">
                    {{ tab.content }}
                    </div>
                </div>
                </template>
            </div>
            </nav>
            <div class="tab-content-desktop">
            <div
                v-for="tab in tabs"
                :key="tab.id"
                v-show="activeTab === tab.id"
                class="tab-pane fade show active"
            >
                {{ tab.content }}
            </div>
        </div>
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
    font-family: 'Inter', sans-serif;
}
main {
    margin: 0 152px;
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
    color: #E7000B;
    font-weight: bold;
}
.nav-tabs .nav-link.active::after {
    content: "";
    display: block;
    height: 1.6px;
    background: #E7000B;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
}
.tab-content {
    padding-top: 24px;
}
.container {
    margin: 0 auto;
    padding: 0;
    box-shadow: 
        0 1px 3px 0px rgba(0,0,0,0.10),
        0 1px 2px -1px rgba(0,0,0,0.10);
    border-radius: 8px;
}
.container-header {
    padding: 16px;
    border-bottom: 1px solid #E5E7EB;
}
.card {
    border: none;
}
.card-body {
    padding: 16px 16px 0;
    img {
        margin-bottom: 12px;
    }
}
.card-title {
    font-size: 13px;
    font-weight: semibold;
    color: #101828;
}
.card-text {
    font-size: 11px;
    color: #6A7282;
}
.tab-pane-mobile {
  display: none;
}
.tab-content-desktop {
  display: block;
  padding-top: 24px;
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
        max-width: 1140px;
    }
}

@media (max-width: 1200px) {
    main {
        margin: 0 24px;
    }
}
</style>