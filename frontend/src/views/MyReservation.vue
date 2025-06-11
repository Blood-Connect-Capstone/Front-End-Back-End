<script setup>
import { onMounted, onUnmounted } from 'vue';
import { MyReservationPresenter } from '../presenters/MyReservationPresenter';

const {
    myReservations,
    userLocation,
    loadMyReservations,
    setUserLocation,
    navigateToLocation,
    cancelReservation,
    getFormattedDate,
    getFormattedTime,
    getStatusStyle,
    getStatusLabel,
} = MyReservationPresenter();

let map = null;

const initializeMap = () => {
    if (map) {
        map.remove();
        map = null;
    }

    const mapContainer = document.getElementById('map-donor-reservation');
    if (mapContainer) {
        mapContainer.innerHTML = '';
    }

    setTimeout(() => {
        const defaultLat = userLocation.value.lat || -6.2000;
        const defaultLng = userLocation.value.lng || 106.8167;

        map = L.map('map-donor-reservation').setView([defaultLat, defaultLng], 12);

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
                .bindPopup('Lokasi Anda')
                .openPopup();
        }

        myReservations.value.forEach(reservation => {
            L.marker([reservation.lat, reservation.lng], { icon: donorLocationIcon })
                .addTo(map)
                .bindPopup(`<b>${reservation.locationName}</b><br>${reservation.address}<br>${getFormattedDate(reservation.donationDate)} - ${getFormattedTime(reservation.donationTime)}`);
        });
    }, 100);
};

const refreshData = async () => {
    await loadMyReservations();
    initializeMap();
};

onMounted(async () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                setUserLocation(position.coords.latitude, position.coords.longitude);

                await loadMyReservations();
                initializeMap();
            },
            async (error) => {
                console.warn('Geolocation error:', error);
                await loadMyReservations();
                initializeMap();
            }
        );
    } else {
        await loadMyReservations();
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
             style="width:32px;height:32px;background:#0984e3;">
            <div class="rounded-circle bg-white" style="width:16px;height:16px;"></div>
        </div>
    `,
    className: '',
    iconSize: [32, 32],
    iconAnchor: [16, 16]
});

const donorLocationIcon = L.divIcon({
    html: `
        <div class="d-flex align-items-center justify-content-center rounded-circle border border-white shadow" 
             style="width:32px;height:32px;background:#6c757d;">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="white" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
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
        <div class="col-12">
            <div class="reservation-container">
                <div class="reservation-header">
                    <div class="header-content">
                        <div class="header-text">
                            <h2 class="map-title">Reservasi Donor Anda</h2>
                        </div>
                    </div>
                    <button class="refresh-btn" @click="refreshData" title="Refresh Data">
                        <img style="width: 20px;" src="https://img.icons8.com/?size=100&id=1742&format=png&color=737373"
                            alt="">
                    </button>
                </div>

                <div class="reservation-content">
                    <div class="reservations-grid" v-if="myReservations.length > 0">
                        <div class="reservation-card" v-for="reservation in myReservations" :key="reservation.id">
                            <div class="card-header">
                                <div class="location-badge">
                                    <i class="fas fa-hospital"></i>
                                </div>
                                <div class="card-title-section">
                                    <h6 class="card-title">{{ reservation.locationName }}</h6>
                                    <span :class="getStatusStyle(reservation.status)" class="status-badge">
                                        {{ getStatusLabel(reservation.status) }}
                                    </span>
                                </div>
                            </div>

                            <div class="card-body">
                                <div class="info-grid">
                                    <div class="info-item">
                                        <div class="info-icon distance-icon">
                                            <i class="fas fa-map-marker-alt"></i>
                                        </div>
                                        <div class="info-content">
                                            <span class="info-label">Jarak</span>
                                            <span class="info-value">{{ reservation.distance }} km</span>
                                        </div>
                                    </div>

                                    <div class="info-item">
                                        <div class="info-icon date-icon">
                                            <i class="fas fa-calendar-alt"></i>
                                        </div>
                                        <div class="info-content">
                                            <span class="info-label">Tanggal</span>
                                            <span class="info-value">{{ reservation.donationDate == null ? '-' :
                                                getFormattedDate(reservation.donationDate) }}</span>
                                        </div>
                                    </div>

                                    <div class="info-item full-width">
                                        <div class="info-icon address-icon">
                                            <i class="fas fa-building"></i>
                                        </div>
                                        <div class="info-content">
                                            <span class="info-label">Alamat</span>
                                            <span class="info-value">{{ reservation.address }}</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="action-buttons">
                                    <button class="btn-custom btn-cancel"
                                        @click.stop="cancelReservation(reservation.id)">
                                        <i class="fas fa-times"></i>
                                        <span>Batalkan</span>
                                    </button>

                                    <button class="btn-custom btn-route" @click.stop="navigateToLocation(reservation)">
                                        <i class="fas fa-directions"></i>
                                        <span>Navigasi</span>
                                    </button>

                                    <router-link :to="'/reservation/' + reservation.type + '/' + reservation.referId"
                                        class="btn-custom btn-continue" v-if="reservation.status === 'on-screening'">
                                        <i class="fas fa-arrow-right"></i>
                                        <span>Lanjutkan</span>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-else class="empty-state">
                        <div class="empty-icon">
                            <i class="fas fa-calendar-times"></i>
                        </div>
                        <h3 class="empty-title">Belum ada reservasi donor</h3>
                        <p class="empty-description">Buat reservasi donor baru untuk membantu sesama</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-12 mt-5">
            <div class="map-container">
                <div class="map-header">
                    <div class="map-header-content">
                        <h2 class="map-title">Peta Lokasi Donor</h2>
                    </div>
                </div>
                <div id="map-donor-reservation" class="map-content"></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.reservation-container {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 1px 3px 0px rgba(0, 0, 0, 0.10), 0 1px 2px -1px rgba(0, 0, 0, 0.10);
}

.reservation-header {
    padding: 16px 24px;
    background: #f8f9fa;
    border-bottom: 1px solid #e9ecef;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.header-content {
    display: flex;
    align-items: center;
}


.header-title {
    font-size: 16px;
    font-weight: 600;
    margin: 0;
    color: #333;
}

.refresh-btn {
    background: none;
    border: none;
    padding: 8px;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.2s;
}

.refresh-btn:hover {
    background: #e9ecef;
}

.refresh-btn img {
    width: 20px;
    height: 20px;
}

.reservation-content {
    background: white;
}

.reservations-grid {
    padding: 16px;
    display: grid;
    gap: 16px;
}

.reservation-card {
    background: white;
    border-radius: 8px;
    border: 1px solid #e9ecef;
    overflow: hidden;
    transition: all 0.3s ease;
}

.card-header {
    padding: 24px 24px 16px;
    display: flex;
    align-items: center;
    gap: 16px;
    border-bottom: 1px solid #f5f5f5;
}

.location-badge {
    width: 48px;
    height: 48px;
    background: #DC2626;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.location-badge i {
    color: white;
    font-size: 20px;
}

.card-title-section {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
}

.card-title {
    font-size: 18px;
    font-weight: 600;
    color: #1a1a1a;
    margin: 0;
}

.status-badge {
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.card-body {
    padding: 24px;
}

.info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 24px;
}

.info-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
}

.info-icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.distance-icon,
.date-icon,
.address-icon {
    background: #6c757d;
}

.info-icon i {
    color: white;
    font-size: 16px;
}

.info-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.info-label {
    font-size: 12px;
    color: #8b8b8b;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.info-value {
    font-size: 14px;
    color: #333;
    font-weight: 600;
    line-height: 1.4;
}

.action-buttons {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
}

.btn-custom {
    padding: 10px 16px;
    border: none;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 500;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    transition: all 0.2s ease;
}

.btn-cancel {
    background: #DC2626;
    color: white;
    flex: 1;
}

.btn-route {
    background: #0984e3;
    color: white;
    flex: 1;
}

.btn-continue {
    background: #0984e3;
    color: white;
    flex: 1;
}

.btn-primary-gradient {
    background: #0984e3;
    color: white;
}

.empty-state {
    padding: 40px 32px;
    text-align: center;
}

.empty-icon {
    margin-bottom: 16px;
}

.empty-icon i {
    font-size: 48px;
    color: #6c757d;
}

.empty-title {
    font-size: 16px;
    font-weight: 500;
    color: #333;
    margin-bottom: 8px;
}

.empty-description {
    font-size: 14px;
    color: #6c757d;
    margin-bottom: 0;
    line-height: 1.5;
}

.map-container {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 1px 3px 0px rgba(0, 0, 0, 0.10), 0 1px 2px -1px rgba(0, 0, 0, 0.10);
    height: 560px;
}

.map-header {
    padding: 16px 24px;
    background: #fff;
    border-bottom: 1px solid #e9ecef;
}

.map-header-content {
    display: flex;
    align-items: center;
}

.map-title {
    font-size: 18px;
    font-weight: 500;
    color: #333;
    margin: 0;
}

.map-content {
    height: calc(560px - 60px);
    z-index: 0;
}

@media (max-width: 768px) {
    .reservation-header {
        padding: 16px;
    }

    .reservations-grid {
        padding: 16px;
        gap: 16px;
    }

    .card-header {
        padding: 20px;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 12px;
    }

    .card-title-section {
        flex-direction: column;
        align-items: center;
        gap: 12px;
    }

    .info-grid {
        grid-template-columns: 1fr;
        gap: 16px;
    }

    .action-buttons {
        flex-direction: column;
    }

    .btn {
        justify-content: center;
    }

    .empty-state {
        padding: 32px 24px;
    }

    .map-header {
        padding: 16px;
    }
}

@media (max-width: 480px) {
    .reservation-header {
        padding: 16px;
    }

    .header-title {
        font-size: 16px;
    }

    .reservations-grid {
        padding: 16px;
    }

    .card-header {
        padding: 16px;
    }

    .card-body {
        padding: 20px;
    }

    .btn {
        padding: 10px 16px;
        font-size: 13px;
    }
}
</style>