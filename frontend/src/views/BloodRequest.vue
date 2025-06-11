<script setup>
import { onMounted, onUnmounted } from 'vue';
import { BloodRequestPresenter } from '../presenters/BloodRequestPresenter';

const {
    bloodRequests,
    userLocation,
    userBloodType,
    hasActiveReservation,
    loadBloodRequests,
    setUserLocation,
    navigateToHospital,
    getFormattedDate,
    checkActiveReservations
} = BloodRequestPresenter();

let map = null;

const initializeMap = () => {
    if (map) {
        map.remove();
        map = null;
    }

    const mapContainer = document.getElementById('map-blood-request');
    if (mapContainer) {
        mapContainer.innerHTML = '';
    }

    setTimeout(() => {
        const defaultLat = userLocation.value.lat || -6.2000;
        const defaultLng = userLocation.value.lng || 106.8167;

        map = L.map('map-blood-request').setView([defaultLat, defaultLng], 12);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        setTimeout(() => {
            map.invalidateSize();
        }, 300);

        if (userLocation.value.lat && userLocation.value.lng) {
            L.marker([userLocation.value.lat, userLocation.value.lng], { icon: userIcon })
                .addTo(map)
                .openPopup();
        }

        bloodRequests.value.forEach(request => {
            L.marker([request.lat, request.lng], { icon: bloodRequestIcon })
                .addTo(map)
                .bindPopup(`<b>${request.patientName}</b><br>${request.hospitalName}<br>${request.address}`);
        });
    }, 100);
};

const refreshData = async () => {
    await loadBloodRequests();
    await checkActiveReservations();
    initializeMap();
};

onMounted(async () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                setUserLocation(position.coords.latitude, position.coords.longitude);

                await loadBloodRequests();
                await checkActiveReservations();
                initializeMap();
            },
            async (error) => {
                console.warn('Geolocation error:', error);
                await loadBloodRequests();
                await checkActiveReservations();
                initializeMap();
            }
        );
    } else {
        await loadBloodRequests();
        await checkActiveReservations();
        initializeMap();
    }
});

onUnmounted(() => {
    if (map) {
        map.remove();
        map = null;
    }
});

const userIcon = L.divIcon({
    html: `
        <div class="d-flex align-items-center justify-content-center rounded-circle border border-white shadow" 
             style="width:32px;height:32px;background:#0d6efd;">
            <div class="rounded-circle bg-white" style="width:16px;height:16px;"></div>
        </div>
    `,
    className: '',
    iconSize: [32, 32],
    iconAnchor: [16, 16]
});

const bloodRequestIcon = L.divIcon({
    html: `
        <div class="d-flex align-items-center justify-content-center rounded-circle border border-white shadow" 
             style="width:32px;height:32px;background:#dc3545;">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="white" viewBox="0 0 24 24">
                <path d="M7 2v11h3v9l7-12h-4l3-8z"/>
            </svg>
        </div>
    `,
    className: '',
    iconSize: [32, 32],
    iconAnchor: [16, 16]
});
</script>

<template>
    <div class="row g-4">
        <div class="col-12 col-lg-8">
            <div class="bg-white rounded overflow-hidden"
                style="height: 560px; box-shadow: 0 1px 3px 0px rgba(0, 0, 0, 0.10), 0 1px 2px -1px rgba(0, 0, 0, 0.10);">
                <div class="p-3 border-bottom d-flex justify-content-between align-items-center"
                    style="background: #fff;">
                    <h2 class="h5 mb-0 text-dark">Peta Lokasi</h2>
                    <div class="d-flex align-items-center gap-2">
                        <button class="btn btn-link p-0" @click="refreshData">
                            <img style="width: 20px;"
                                src="https://img.icons8.com/?size=100&id=1742&format=png&color=737373" alt="">
                        </button>
                    </div>
                </div>
                <div id="map-blood-request" style="height: 560px; z-index: 0;"></div>
            </div>
        </div>

        <div class="col-12 col-lg-4">
            <div class="bg-white rounded overflow-hidden h-100"
                style="box-shadow: 0 1px 3px 0px rgba(0, 0, 0, 0.10), 0 1px 2px -1px rgba(0, 0, 0, 0.10);">
                <div class="p-3 border-bottom" style="background: #f8f9fa;">
                    <h2 class="h6 mb-0 text-dark">Permintaan Darah ({{ bloodRequests.length }})</h2>
                </div>
                <div style="overflow-y: auto; max-height: 500px;">
                    <ul class="list-group list-group-flush">
                        <li v-for="request in bloodRequests" :key="request.id"
                            class="list-group-item list-group-item-action" style="cursor:pointer;">
                            <div class="p-2" @click="openRequestDetails(request)">
                                <div class="d-flex justify-content-between align-items-start">
                                    <div class="flex-grow-1">
                                        <div class="d-flex align-items-center gap-2 mb-1">
                                            <span class="fw-medium text-danger small">{{ request.patientName }}</span>
                                        </div>
                                        <div class="mt-1 d-flex align-items-center gap-2">
                                            <span class="badge bg-danger text-white px-2 py-1"
                                                style="font-size: 0.7rem;">
                                                {{ request.bloodType }}
                                            </span>
                                            <span class="text-muted small">{{ getFormattedDate(request.requestDate)
                                                }}</span>
                                        </div>
                                        <div class="mt-1 text-muted small text-truncate">{{ request.hospitalName }}
                                        </div>
                                        <div class="mt-1 text-muted small text-truncate">{{ request.address }}</div>
                                    </div>
                                </div>
                                <div class="mt-3 d-flex justify-content-between align-items-center">
                                    <div class="d-flex flex-column">
                                        <div class="fw-semibold text-dark small">{{ request.distance }} km</div>
                                        <div class="text-muted small">{{ request.neededUnits }} unit</div>
                                    </div>

                                    <div class="d-flex gap-2"> <button class="btn btn-outline-secondary btn-sm"
                                            @click.stop="navigateToHospital(request)">
                                            Rute
                                        </button>
                                        <router-link v-if="!hasActiveReservation"
                                            :to="`/reservation/request/${request.id}`" class="btn btn-danger btn-sm">
                                            Reservasi
                                        </router-link>
                                        <button v-else class="btn btn-secondary btn-sm" disabled
                                            title="Anda memiliki reservasi yang sedang berlangsung">
                                            Reservasi
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li v-if="bloodRequests.length === 0" class="list-group-item text-center text-muted">
                            Tidak ada permintaan darah yang cocok dengan golongan darah Anda ({{ userBloodType }})
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

.list-group-item-action:hover {
    background-color: #f8f9fa !important;
}
</style>