const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET_KEY);

module.exports = {
    async getByUserId(userId) {
        const { data, error } = await supabase
            .from('user_points')
            .select(`
                *,
                profiles:user_id (
                    user_id,
                    name
                )
            `)
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    }, async create({ user_id, amount, source, description }) {
        const { data, error } = await supabase
            .from('user_points')
            .insert([{
                user_id,
                amount: parseInt(amount),
                source,
                description
            }])
            .select(`
                *,
                profiles:user_id (
                    user_id,
                    name
                )
            `)
            .single();

        if (error) throw error;
        return data;
    },

    async update(id, { amount, source, description }) {
        const updateData = {};

        if (amount !== undefined) {
            updateData.amount = parseInt(amount);
        }
        if (source !== undefined) {
            updateData.source = source;
        }
        if (description !== undefined) {
            updateData.description = description;
        }

        const { data, error } = await supabase
            .from('user_points')
            .update(updateData)
            .eq('id', id)
            .select(`
                *,
                profiles:user_id (
                    user_id,
                    name,
                    email
                )
            `)
            .single();

        if (error) throw error;
        return data;
    },

    async delete(id) {
        const { error } = await supabase
            .from('user_points')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return { success: true };
    },

    async getTotalPointsByUser(userId) {
        const { data, error } = await supabase
            .from('user_points')
            .select('amount')
            .eq('user_id', userId);

        if (error) throw error;

        const totalPoints = data.reduce((sum, record) => sum + parseInt(record.amount), 0);
        return { totalPoints, transactionCount: data.length };
    },

    async getPointsStats() {
        const { data, error } = await supabase
            .from('user_points')
            .select('amount, created_at');

        if (error) throw error;

        const totalPoints = data.reduce((sum, record) => sum + parseInt(record.amount), 0);
        const totalTransactions = data.length;
        const averagePoints = totalTransactions > 0 ? totalPoints / totalTransactions : 0;

        return {
            totalPoints,
            totalTransactions,
            averagePoints: parseFloat(averagePoints.toFixed(2))
        };
    },

    async getPointsBySource() {
        const { data, error } = await supabase
            .from('user_points')
            .select('source, amount');

        if (error) throw error;

        const pointsBySource = data.reduce((acc, record) => {
            const source = record.source || 'Unknown';
            if (!acc[source]) {
                acc[source] = {
                    totalPoints: 0,
                    count: 0
                };
            }
            acc[source].totalPoints += parseInt(record.amount);
            acc[source].count += 1;
            return acc;
        }, {});

        return pointsBySource;
    }
};