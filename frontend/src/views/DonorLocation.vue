<script setup>
import { onMounted, watch } from 'vue';
import { DonorLocationPresenter } from '../presenters/DonorLocationPresenter';

const { nearbyPlaces, hasActiveReservation, loadDonorLocations, setUserLocation, checkActiveReservations } = DonorLocationPresenter();

const initializeMap = (lat, lng) => {
    const map = L.map('map').setView([lat, lng], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
    }).addTo(map);

    setTimeout(() => map.invalidateSize(), 300);

    L.marker([lat, lng], { icon: userIcon }).addTo(map);

    nearbyPlaces.value.forEach(place => {
        L.marker([place.lat, place.lng], { icon: donorIcon })
            .addTo(map)
            .bindPopup(`<b>${place.name}</b><br>${place.address}`);
    });
};

onMounted(async () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            setUserLocation(position.coords.latitude, position.coords.longitude);
            await loadDonorLocations();
            await checkActiveReservations();
            initializeMap(position.coords.latitude, position.coords.longitude);
        }, async () => {
            await loadDonorLocations();
            await checkActiveReservations();
            initializeMap(-6.2, 106.8167);
        });
    } else {
        await loadDonorLocations();
        await checkActiveReservations();
        initializeMap(-6.2, 106.8167);
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

const donorIcon = L.divIcon({
    html: `
        <div class="d-flex align-items-center justify-content-center rounded-circle border border-white shadow" 
             style="width:32px;height:32px;background:#dc3545;">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="white" viewBox="0 0 24 24">
                <path d="M12 2L8 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-2l-4-4z"/>
                <path d="M12 11v4m-2-2h4" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
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
                        <button class="btn btn-link p-0" @click="fetchData">
                            <img style="width: 20px;"
                                src="https://img.icons8.com/?size=100&id=1742&format=png&color=737373" alt="">
                        </button>
                    </div>
                </div>
                <div id="map" style="height: 560px; z-index: 0;"></div>
            </div>
        </div>

        <div class="col-12 col-lg-4">
            <div class="bg-white rounded overflow-hidden h-100"
                style="box-shadow: 0 1px 3px 0px rgba(0, 0, 0, 0.10), 0 1px 2px -1px rgba(0, 0, 0, 0.10);">
                <div class="p-3 border-bottom" style="background: #f8f9fa;">
                    <h2 class="h6 mb-0 text-dark">Lokasi Donor ({{ nearbyPlaces.length }})</h2>
                </div>
                <div style="overflow-y: auto; max-height: 500px;">
                    <ul class="list-group list-group-flush">
                        <li v-for="(place, index) in nearbyPlaces" :key="index"
                            class="list-group-item list-group-item-action" style="cursor:pointer;">
                            <div class="p-2">
                                <div class="d-flex justify-content-between align-items-start">
                                    <div class="flex-grow-1">
                                        <div class="d-flex align-items-center">
                                            <span class="fw-medium text-danger small">{{ place.name }}</span>
                                        </div>
                                        <div class="mt-1 text-muted small"
                                            style="white-space: normal; word-break: break-word;">{{ place.address }}
                                        </div>
                                        <div class="mt-1 d-flex align-items-center text-muted small">
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                style="width: 14px; height: 14px; margin-right: 4px;" fill="none"
                                                viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {{ place.hours }}
                                        </div>
                                    </div>

                                </div>
                                <div class="mt-3 d-flex justify-content-between gap-2">
                                    <div class="d-flex flex-column align-items-end">
                                        <div class="fw-semibold text-dark small">{{ place.distance }} km</div>
                                    </div>

                                    <div class="d-flex justify-content-between gap-2">
                                        <button class="btn btn-outline-secondary btn-sm"
                                            @click.stop="navigateToMaps(place)">
                                            Rute
                                        </button> <router-link v-if="!hasActiveReservation"
                                            :to="`/reservation/place/${place.id}`" class="btn btn-danger btn-sm">
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
                        <li v-if="nearbyPlaces.length === 0" class="list-group-item text-center text-muted">
                            Tidak ada lokasi donor darah ditemukan di sekitar Anda
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
