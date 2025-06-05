import { supabaseAnon } from "@/composables/supabaseClient";
import { registerUser, saveToLocalStorage, loginUser } from "../models/AuthModel";

export async function RegisterPresenter(formData, router) {
  try {
    if (!formData.profile.nik || !formData.profile.name || !formData.profile.gender ||
      !formData.profile.religion || !formData.profile.place_of_birth ||
      !formData.profile.date_of_birth || !formData.profile.full_address ||
      !formData.profile.blood_type || !formData.profile.occupation || !formData.profile.province ||
      !formData.profile.city_or_regency || !formData.profile.district ||
      !formData.profile.sub_district) {

      alert("Please fill in all required fields.");
      return;
    }

    if (formData.profile.nik.length !== 16 || !/^\d+$/.test(formData.profile.nik)) {
      alert("NIK must be 16 digits.");
      return;
    }

    const data = await registerUser(formData);
    if (data.success) {
      saveToLocalStorage(null, formData.email);

      alert("Registration succeeded! Check your email for verification.");
      router.push("/");
    } else {
      alert(data.message || "Registration failed.");
    }
  } catch (err) {
    alert("Error occurred during registration.");
    console.error(err);
  }
}

export async function LoginPresenter(formData, router) {
  try {
    const data = await loginUser(formData);
    
    if (data.success) {
      saveToLocalStorage(data.token, formData.email);

      router.push("/home");
    } else {
      alert(data.message || "Login failed.");
    }
  } catch (err) {
    alert("Error occurred during login.");
    console.error(err);
  }
}

export function LogoutPresenter(router) {
  localStorage.removeItem("token");
  localStorage.removeItem("email");

  supabaseAnon.auth.signOut();

  router.push("/");
}
