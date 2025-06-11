import { getCurrentUserWithProfile } from "@/composables/supabaseClient";
import axios from "axios";

export async function currentUserStep(refer_id, reservation_type) {
    try {
        const { user } = await getCurrentUserWithProfile();
        const response = await axios.get(import.meta.env.VITE_API_URL + `/donor-reservations/check-step/${reservation_type}/${refer_id}/${user.id}`);

        return response.data.data?.screening_status || null;
    } catch (error) {
        console.error('Error checking user step:', error);
        return null;
    }
};

export async function getUserEligibility() {
    try {
        const { user } = await getCurrentUserWithProfile();
        const response = await axios.get(import.meta.env.VITE_API_URL + `/profiles/${user.id}`);

        return response.data.data?.donor_eligibility || null;
    } catch (error) {
        console.error('Error fetching user eligibility:', error);
        throw error;
    }
}

export async function updateUserEligibility(eligibility) {
    try {
        const { user } = await getCurrentUserWithProfile();

        const response = await axios.put(
            import.meta.env.VITE_API_URL + `/profiles/${user.id}`,
            { donor_eligibility: eligibility }
        );

        return response.data;
    } catch (error) {
        console.error('Error updating user eligibility:', error);
        throw error;
    }
}

export async function updateReservationDate(userId, reservation_type, refer_id, donor_date) {
    try {
        const response = await axios.patch(
            import.meta.env.VITE_API_URL + `/donor-reservations/date`,
            {
                user_id: userId,
                reservation_type: reservation_type,
                refer_id: refer_id,
                donor_date: donor_date
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error updating reservation date:', error);
        throw error;
    }
}

export async function updateStatus(userId, reservation_type, refer_id, status) {
    try {
        const response = await axios.patch(
            import.meta.env.VITE_API_URL + `/donor-reservations/status`,
            {
                user_id: userId,
                reservation_type: reservation_type,
                refer_id: refer_id,
                status: status
            }
        );

        return response.data;
    } catch (error) {
        console.error('Error updating reservation status:', error);
        throw error;
    }
}

export async function updateReservationStatus(userId, reservation_type, refer_id, status) {
    try {
        const response = await axios.patch(
            import.meta.env.VITE_API_URL + `/donor-reservations/screening-status`,
            {
                user_id: userId,
                reservation_type: reservation_type,
                refer_id: refer_id,
                screening_status: status
            }
        );

        return response.data;
    } catch (error) {
        console.error('Error updating reservation status:', error);
        throw error;
    }
}

export async function getUserDonorReservationsByReference(reservation_type, refer_id) {
    try {
        const { user } = await getCurrentUserWithProfile();
        const response = await axios.get(import.meta.env.VITE_API_URL + `/donor-reservations/reference/${reservation_type}/${refer_id}/${user.id}`);

        return response.data?.data || [];
    } catch (error) {
        console.error('Error fetching user donor reservations by reference:', error);
        throw error;
    }
}

export async function deleteDonorReservation(reservationId) {
    try {
        const response = await axios.delete(import.meta.env.VITE_API_URL + `/donor-reservations/${reservationId}`);

        return response.data;
    }
    catch (error) {
        console.error('Error deleting donor reservation:', error);
        throw error;
    }
}