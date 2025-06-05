import { createClient } from '@supabase/supabase-js';

export const supabaseAnon = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY,
);

export const getAuthToken = async () => {
    const { data } = await supabaseAnon.auth.getSession();
    return data.session?.access_token;
};

export const getAuthHeaders = async () => {
    const token = await getAuthToken();
    return {
        Authorization: `Bearer ${token}`
    };
};

export const getCurrentUserWithProfile = async () => {
    const { data: sessionData } = await supabaseAnon.auth.getSession();
    const user = sessionData.session?.user;

    if (!user) return { user: null };

    const { data: profile, error } = await supabaseAnon
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

    return {
        user,
        name: profile?.name || 'Pengguna',
        profile: profile || null
    };
};
