import { ref, onMounted } from "vue";
import { useToast } from "vue-toastification";
import { getDonorHistoryByUserId, getProfile, getProfileById, updateProfileImage } from "@/models/ProfileModel";
import { getCurrentUserWithProfile } from "@/composables/supabaseClient";

export function useProfilePresenter() {
  const toast = useToast();
  const profile = ref(null);
  const donorHistory = ref([]);
  const isLoading = ref(false);
  const error = ref(null);
  const fetchProfile = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      const data = await getProfile();
      // Ensure the donor_history is properly processed
      const processedData = {
        ...data,
        donor_history: Array.isArray(data.donor_history) ? data.donor_history : []
      };
      profile.value = processedData;
    } catch (err) {
      error.value = "Gagal memuat profil. Silakan coba lagi nanti.";
      console.error("Fetch profile error:", err);
    } finally {
      isLoading.value = false;
    }
  };

  const updateImage = async (imageFile) => {
    try {
      const publicUrl = await updateProfileImage(imageFile);
      if (profile.value) {
        profile.value = {
          ...profile.value,
          photo: publicUrl,
        };
      }
      toast.success("Foto profil berhasil diperbarui.");
    } catch (err) {
      toast.error("Gagal memperbarui foto profil. Silakan coba lagi.");
      console.error("Update image error:", err);
    }
  };
  const fetchProfileById = async (userId) => {
    isLoading.value = true;
    error.value = null;
    try {
      const data = await getProfileById(userId);
      donorHistory.value = data.donor_history || [];
    } catch (err) {
      error.value = "Gagal memuat profil. Silakan coba lagi nanti.";
      console.error("Fetch profile by ID error:", err);
    } finally {
      isLoading.value = false;
    }
  };
  const getDonorHistory = async () => {
    isLoading.value = true;
    error.value = null;
    const user = await getCurrentUserWithProfile();

    try {
      const data = await getDonorHistoryByUserId(user.user.id);
      return data;
    } catch (err) {
      error.value = "Gagal memuat riwayat donor. Silakan coba lagi nanti.";
      console.error("Fetch donor history error:", err);
    } finally {
      isLoading.value = false;
    }
  }

  onMounted(() => {
    fetchProfile();
  });

  return {
    profile,
    donorHistory,
    isLoading,
    error,
    fetchProfile,
    updateImage,
    fetchProfileById,
    getDonorHistory
  };
}
