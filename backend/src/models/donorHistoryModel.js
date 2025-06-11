const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET_KEY);

module.exports = {
    async getByUserId(userId) {
        const { data, error } = await supabase
            .from('donor_history')
            .select(`
                *,
                donor_reservations:donor_reservation_id (
                id,
                donor_date,
                status,
                donor_locations:donor_location_id (
                    id,
                    name
                ),
                blood_requests:blood_request_id (
                    id,
                    location:location_id (
                    id,
                    name
                    )
                )
                )
            `)
            .eq('user_id', userId)
            .order('created_at', { ascending: false });


        if (error) throw error;
        return data;
    },

    async create({ user_id, donor_reservation_id, volume, notes }) {
        const { data, error } = await supabase
            .from('donor_history')
            .insert([{
                user_id,
                donor_reservation_id,
                volume: parseFloat(volume),
                notes
            }])
            .select(`
                *,
                profiles:user_id (
                    user_id,
                    full_name,
                    email
                ),
                donor_reservations:donor_reservation_id (
                    id,
                    donor_date,
                    status
                )
            `)
            .single();

        if (error) throw error;
        return data;
    },

    async update(id, { volume, notes }) {
        const updateData = {
            updated_at: new Date().toISOString()
        };

        if (volume !== undefined) {
            updateData.volume = parseFloat(volume);
        }
        if (notes !== undefined) {
            updateData.notes = notes;
        }

        const { data, error } = await supabase
            .from('donor_history')
            .update(updateData)
            .eq('id', id)
            .select(`
                *,
                profiles:user_id (
                    user_id,
                    full_name,
                    email
                ),
                donor_reservations:donor_reservation_id (
                    id,
                    donor_date,
                    status
                )
            `)
            .single();

        if (error) throw error;
        return data;
    },

    async delete(id) {
        const { error } = await supabase
            .from('donor_history')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return { success: true };
    },

    async getTotalVolumeByUser(userId) {
        const { data, error } = await supabase
            .from('donor_history')
            .select('volume')
            .eq('user_id', userId);

        if (error) throw error;

        const totalVolume = data.reduce((sum, record) => sum + parseFloat(record.volume), 0);
        return { totalVolume, donationCount: data.length };
    },

    async getDonationStats() {
        const { data, error } = await supabase
            .from('donor_history')
            .select('volume, created_at');

        if (error) throw error;

        const totalVolume = data.reduce((sum, record) => sum + parseFloat(record.volume), 0);
        const totalDonations = data.length;
        const averageVolume = totalDonations > 0 ? totalVolume / totalDonations : 0;

        return {
            totalVolume,
            totalDonations,
            averageVolume: parseFloat(averageVolume.toFixed(2))
        };
    }
};