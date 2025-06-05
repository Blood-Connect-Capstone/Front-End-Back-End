import { ref } from 'vue';
import { fetchDonorLocations, getDistanceFromLatLonInKm } from '../models/DonorLocationModel';

export function DonorLocationPresenter() {
    const nearbyPlaces = ref([]);
    const userLocation = ref({ lat: null, lng: null });

    const loadDonorLocations = async () => {
        const places = await fetchDonorLocations();

        let mapped = places.map(place => ({
            id: place.id,
            name: place.name,
            address: place.address,
            hours: place.hours,
            lat: place.lat,
            lng: place.lng,
            distance: 0
        }));

        if (userLocation.value.lat && userLocation.value.lng) {
            mapped.forEach(place => {
                place.distance = getDistanceFromLatLonInKm(
                    userLocation.value.lat, userLocation.value.lng, place.lat, place.lng
                ).toFixed(2);
            });

            mapped.sort((a, b) => a.distance - b.distance);
        }

        nearbyPlaces.value = mapped;
    };

    const setUserLocation = (lat, lng) => {
        userLocation.value.lat = lat;
        userLocation.value.lng = lng;
    };

    return {
        nearbyPlaces,
        userLocation,
        loadDonorLocations,
        setUserLocation
    };
}
