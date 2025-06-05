const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET_KEY);

module.exports = {
    async getAll() {
        const { data, error } = await supabase
            .from('blood_requests')
            .select(`
                id,
                location_id,
                requester_name,
                blood_type,
                quantity,
                request_date,
                notes,
                urgency,
                status,
                donor_locations (
                    name,
                    lat,
                    lng,
                    address,
                    phone
                )
            `);

        if (error) throw error;

        return data.map(item => ({
            request_id: item.id,
            location_id: item.location_id,
            requester_name: item.requester_name,
            blood_type: item.blood_type,
            quantity: item.quantity,
            request_date: item.request_date,
            notes: item.notes,
            urgency: item.urgency,
            status: item.status,
            location_name: item.donor_locations?.name,
            lat: item.donor_locations?.lat,
            lng: item.donor_locations?.lng,
            address: item.donor_locations?.address,
            phone: item.donor_locations?.phone,
        }));
    },

    async getById(id) {
        const { data, error } = await supabase
            .from('blood_requests')
            .select(`*`)
            .eq('id', id)
            .single();

        if (error) throw error;
        return data;
    },

    async create(request) {
        const { data, error } = await supabase
            .from('blood_requests')
            .insert([request])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    async update(id, request) {
        const { data, error } = await supabase
            .from('blood_requests')
            .update(request)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    async delete(id) {
        const { error } = await supabase
            .from('blood_requests')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return { success: true };
    }
};
