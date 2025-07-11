<template>
  <div class="music-player-page">
    <div class="page-header">
      <h1>🎵 音乐播放器</h1>
    </div>

    <div class="player-container">
      <MusicPlayer />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import MusicPlayer from './MusicPlayer/MusicPlayer.vue'
import { useMusicStore } from '../composables/useMusicStore'

const musicStore = useMusicStore()

onMounted(() => {
  // 初始化音乐播放器状态
  musicStore.init()
})
</script>

<style scoped>
.music-player-page {
  min-height: 100vh;
  background: url('/img/bg/15.webp') no-repeat center center;
  padding: 20px;
}

.page-header {
  text-align: center;
  color: white;
  margin-bottom: 30px;
  padding: 40px 20px;
}

.page-header h1 {
  font-size: 3rem;
  font-weight: 700;
  margin: 0 0 16px 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.page-header p {
  font-size: 1.2rem;
  opacity: 0.9;
  margin: 0;
}

.player-container {
  max-width: 1200px;
  margin: 0 auto;
  height: 600px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 60px;
}

.page-footer {
  max-width: 1200px;
  margin: 0 auto;
  color: white;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-bottom: 50px;
}

.feature-item {
  text-align: center;
  background: rgba(255, 255, 255, 0.1);
  padding: 30px 20px;
  border-radius: 12px;
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease;
}

.feature-item:hover {
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 16px;
}

.feature-item h3 {
  font-size: 1.3rem;
  margin: 0 0 12px 0;
  color: white;
}

.feature-item p {
  font-size: 1rem;
  margin: 0;
  opacity: 0.9;
  line-height: 1.6;
}

.disclaimer {
  background: rgba(255, 255, 255, 0.1);
  padding: 30px;
  border-radius: 12px;
  backdrop-filter: blur(10px);
  text-align: center;
}

.disclaimer h3 {
  font-size: 1.3rem;
  margin: 0 0 16px 0;
  color: white;
}

.disclaimer p {
  margin: 0 0 12px 0;
  opacity: 0.9;
  line-height: 1.6;
  font-size: 0.95rem;
}

.disclaimer p:last-child {
  margin-bottom: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .music-player-page {
    padding: 10px;
  }

  .page-header {
    padding: 20px 10px;
  }

  .page-header h1 {
    font-size: 2rem;
  }

  .page-header p {
    font-size: 1rem;
  }

  .player-container {
    height: 500px;
    margin-bottom: 40px;
  }

  .features {
    grid-template-columns: 1fr;
    gap: 20px;
    margin-bottom: 30px;
  }

  .feature-item {
    padding: 20px 16px;
  }

  .disclaimer {
    padding: 20px;
  }
}

@media (max-width: 480px) {
  .page-header h1 {
    font-size: 1.8rem;
  }

  .player-container {
    height: 450px;
    border-radius: 12px;
  }

  .feature-icon {
    font-size: 2.5rem;
  }

  .feature-item h3 {
    font-size: 1.1rem;
  }

  .feature-item p {
    font-size: 0.9rem;
  }
}
</style>
