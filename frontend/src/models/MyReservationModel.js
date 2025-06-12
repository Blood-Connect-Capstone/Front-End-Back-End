import axios from 'axios';
import { getAuthHeaders, getCurrentUserWithProfile } from '@/composables/supabaseClient';

export const fetchMyReservations = async () => {
    try {
        const user = await getCurrentUserWithProfile();

        const response = await axios.get(
            import.meta.env.VITE_API_URL + `/donor-reservations/user/${user.user.id}`,
        );

        return response.data.data || [];
    } catch (error) {
        console.error('Error fetching donor reservations:', error);
        return getMockReservations();
    }
};

export const cancelMyReservation = async (reservationId) => {
    try {
        const response = await axios.delete(
            import.meta.env.VITE_API_URL + `/donor-reservations/${reservationId}`,
            {
                headers: await getAuthHeaders()
            }
        );

        return response.data;
    } catch (error) {
        console.error('Error cancelling reservation:', error);
        throw error;
    }
};

export const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
};

const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
};

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    return date.toLocaleDateString('id-ID', options);
};

export const formatTime = (timeString) => {
    if (!timeString) return '';

    let time;
    if (timeString.includes('T') || timeString.includes(' ')) {
        time = new Date(timeString);
    } else {
        const today = new Date();
        time = new Date(`${today.toDateString()} ${timeString}`);
    }

    return time.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
};

export const getStatusClass = (status) => {
    const statusClasses = {
        'on-screening': 'bg-warning text-dark',
        'pending': 'bg-success text-white',
    };

    return statusClasses[status] || 'bg-secondary text-white';
};

export const getStatusText = (status) => {
    const statusTexts = {
        'on-screening': 'Belum Menyelesaikan Reservasi',
        'pending': 'Menunggu Kedatangan',
    };

    return statusTexts[status] || 'Tidak Diketahui';
};