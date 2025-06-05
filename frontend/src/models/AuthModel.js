import { supabaseAnon } from "@/composables/supabaseClient";

const supabase = supabaseAnon;

export async function registerUser({ email, password, profile }) {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) {
    return { success: false, message: authError.message };
  }

  if (authData.user) {
    try {
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            user_id: authData.user.id,
            nik: profile.nik,
            name: profile.name,
            gender: profile.gender,
            religion: profile.religion,
            place_of_birth: profile.place_of_birth,
            date_of_birth: profile.date_of_birth,
            full_address: profile.full_address,
            blood_type: profile.blood_type,
            occupation: profile.occupation,
            province: profile.province,
            city_or_regency: profile.city_or_regency,
            district: profile.district,
            sub_district: profile.sub_district,
            points: 0
          }
        ]);

      if (profileError) {
        console.error('Profile creation failed:', profileError);
        return { success: false, message: `Profile creation failed: ${profileError.message}` };
      }

      return { success: true, user: authData.user, profile: profileData };
    } catch (error) {
      console.error('Error creating profile:', error);
      return { success: false, message: 'Failed to create user profile' };
    }
  }

  return { success: true, user: authData.user };
}

export async function loginUser({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { success: false, message: error.message };
  }

  const accessToken = data.session.access_token;

  return {
    success: true,
    user: data.user,
    token: accessToken,
  };
}

export function saveToLocalStorage(token, name) {
  localStorage.setItem("token", token);
  localStorage.setItem("name", name);
}