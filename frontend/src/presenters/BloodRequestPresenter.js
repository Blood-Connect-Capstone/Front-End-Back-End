import { ref } from 'vue';
import {
    fetchBloodRequests,
    getDistanceFromLatLonInKm,
    formatDate,
} from '../models/BloodRequestModel';
import { fetchMyReservations } from '../models/MyReservationModel';

export function BloodRequestPresenter() {
    const bloodRequests = ref([]);
    const userLocation = ref({ lat: null, lng: null });
    const userBloodType = "AB+";
    const hasActiveReservation = ref(false); 
    
    const checkActiveReservations = async () => {
        try {
            const reservations = await fetchMyReservations();
            hasActiveReservation.value = reservations.some(reservation =>
                reservation.status === 'pending' ||
                reservation.status === 'on-screening'
            );
        } catch (error) {
            console.error('Error checking active reservations:', error);
        }
    };

    const loadBloodRequests = async () => {
        try {
            const requests = await fetchBloodRequests(userBloodType);
            await checkActiveReservations();

            let mappedRequests = requests.map(request => ({
                id: request.request_id,
                patientName: request.requester_name,
                bloodType: request.blood_type,
                urgency: request.urgency,
                requestDate: request.request_date,
                hospitalName: request.location_name,
                neededUnits: request.quantity,
                phoneNumber: request.phone,
                address: request.address,
                lat: request.lat,
                lng: request.lng,
                distance: 0
            }));

            if (userLocation.value.lat && userLocation.value.lng) {
                mappedRequests.forEach(request => {
                    request.distance = getDistanceFromLatLonInKm(
                        userLocation.value.lat,
                        userLocation.value.lng,
                        request.lat,
                        request.lng
                    ).toFixed(2);
                });

                mappedRequests.sort((a, b) => a.distance - b.distance);
            }

            bloodRequests.value = mappedRequests;
        } catch (error) {
            console.error('Error loading blood requests:', error);
        }
    };

    const setUserLocation = (lat, lng) => {
        userLocation.value.lat = lat;
        userLocation.value.lng = lng;
    };

    const navigateToHospital = (request) => {
        const url = `https://www.google.com/maps/dir/?api=1&destination=${request.lat},${request.lng}`;
        window.open(url, '_blank');
    };

    const getFormattedDate = formatDate;
    
    return {
        bloodRequests,
        userLocation,
        userBloodType,
        hasActiveReservation,
        loadBloodRequests,
        setUserLocation,
        navigateToHospital,
        getFormattedDate,
        checkActiveReservations
    };
}