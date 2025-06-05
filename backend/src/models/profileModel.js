const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET_KEY);

module.exports = {
    async getAll() {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    },

    async getById(id) {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', id)
            .single();

        if (error) throw error;
        return data;
    },

    async create({
        id,
        national_id,
        full_name,
        gender,
        religion,
        place_of_birth,
        date_of_birth,
        full_address,
        occupation,
        blood_type,
        total_donations = 0,
        weight_kg = null,
        height_cm = null,
        province,
        city_or_regency,
        district,
        sub_district,
        last_donation_date = null,
        last_donation_location = null,
        previous_donor_card_number = null,
        points = 0
    }) {
        const { data, error } = await supabase
            .from('profiles')
            .insert([{
                id,
                national_id,
                full_name,
                gender,
                religion,
                place_of_birth,
                date_of_birth,
                full_address,
                occupation,
                blood_type,
                total_donations,
                weight_kg,
                height_cm,
                province,
                city_or_regency,
                district,
                sub_district,
                last_donation_date,
                last_donation_location,
                previous_donor_card_number,
                points
            }])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    async update(id, updateData) {
        const { data, error } = await supabase
            .from('profiles')
            .update({
                ...updateData,
                updated_at: new Date().toISOString()
            })
            .eq('user_id', id)
            .select();

        if (error) throw error;
        return data;
    },

    async delete(id) {
        const { error } = await supabase
            .from('profiles')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return { success: true };
    },
};