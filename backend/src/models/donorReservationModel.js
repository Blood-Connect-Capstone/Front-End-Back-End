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
            blood_requests:blood_request_id (
                *,
                donor_locations:location_id (*)
            )
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

    async updateByCondition(conditions, updateData) {
        let query = supabase
            .from('donor_reservations')
            .update({
                ...updateData,
                updated_at: new Date().toISOString()
            });

        Object.entries(conditions).forEach(([key, value]) => {
            query = query.eq(key, value);
        });

        const { data, error } = await query.select();

        if (error) throw error;
        return data;
    },

    async updateByReference(user_id, reservation_type, refer_id, updateData) {
        let query = supabase
            .from('donor_reservations')
            .update({
                ...updateData,
                updated_at: new Date().toISOString()
            })
            .eq('user_id', user_id);

        const referenceColumn = reservation_type === 'request' ? 'blood_request_id' : 'donor_location_id';
        query = query.eq(referenceColumn, refer_id);

        const { data, error } = await query.select();

        if (error) throw error;
        return data;
    },

    async updateDate(user_id, reservation_type, refer_id, donor_date) {
        return this.updateByReference(user_id, reservation_type, refer_id, { donor_date });
    },

    async updateStatus(user_id, reservation_type, refer_id, status) {
        return this.updateByReference(user_id, reservation_type, refer_id, { status });
    },

    async updateScreeningStatus(user_id, reservation_type, refer_id, screening_status) {
        return this.updateByReference(user_id, reservation_type, refer_id, { screening_status });
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