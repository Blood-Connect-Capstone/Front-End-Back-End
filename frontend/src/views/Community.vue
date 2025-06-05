<script setup>
import Navbar from '@/components/Navbar.vue';
import { ref, onMounted, computed, reactive } from 'vue';
import { postPresenter } from '@/presenters/CommunityPresenter';

const showAddPost = ref(false);
const activeTab = ref('pengalaman');

const newPost = reactive({
    content: '',
    category: 'pengalaman'
});

const {
    state,
    isLoading,
    initialize,
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
} = postPresenter();

const filteredPosts = computed(() => {
    return getFilteredPosts(activeTab.value);
});

const addPost = async () => {
    const success = await createPost(newPost.content, newPost.category);

    if (success) {
        activeTab.value = newPost.category;
        newPost.content = '';
        newPost.category = 'pengalaman';
        showAddPost.value = false;
    }
};

const setActiveTab = (tab) => {
    activeTab.value = tab;
};

const setCategory = (category) => {
    newPost.category = category;
};

const closeDropdowns = () => {
    closeAllDropdowns();
};

onMounted(async () => {
    await initialize();

    document.addEventListener('click', closeDropdowns);
});
</script>

<template>
    <Navbar />
    <div v-if="isLoading" class="loading-container">
        <div class="spinner"></div>
        <span class="loading-text">Memuat data...</span>
    </div>

    <div v-else class="container mt-4">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2>Forum Diskusi</h2>
            <button class="btn-add-post" @click="showAddPost = !showAddPost">
                <img style="width: 18px;" src="https://img.icons8.com/?size=100&id=N2B3VOHoL80F&format=png&color=FFFFFF"
                    alt="">
                Buat Postingan
            </button>
        </div>

        <div v-if="showAddPost" class="card mb-4">
            <div class="card-body px-4">
                <h5 class="card-title mt-2">Buat Postingan Baru</h5>
                <form @submit.prevent="addPost">
                    <div class="mb-3 mt-3">
                        <textarea v-model="newPost.content" class="form-control" rows="4"
                            placeholder="Masukan text disini..." required></textarea>
                    </div>

                    <div class="d-flex flex-wrap justify-content-between mb-3">
                        <div class="category-selector">
                            <label class="form-label fw-semibold">Pilih Kategori:</label>
                            <div class="d-flex gap-2">
                                <button type="button" class="btn category-btn"
                                    :class="{ 'active': newPost.category === 'pengalaman' }"
                                    @click="setCategory('pengalaman')">
                                    Pengalaman
                                </button>
                                <button type="button" class="btn category-btn"
                                    :class="{ 'active': newPost.category === 'pertanyaan' }"
                                    @click="setCategory('pertanyaan')">
                                    Pertanyaan
                                </button>
                            </div>
                        </div>

                        <div class="action-buttons">
                            <button type="button" class="btn btn-outline-secondary me-2" @click="showAddPost = false">
                                Batal
                            </button>
                            <button type="submit" class="btn btn-dark d-flex align-items-center">
                                <img style="width: 16px; margin-right: 8px;"
                                    src="https://img.icons8.com/?size=100&id=93330&format=png&color=FFFFFF" alt="">
                                Posting
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <ul class="nav nav-tabs tab-nav mb-4">
            <li class="nav-item">
                <button class="nav-link" :class="{ 'active': activeTab === 'pengalaman' }"
                    @click="setActiveTab('pengalaman')">
                    #Pengalaman
                </button>
            </li>
            <li class="nav-item">
                <button class="nav-link" :class="{ 'active': activeTab === 'pertanyaan' }"
                    @click="setActiveTab('pertanyaan')">
                    #Pertanyaan
                </button>
            </li>
        </ul>

        <div class="posts-container">
            <div v-for="post in filteredPosts" :key="post.id" class="post-card p-4">
                <div class="post-header">
                    <div class="avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <div>
                        <h6 class="mb-0">{{ post.author }}</h6>
                        <small class="time-stamp">{{ post.timeAgo }}</small>
                    </div>
                    <div class="ms-auto d-flex align-items-center gap-2">
                        <div v-if="isUserPost(post)" class="dropdown-container">
                            <button class="three-dots-btn" @click.stop="togglePostDropdown(post.id)">
                                <i class="fas fa-ellipsis-v"></i>
                            </button>
                            <div v-if="state.activePostDropdownId === post.id" class="dropdown-menu-custom">
                                <button class="dropdown-item-custom text-danger" @click="deletePost(post.id)"
                                    style="min-width: max-content;">
                                    <i class="fas fa-trash me-2"></i>Hapus Postingan
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="post-content">
                    <p>{{ post.content }}</p>
                </div>

                <div class="post-actions d-flex justify-content-between align-items-center">
                    <button class="action-btn" @click="toggleComments(post.id)">
                        <img style="width: 18px;"
                            src="https://img.icons8.com/?size=100&id=87019&format=png&color=000000" alt="">
                        <span>{{ post.comments.length }}</span>
                    </button>
                    <div class="d-flex align-items-center gap-3">
                        <span class="badge category-badge" :class="post.category">
                            #{{ post.category }}
                        </span>
                    </div>
                </div>

                <div v-if="post.showComments" class="comment-section">
                    <h6 class="mb-3">Komentar</h6>

                    <div v-for="comment in post.comments" :key="comment.id" class="comment-item">
                        <div class="d-flex align-items-start gap-2">
                            <div class="avatar small-avatar">
                                <i class="fas fa-user"></i>
                            </div>
                            <div class="flex-grow-1">
                                <div class="d-flex justify-content-between align-items-start">
                                    <div class="flex-grow-1">
                                        <h6 class="mb-1 comment-author">{{ comment.author }}</h6>
                                        <p class="mb-1 comment-text">{{ comment.content }}</p>
                                        <small class="time-stamp">{{ comment.timeAgo }}</small>
                                    </div>

                                    <div v-if="isUserComment(comment)" class="dropdown-container"> <button
                                            class="three-dots-btn small"
                                            @click.stop="toggleCommentDropdown(comment.id)">
                                            <i class="fas fa-ellipsis-v"></i>
                                        </button>
                                        <div v-if="state.activeCommentDropdownId === comment.id"
                                            class="dropdown-menu-custom">
                                            <button class="dropdown-item-custom text-danger"
                                                style="min-width: max-content;"
                                                @click="deleteComment(post.id, comment.id)">
                                                <i class="fas fa-trash me-2"></i>Hapus Komentar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="mt-3">
                        <form @submit.prevent="addComment(post.id)">
                            <div class="d-flex gap-2">
                                <div class="avatar small-avatar">
                                    <i class="fas fa-user"></i>
                                </div>
                                <div class="flex-grow-1">
                                    <input v-model="state.commentText[post.id]" type="text"
                                        class="form-control form-control-sm" placeholder="Tulis komentar...">
                                </div>
                                <button type="submit" class="btn btn-sm btn-dark">
                                    <img style="width: 14px;"
                                        src="https://img.icons8.com/?size=100&id=93330&format=png&color=FFFFFF" alt="">
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="filteredPosts.length === 0" class="text-center py-5">
            <i class="fas fa-comments fa-3x text-muted mb-3"></i>
            <h5 class="text-muted">Belum ada postingan di kategori #{{ activeTab }}</h5>
            <p class="text-muted">Jadilah yang pertama untuk membuat postingan!</p>
        </div>
    </div>
</template>

<style scoped>
.dropdown-container {
    position: relative;
}

.three-dots-btn {
    background: none;
    border: none;
    color: #6c757d;
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
}

.three-dots-btn:hover {
    background-color: #f8f9fa;
    color: #495057;
}

.three-dots-btn.small {
    width: 24px;
    height: 24px;
    padding: 0.125rem;
}

.dropdown-menu-custom {
    position: absolute;
    top: 100%;
    right: 0;
    background: white;
    border: 1px solid #dee2e6;
    border-radius: 0.375rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    min-width: 150px;
    padding: 0.25rem 0;
}

.dropdown-item-custom {
    background: none;
    border: none;
    width: 100%;
    padding: 0.5rem 1rem;
    text-align: left;
    cursor: pointer;
    transition: background-color 0.2s ease;
    display: flex;
    align-items: center;
    font-size: 0.875rem;
}

.dropdown-item-custom:hover {
    background-color: #f8f9fa;
}

.dropdown-item-custom.text-danger {
    color: #dc3545;
}

.dropdown-item-custom.text-danger:hover {
    background-color: #f8d7da;
}

.category-btn {
    background-color: #f8f9fa;
    border: 2px solid #dee2e6;
    color: #6c757d;
    transition: all 0.3s ease;
}

.category-btn:hover {
    background-color: #e9ecef;
    border-color: #adb5bd;
}

.category-btn.active {
    background-color: #DC2626;
    border-color: #DC2626;
    color: white;
}

.nav-tabs .nav-link {
    background: none;
    border: none;
    color: #6c757d;
    cursor: pointer;
    padding: 0.75rem 1rem;
    border-bottom: 2px solid transparent;
    transition: all 0.3s ease;
}

.nav-tabs .nav-link:hover {
    color: #DC2626;
    border-bottom-color: #DC2626;
}

.nav-tabs .nav-link.active {
    color: #DC2626;
    border-bottom-color: #DC2626;
    font-weight: 600;
}

.category-badge {
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
}

.category-badge.pengalaman {
    background-color: #28a745;
    color: white;
}

.category-badge.pertanyaan {
    background-color: #17a2b8;
    color: white;
}

.action-buttons {
    display: flex;
    align-items: center;
    margin-top: 28px;
}

.btn-add-post {
    background-color: #000000;
    color: white;
    border: none;
    padding: 0.6rem 1.2rem;
    border-radius: 0.375rem;
    display: flex;
    gap: 0.5rem;
}

.post-card {
    background: white;
    border: 1px solid #e9ecef;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    transition: box-shadow 0.3s ease;
}

.post-card:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.post-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
}

.avatar {
    width: 40px;
    height: 40px;
    background-color: #6c757d;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
}

.small-avatar {
    width: 32px;
    height: 32px;
}

.time-stamp {
    color: #6c757d;
    font-size: 0.875rem;
}

.post-content {
    margin-bottom: 1rem;
}

.post-actions {
    display: flex;
    align-items: center;
    padding-top: 0.75rem;
    border-top: 1px solid #e9ecef;
}

.action-btn {
    background: none;
    border: none;
    color: #6c757d;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: color 0.3s ease;
}

.action-btn:hover {
    color: #007bff;
}

.comment-section {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #e9ecef;
}

.comment-item {
    margin-bottom: 0.75rem;
    padding: 0.5rem;
    background-color: #f8f9fa;
    border-radius: 0.375rem;
}

.comment-author {
    font-size: 0.875rem;
    font-weight: 600;
}

.comment-text {
    font-size: 0.875rem;
    margin: 0;
}

.loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem 0;
    min-height: 200px;
}

.spinner {
    width: 48px;
    height: 48px;
    border: 4px solid rgba(220, 38, 38, 0.1);
    border-left-color: #DC2626;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
}

.loading-text {
    color: #6c757d;
    font-size: 0.95rem;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
</style>