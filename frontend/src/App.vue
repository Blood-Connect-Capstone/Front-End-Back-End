<script setup>
import { ref } from 'vue';

const isChatbotOpen = ref(false);

function toggleChatbot() {
  isChatbotOpen.value = !isChatbotOpen.value;
}

function closeChatbot() {
  isChatbotOpen.value = false;
}
</script>

<template>
  <main>
    <router-view></router-view>
  </main>

  <button id="chatbot-toggle" @click="toggleChatbot" :class="{ 'active': isChatbotOpen }">
    <img v-if="!isChatbotOpen" style="width: 24px;"
      src="https://img.icons8.com/?size=100&id=4aUvAATdDLe5&format=png&color=FFFFFF" alt="Chat">
    <img v-else style="width: 24px;" src="https://img.icons8.com/?size=100&id=79023&format=png&color=FFFFFF" />
  </button>

  <div v-if="isChatbotOpen" class="chatbot-modal" @click.self="closeChatbot">
    <div class="chatbot-container">
      <div class="chatbot-header">
        <div class="header-info">
          <div class="d-flex align-items-center gap-2">
            <div class="avatar">
              <img src="https://img.icons8.com/?size=100&id=4aUvAATdDLe5&format=png&color=dc2626" alt="BloodConnect Bot"
                style="width: 25px; height: 25px;">
            </div>
            <div>
              <h3>BloodConnect Assistant</h3>
            </div>
          </div>
          <div @click="closeChatbot" style="cursor: pointer;">
            <img style="width: 20px;" src="https://img.icons8.com/?size=100&id=79023&format=png&color=FFFFFF" />
          </div>
        </div>
      </div>

      <div class="iframe-container">
        <iframe v-if="isChatbotOpen" src="https://geraldalivia-bloodconnect-bot.hf.space" frameborder="0" width="100%"
          height="100%" class="chatbot-iframe" :class="{ 'loading': isLoading }"></iframe>
      </div>
    </div>
  </div>
</template>

<style scoped>
#chatbot-toggle {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  background: #DC2626;
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s ease;
}

#chatbot-toggle:hover {
  transform: scale(1.1);
}

#chatbot-toggle.active {
  transform: rotate(90deg);
}

.chatbot-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
}

.chatbot-container {
  position: fixed;
  bottom: 80px;
  right: 20px;
  background: white;
  border-radius: 12px;
  width: 400px;
  height: 600px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.chatbot-header {
  background: #DC2626;
  color: white;
  padding: 20px;
}

.header-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.avatar {
  width: 40px;
  height: 40px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-info h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.iframe-container {
  flex: 1;
  position: relative;
  background: #f5f5f5;
}

.chatbot-iframe {
  width: 100%;
  height: 100%;
  border: none;
}

@media (max-width: 768px) {
  .chatbot-modal {
    background-color: rgba(0, 0, 0, 0.3);
  }

  .chatbot-container {
    width: 100%;
    max-width: 350px;
    height: 600px;
    right: 20px;
    bottom: 35px;
  }

  #chatbot-toggle {
    bottom: 20px;
    right: 20px;
    width: 56px;
    height: 56px;
  }

  .chatbot-header {
    padding: 15px;
  }

  .header-info h3 {
    font-size: 16px;
  }

  .status {
    font-size: 12px;
  }

  .chatbot-footer {
    padding: 10px;
  }

  .chatbot-footer p {
    font-size: 11px;
  }
}
</style>