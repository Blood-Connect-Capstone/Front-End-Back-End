const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET_KEY);

module.exports = {
    async getAll() {
        const { data, error } = await supabase
            .from('donor_reservations')
            .select(`
                *,
                profiles:user_id (*),
                donor_locations:donor_location_id (*),
                blood_requests:blood_request_id (*)
            `)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    },

    async getById(id) {
        const { data, error } = await supabase
            .from('donor_reservations')
            .select(`
                *,
                profiles:user_id (*),
                donor_locations:donor_location_id (*),
                blood_requests:blood_request_id (*)
            `)
            .eq('id', id)
            .single();

        if (error) throw error;
        return data;
    },

    async getByUserId(userId) {
        const { data, error } = await supabase
            .from('donor_reservations')
            .select(`
                *,
                profiles:user_id (*),
                donor_locations:donor_location_id (*),
                blood_requests:blood_request_id (*)
            `)
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    },

    async create(donorReservation) {
        const {
            user_id,
            weight,
            height,
            total_donor,
            last_donor_date,
            last_donor_place,
            donor_card_number,
            screening_status,
            status,
            donor_location_id,
            blood_request_id,
            donor_date
        } = donorReservation;

        const { data, error } = await supabase
            .from('donor_reservations')
            .insert([{
                user_id,
                weight,
                height,
                total_donor,
                last_donor_date,
                last_donor_place,
                donor_card_number,
                screening_status,
                status,
                donor_location_id,
                blood_request_id,
                donor_date
            }])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    async update(id, updateData) {
        const { data, error } = await supabase
            .from('donor_reservations')
            .update({
                ...updateData,
                updated_at: new Date().toISOString()
            })
            .eq('id', id)
            .select();

        if (error) throw error;
        return data;
    },

    async updateScreeningStatus(user_id, reservation_type, refer_id, screeningStatus) {
        let query = supabase
            .from('donor_reservations')
            .update({
                screening_status: screeningStatus,
                updated_at: new Date().toISOString()
            })
            .eq('user_id', user_id);

        if (reservation_type === 'request') {
            query = query.eq('blood_request_id', refer_id);
        } else {
            query = query.eq('donor_location_id', refer_id);
        }

        const { data, error } = await query.select();

        if (error) throw error;
        return data;
    },

    async delete(id) {
        const { error } = await supabase
            .from('donor_reservations')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return { success: true };
    },

    async getUserDonorReservationsByReference(reservationType, referId, userId) {
        let query = supabase
            .from('donor_reservations')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false })
            .limit(1);

        if (reservationType === 'request') {
            query = query.eq('blood_request_id', referId);
        } else {
            query = query.eq('donor_location_id', referId);
        }

        const { data, error } = await query.maybeSingle();

        if (error) throw error;

        return data;
    },
}