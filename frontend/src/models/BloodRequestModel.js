import axios from 'axios';

export function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

export async function fetchBloodRequests(bloodType) {
    try {
        const response = await axios.get(import.meta.env.VITE_API_URL + '/blood-requests', {
            params: {
                bloodType: bloodType,
            }
        });
        return response.data.data;
    } catch (error) {
        console.error('Error fetching blood requests:', error);
        throw error;
    }
}

export function formatDate(dateString) {
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
}

export function getUrgencyClass(urgency) {
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
}

export function getUrgencyText(urgency) {
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
}