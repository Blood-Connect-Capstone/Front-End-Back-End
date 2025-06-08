import { createClient } from "@supabase/supabase-js";

export const supabaseAnon = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);

export const getAuthToken = async () => {
  const { data } = await supabaseAnon.auth.getSession();
  return data.session?.access_token;
};

export const getAuthHeaders = async () => {
  const token = await getAuthToken();
  return {
    Authorization: `Bearer ${token}`,
  };
};

// export async function getCurrentUserWithProfile() {
//   const {
//     data: { user },
//   } = await supabaseAnon.auth.getUser();
//   if (!user) return { user: null, profile: null };
//   const { data: profile } = await supabaseAnon.from("profiles").select("*").eq("user_id", user.id).single();
//   return { user, profile };
// }
export async function getCurrentUserWithProfile() {
  const { data: { user } } = await supabaseAnon.auth.getUser();
  if (!user) return { user: null, profile: null };

  const { data: profile, error } = await supabaseAnon
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (error) throw error;

  // Merge email from auth into profile object
  return { user, profile: { ...profile, email: user.email } };
}
