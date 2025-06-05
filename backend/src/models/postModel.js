const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const moment = require('moment');
require('moment/locale/id');
moment.locale('id');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

function formatTimeAgo(dateString) {
    return moment(dateString).fromNow();
}

module.exports = {
    async getAll(supabase) {
        const { data: posts = [], error } = await supabase
            .from('posts')
            .select('*, profiles:user_id(name), comments(*, profiles:user_id(name))')
            .order('created_at', { ascending: false });

        if (error) throw error;

        return posts.map(({ profiles, comments = [], ...post }) => ({
            ...post,
            author: profiles?.name || 'Unknown User',
            authorId: post.user_id,
            timeAgo: formatTimeAgo(post.created_at),
            showComments: false,
            comments: comments.map(({ profiles: commentProfiles, ...comment }) => ({
                ...comment,
                author: commentProfiles?.name || 'Unknown User',
                authorId: comment.user_id,
                timeAgo: formatTimeAgo(comment.created_at)
            }))
        }));
    },

    async create({ user_id, content, category }, supabase) {
        const { data, error } = await supabase
            .from('posts')
            .insert([{ user_id, content, category }])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    async update(id, content, category) {
        const { data, error } = await supabase
            .from('posts')
            .update({ content, category, updated_at: new Date().toISOString() })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    async delete(id, supabase) {
        const { error } = await supabase
            .from('posts')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return { success: true };
    }
};