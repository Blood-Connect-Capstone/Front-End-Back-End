import { reactive, ref } from 'vue';
import { getAllPosts, createPost as createPostModel, deletePost as deletePostModel } from '../models/PostModel';
import { createComment as createCommentModel, deleteComment as deleteCommentModel } from '../models/CommentModel';
import { getCurrentUserWithProfile } from '@/composables/supabaseClient';

export const postPresenter = () => {
    const state = reactive({
        posts: [],
        currentUserId: null,
        currentUserName: '',
        commentText: {},
        activePostDropdownId: null,
        activeCommentDropdownId: null
    });

    const isLoading = ref(false);

    const initialize = async () => {
        isLoading.value = true;

        const { user, name } = await getCurrentUserWithProfile();

        state.currentUserId = user.id;
        state.currentUserName = name;

        await loadPosts();

        isLoading.value = false;
    };

    const loadPosts = async () => {
        try {
            const posts = await getAllPosts();

            state.posts.splice(0, state.posts.length, ...posts);
        } catch (error) {
            console.error("Error loading posts:", error);
            throw error;
        }
    };

    const getFilteredPosts = (category) => {
        return state.posts.filter(post => post.category === category);
    };

    const createPost = async (content, category) => {
        if (!content.trim()) return false;

        try {
            const postData = {
                content: content.trim(),
                category,
                user_id: state.currentUserId,
            };

            await createPostModel(postData);
            await loadPosts();

            return true;
        } catch (error) {
            console.error("Error creating post:", error);
            return false;
        }
    };

    const deletePost = async (postId) => {
        if (!confirm('Apakah Anda yakin ingin menghapus postingan ini?')) {
            return false;
        }

        try {
            await deletePostModel(postId);
            await loadPosts();

            state.activePostDropdownId = null;

            return true;
        } catch (error) {
            console.error("Error deleting post:", error);
            alert('Gagal menghapus postingan');
            return false;
        }
    };

    const toggleComments = (postId) => {
        const post = state.posts.find(p => p.id === postId);

        if (post) {
            post.showComments = !post.showComments;
        }
    }; const addComment = async (postId) => {
        const text = state.commentText[postId];

        if (!text || !text.trim()) return false;

        try {
            const commentData = {
                post_id: postId,
                content: text.trim(),
                user_id: state.currentUserId
            };

            // Dapatkan response dari API yang berisi ID komentar yang sesungguhnya
            const response = await createCommentModel(commentData);

            // Validasi respons API
            if (!response || !response.data || !response.data.id) {
                console.error("Error: Server did not return valid comment data", response);
                return false;
            }

            // Gunakan ID dari respons API, bukan Date.now()
            const comment = {
                id: response.data.id, // Gunakan ID dari respons server
                author: state.currentUserName,
                authorId: state.currentUserId,
                content: text.trim(),
                timeAgo: 'Baru saja',
                user_id: state.currentUserId
            };

            const post = state.posts.find(p => p.id === postId);

            if (post) {
                post.comments.push(comment);
                post.showComments = true;
            }

            state.commentText[postId] = '';

            return true;
        } catch (error) {
            console.error("Error adding comment:", error);
            return false;
        }
    }; const deleteComment = async (postId, commentId) => {
        if (!confirm('Apakah Anda yakin ingin menghapus komentar ini?')) {
            return false;
        }

        try {
            // Pastikan commentId valid sebelum dikirim ke API
            if (!commentId) {
                console.error("Invalid comment ID:", commentId);
                return false;
            }

            await deleteCommentModel(commentId);

            const post = state.posts.find(p => p.id === postId);

            if (post) {
                const commentIndex = post.comments.findIndex(c => c.id === commentId);

                if (commentIndex !== -1) {
                    post.comments.splice(commentIndex, 1);
                } else {
                    console.warn("Comment not found in local state:", commentId);
                }
            }

            state.activeCommentDropdownId = null;

            return true;
        } catch (error) {
            console.error("Error deleting comment:", error);
            alert('Gagal menghapus komentar');
            return false;
        }
    };

    const togglePostDropdown = (postId) => {
        state.activePostDropdownId = (state.activePostDropdownId === postId) ? null : postId;
    };

    const toggleCommentDropdown = (commentId) => {
        state.activeCommentDropdownId = (state.activeCommentDropdownId === commentId) ? null : commentId;
    };

    const closeAllDropdowns = () => {
        state.activePostDropdownId = null;
        state.activeCommentDropdownId = null;
    };

    const isUserPost = (post) => {
        return post.authorId === state.currentUserId;
    };

    const isUserComment = (comment) => {
        return comment.authorId === state.currentUserId;
    };

    return {
        state,
        isLoading,

        initialize,
        loadPosts,
        getFilteredPosts,
        createPost,
        deletePost,
        toggleComments,
        addComment,
        deleteComment,
        togglePostDropdown,
        toggleCommentDropdown,
        closeAllDropdowns,
        isUserPost,
        isUserComment
    };
};