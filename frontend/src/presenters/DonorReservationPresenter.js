import { ref } from 'vue';
import { useRoute } from 'vue-router';
import {
    deleteDonorReservation,
    getUserDonorReservationsByReference,
    getUserEligibility,
    updateReservationDate,
    updateReservationStatus,
    updateStatus,
    updateUserEligibility,
} from '@/models/DonorReservationModel';
import { getCurrentUserWithProfile } from '@/composables/supabaseClient';

export default function useDonorScreeningPresenter() {
    const isLoading = ref(false);
    const route = useRoute();

    const refer_id = ref(route.params.id);
    const reservation_type = ref(route.params.type);
    const currentUserStep = ref('');
    const userEligibility = ref('');

    const fetchData = async () => {
        isLoading.value = true;
        try {
            userEligibility.value = await getUserEligibility();

            const response = await getUserDonorReservationsByReference(reservation_type.value, refer_id.value);
            currentUserStep.value = response.screening_status;
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            isLoading.value = false;
        }
    };

    const refreshCurrentStep = async () => {
        isLoading.value = true;
        try {
            const response = await getUserDonorReservationsByReference(reservation_type.value, refer_id.value);
            currentUserStep.value = response.screening_status;
        } catch (error) {
            console.error('Error refreshing step:', error);
        } finally {
            isLoading.value = false;
        }
    };

    const resetScreening = async () => {
        try {
            const response = await getUserDonorReservationsByReference(reservation_type.value, refer_id.value);
            if (response.id) {
                await deleteDonorReservation(response.id);
            }
            await updateUserEligibility('allowed');

            userEligibility.value = 'allowed';
            currentUserStep.value = null;
        } catch (error) {
            console.error('Error resetting screening:', error);
        }
    };

    const updateDate = async (donor_date) => {
        try {
            const { user } = await getCurrentUserWithProfile();
            const response = await updateReservationDate(user.id, reservation_type.value, refer_id.value, donor_date);

            await updateStatus(user.id, reservation_type.value, refer_id.value, 'pending');
            await updateReservationStatus(user.id, reservation_type.value, refer_id.value, 'memenuhi');
            return response;
        } catch (error) {
            console.error('Error updating date:', error);
            throw error;
        }
    };

    return {
        isLoading,
        refer_id,
        reservation_type,
        currentUserStep,
        userEligibility,
        fetchData,
        refreshCurrentStep,
        resetScreening,
        updateDate,
    };
}
