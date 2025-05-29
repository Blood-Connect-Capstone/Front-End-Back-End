<script setup>
import axios from 'axios';
import { onMounted, onUnmounted, ref } from 'vue';

const bloodRequests = ref([]);
const userLocation = ref({ lat: null, lng: null });
let map = null; // Store map instance

const userBloodType = "AB+";

const openRequestDetails = (request) => {
    console.log('Opening details for:', request.patientName);
};

const navigateToHospital = (request) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${request.lat},${request.lng}`;
    window.open(url, '_blank');
};

const openWhatsAppChat = (phoneNumber) => {
    const url = `https://wa.me/${phoneNumber}`;
    window.open(url, '_blank');
};

const getUrgencyClass = (urgency) => {
    switch (urgency) {
        case 'urgent':
            return 'bg-danger text-white';
        case 'high':
            return 'bg-warning text-dark';
        case 'medium':
            return 'bg-info text-white';
        default:
            return 'bg-secondary text-white';
    }
};

const getUrgencyText = (urgency) => {
    switch (urgency) {
        case 'urgent':
            return 'Sangat Mendesak';
        case 'high':
            return 'Mendesak';
        case 'medium':
            return 'Sedang';
        default:
            return 'Biasa';
    }
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
        return 'Hari ini';
    } else if (diffDays === 2) {
        return 'Kemarin';
    } else {
        return `${diffDays} hari lalu`;
    }
};

// Fungsi Haversine untuk hitung jarak (dalam km)
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius bumi dalam km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

const fetchData = async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/v1/blood-requests', {
            params: {
                bloodType: userBloodType,
            }
        });

        console.log('Fetched blood requests:', response.data.data);

        let places = response.data.data.map(request => ({
            id: request.id,
            patientName: request.requester_name,
            bloodType: request.blood_type,
            urgency: request.urgency,
            requestDate: request.request_date,
            hospitalName: request.location_name,
            neededUnits: request.quantity,
            phoneNumber: request.phone,
            address: request.address,
            lat: request.lat,
            lng: request.lng
        }));

        if (userLocation.value.lat && userLocation.value.lng) {
            places.forEach(place => {
                place.distance = getDistanceFromLatLonInKm(
                    userLocation.value.lat,
                    userLocation.value.lng,
                    place.lat,
                    place.lng
                ).toFixed(2);
            });
            places.sort((a, b) => a.distance - b.distance);
        }

        bloodRequests.value = places;
    } catch (error) {
        console.error('Error fetching blood requests:', error);
    }
};

// Function to initialize map
const initializeMap = () => {
    // Clean up existing map if it exists
    if (map) {
        map.remove();
        map = null;
    }

    // Clear the map container
    const mapContainer = document.getElementById('map-blood-request');
    if (mapContainer) {
        mapContainer.innerHTML = '';
    }

    // Wait a bit before creating new map
    setTimeout(() => {
        const defaultLat = userLocation.value.lat || -6.2000;
        const defaultLng = userLocation.value.lng || 106.8167;

        map = L.map('map-blood-request').setView([defaultLat, defaultLng], 12);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Fix map size after initialization
        setTimeout(() => {
            map.invalidateSize();
        }, 300);

        // Add user location marker if available
        if (userLocation.value.lat && userLocation.value.lng) {
            L.marker([userLocation.value.lat, userLocation.value.lng], { icon: userIcon })
                .addTo(map)
                .bindPopup('Lokasi Anda')
                .openPopup();
        }

        // Add blood request markers
        bloodRequests.value.forEach(place => {
            L.marker([place.lat, place.lng], { icon: bloodRequestIcon })
                .addTo(map)
                .bindPopup(`<b>${place.patientName}</b><br>${place.hospitalName}<br>${place.address}`);
        });
    }, 100);
};

const openPlaceDetails = (place) => {
    console.log('Opening details for:', place.name);
};

const navigateToMaps = (place) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`;
    window.open(url, '_blank');
};

const openReservationModal = (place) => {
    console.log('Opening reservation modal for:', place.name);
};

onMounted(async () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                userLocation.value.lat = position.coords.latitude;
                userLocation.value.lng = position.coords.longitude;
                await fetchData();
                initializeMap();
            },
            async (error) => {
                console.warn('Geolocation error:', error);
                await fetchData();
                initializeMap();
            }
        );
    } else {
        await fetchData();
        initializeMap();
    }
});

// Clean up map when component is unmounted
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

// Updated refresh function
const refreshData = async () => {
    await fetchData();
    initializeMap();
};
</script>

<template>
    <div class="row g-4">
        <!-- Map Container -->
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

        <!-- Right Panel - Blood Requests -->
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
                                            <span :class="getUrgencyClass(request.urgency)"
                                                class="badge badge-sm px-2 py-1" style="font-size: 0.65rem;">
                                                {{ getUrgencyText(request.urgency) }}
                                            </span>
                                        </div>
                                        <div class="mt-1 d-flex align-items-center gap-2">
                                            <span class="badge bg-danger text-white px-2 py-1"
                                                style="font-size: 0.7rem;">
                                                {{ request.bloodType }}
                                            </span>
                                            <span class="text-muted small">{{ formatDate(request.requestDate) }}</span>
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

                                    <div class="d-flex gap-2">
                                        <button class="btn btn-outline-secondary btn-sm"
                                            @click.stop="navigateToHospital(request)">
                                            Rute
                                        </button>
                                        <button class="btn btn-danger btn-sm"
                                            @click.stop="openReservationModal(request)">
                                            Reservasi Donor
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
.badge-sm {
    font-size: 0.65rem;
    padding: 0.25rem 0.5rem;
}

.list-group-item-action:hover {
    background-color: #f8f9fa !important;
}

.btn-sm {
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
    line-height: 1.5;
    border-radius: 0.2rem;
}
</style>