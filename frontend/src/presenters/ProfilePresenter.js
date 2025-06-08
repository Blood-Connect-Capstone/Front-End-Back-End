import { ref, onMounted } from "vue";
import { useToast } from "vue-toastification";
import { getProfile, getProfileById, updateProfileImage } from "@/models/ProfileModel";

export function useProfilePresenter() {
  const toast = useToast();
  const profile = ref(null);
  const isLoading = ref(false);
  const error = ref(null);

  const fetchProfile = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      const data = await getProfile();
      profile.value = { ...data }; 
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
      profile.value = { ...data }; // Spread to ensure reactivity
    } catch (err) {
      error.value = "Gagal memuat profil. Silakan coba lagi nanti.";
      console.error("Fetch profile by ID error:", err);
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(() => {
    fetchProfile();
  });

  return {
    profile,
    isLoading,
    error,
    fetchProfile,
    updateImage,
    fetchProfileById,
  };
}
