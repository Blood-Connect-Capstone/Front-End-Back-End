import axios from "axios";
import {
  getAuthHeaders,
  getCurrentUserWithProfile,
  supabaseAnon,
} from "@/composables/supabaseClient.js";

export async function fetchProfile() {
  const { user, profile } = await getCurrentUserWithProfile();
  if (!user) throw new Error("User not logged in");
  if (!profile) throw new Error("Profile not found");
  return profile;
}

export async function getProfile() {
  try {
    return await fetchProfile();
  } catch (error) {
    console.error("Error fetching profile:", error.message);
    throw error;
  }
}

export async function updateProfile(profileData) {
  const { user } = await getCurrentUserWithProfile();
  if (!user) throw new Error("User not logged in");

  const { data, error } = await supabaseAnon
    .from("profiles")
    .update(profileData)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) throw new Error(`Update profile failed: ${error.message}`);
  return data;
}

export async function updateProfileImage(imageFile) {
  const { user } = await getCurrentUserWithProfile();
  if (!user) throw new Error("User not logged in");

  const fileExt = imageFile.name.split(".").pop();
  const filePath = `profile/${user.id}.${fileExt}`;

  const { error: uploadError } = await supabaseAnon.storage
    .from("photo")
    .upload(filePath, imageFile, { upsert: true });

  if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`);

  const {
    data: { publicUrl },
  } = supabaseAnon.storage.from("photo").getPublicUrl(filePath);

  await updateProfile({ photo: publicUrl });
  return publicUrl;
}

export async function getProfileById(id) {
  const headers = await getAuthHeaders();
  const apiUrl = import.meta.env.VITE_API_URL;

  try {
    const res = await axios.get(`${apiUrl}/profiles/${id}`, { headers });
    return res.data.data;
  } catch (error) {
    console.error("Error fetching profile by ID:", error.message);
    throw error;
  }
}
