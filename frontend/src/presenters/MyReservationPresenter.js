import { ref } from 'vue';
import {
    fetchMyReservations,
    cancelMyReservation,
    getDistanceFromLatLonInKm,
    formatDate,
    formatTime,
    getStatusClass,
    getStatusText
} from '../models/MyReservationModel';

export function MyReservationPresenter() {
    const myReservations = ref([]);
    const userLocation = ref({ lat: null, lng: null });
    const userBloodType = "AB+";


    const loadMyReservations = async () => {
        try {
            const reservations = await fetchMyReservations();

            let mappedReservations = reservations.map(reservation => {
                let locationData;
                let refId;

                if (reservation.blood_request_id) {
                    locationData = reservation.blood_requests?.donor_locations || {};
                    refId = reservation.blood_requests?.id;
                } else {
                    locationData = reservation.donor_locations || {};
                    refId = reservation.donor_locations?.id;
                }

                return {
                    id: reservation.id,
                    type: reservation.blood_request_id ? 'request' : 'location',
                    referId: refId,
                    locationName: reservation.blood_request_id
                        ? reservation.blood_requests?.requester_name || 'Unknown Location'
                        : locationData.name || 'Unknown Location',
                    status: reservation.status,
                    donationDate: reservation.donor_date,
                    donationTime: reservation.donor_time,
                    address: locationData.address || 'Address unavailable',
                    phoneNumber: locationData.phone || 'Phone unavailable',
                    contactPerson: locationData.contact_person,
                    lat: locationData.lat,
                    lng: locationData.lng,
                    isRequestReservation: !!reservation.blood_request_id,
                    bloodRequestId: reservation.blood_request_id,
                    donorLocationId: reservation.donor_location_id,
                    notes: reservation.notes || '',
                    bloodType: reservation.blood_request_id
                        ? reservation.blood_requests?.blood_type || userBloodType
                        : userBloodType,
                    screeningStatus: reservation.screening_status,
                };
            });

            mappedReservations = mappedReservations.filter(reservation =>
                reservation.lat && reservation.lng
            );

            if (userLocation.value.lat && userLocation.value.lng) {
                mappedReservations.forEach(reservation => {
                    reservation.distance = getDistanceFromLatLonInKm(
                        userLocation.value.lat,
                        userLocation.value.lng,
                        reservation.lat,
                        reservation.lng
                    ).toFixed(2);
                });

                mappedReservations.sort((a, b) => {
                    const dateA = new Date(a.donationDate);
                    const dateB = new Date(b.donationDate);

                    if (dateA.getTime() === dateB.getTime()) {
                        return a.distance - b.distance;
                    }
                    return dateA - dateB;
                });
            } else {
                mappedReservations.sort((a, b) => {
                    return new Date(a.donationDate) - new Date(b.donationDate);
                });
            }

            myReservations.value = mappedReservations;
        } catch (error) {
            console.error('Error loading donor reservations:', error);
        }
    };

    const setUserLocation = (lat, lng) => {
        userLocation.value.lat = lat;
        userLocation.value.lng = lng;
    };

    const navigateToLocation = (reservation) => {
        const url = `https://www.google.com/maps/dir/?api=1&destination=${reservation.lat},${reservation.lng}`;
        window.open(url, '_blank');
    };

    const cancelReservation = async (reservationId) => {
        try {
            await cancelMyReservation(reservationId);

            await loadMyReservations();
        } catch (error) {
            console.error('Error cancelling reservation:', error);
        }
    };

    const getFormattedDate = formatDate;
    const getFormattedTime = formatTime;
    const getStatusStyle = getStatusClass;
    const getStatusLabel = getStatusText;

    const isUpcoming = (donationDate) => {
        const today = new Date();
        const reservationDate = new Date(donationDate);
        return reservationDate >= today;
    };

    const isToday = (donationDate) => {
        const today = new Date();
        const reservationDate = new Date(donationDate);
        return (
            reservationDate.getDate() === today.getDate() &&
            reservationDate.getMonth() === today.getMonth() &&
            reservationDate.getFullYear() === today.getFullYear()
        );
    };

    return {
        myReservations,
        userLocation,
        userBloodType,
        loadMyReservations,
        setUserLocation,
        navigateToLocation,
        cancelReservation,
        getFormattedDate,
        getFormattedTime,
        getStatusStyle,
        getStatusLabel,
        isUpcoming,
        isToday
    };
}