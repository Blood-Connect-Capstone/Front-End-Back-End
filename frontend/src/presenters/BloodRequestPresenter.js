import { ref } from 'vue';
import {
    fetchBloodRequests,
    getDistanceFromLatLonInKm,
    formatDate,
    getUrgencyClass,
    getUrgencyText
} from '../models/BloodRequestModel';

export function BloodRequestPresenter() {
    const bloodRequests = ref([]);
    const userLocation = ref({ lat: null, lng: null });
    const userBloodType = "AB+";

    const loadBloodRequests = async () => {
        try {
            const requests = await fetchBloodRequests(userBloodType);

            let mappedRequests = requests.map(request => ({
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

            console.log('Fetched blood requests:', mappedRequests);
            bloodRequests.value = mappedRequests;
        } catch (error) {
            console.error('Error loading blood requests:', error);
        }
    };

    const setUserLocation = (lat, lng) => {
        userLocation.value.lat = lat;
        userLocation.value.lng = lng;
    };

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

    const getFormattedDate = formatDate;
    const getUrgencyStyle = getUrgencyClass;
    const getUrgencyLabel = getUrgencyText;

    return {
        bloodRequests,
        userLocation,
        userBloodType,
        loadBloodRequests,
        setUserLocation,
        openRequestDetails,
        navigateToHospital,
        openWhatsAppChat,
        getFormattedDate,
        getUrgencyStyle,
        getUrgencyLabel
    };
}