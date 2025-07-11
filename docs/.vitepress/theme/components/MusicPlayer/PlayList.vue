<template>
  <div class="playlist">
    <div class="playlist-header">
      <h3>播放列表 ({{ songs.length }})</h3>
      <div class="playlist-actions">
        <button class="action-btn" @click="clearAll" v-if="songs.length > 0">
          清空列表
        </button>
      </div>
    </div>

    <div class="playlist-content" v-if="songs.length > 0">
      <div class="playlist-scroll">
        <div
          v-for="(song, index) in songs"
          :key="song.id || index"
          class="song-item"
          :class="{
            current: index === currentIndex,
            playing: index === currentIndex && isPlaying
          }"
          @dblclick="$emit('play', index)"
        >
          <div class="song-index">
            <span v-if="index !== currentIndex">{{
              String(index + 1).padStart(2, '0')
            }}</span>
            <div v-else class="playing-indicator">
              <div class="wave-bar" :class="{ active: isPlaying }"></div>
              <div class="wave-bar" :class="{ active: isPlaying }"></div>
              <div class="wave-bar" :class="{ active: isPlaying }"></div>
            </div>
          </div>

          <div class="song-cover">
            <img
              :src="song.albumCover || '/nonexistent-image.jpg'"
              :alt="song.name"
              @error="handleImageError"
            />
          </div>

          <div class="song-info">
            <div class="song-name" :title="song.name">{{ song.name }}</div>
            <div class="song-artist" :title="song.artist">{{
              song.artist
            }}</div>
          </div>

          <div class="song-duration">
            {{ formatTime(song.duration || 0) }}
          </div>

          <div class="song-actions">
            <button
              class="action-btn play-btn"
              @click="$emit('play', index)"
              :title="index === currentIndex ? '正在播放' : '播放'"
            >
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>

            <button
              class="action-btn remove-btn"
              @click="$emit('remove', index)"
              title="移除"
            >
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path
                  d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="playlist-empty" v-else>
      <div class="empty-icon">
        <svg width="64" height="64" viewBox="0 0 24 24">
          <path
            d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"
          />
        </svg>
      </div>
      <p>播放列表为空</p>
      <p class="empty-tip">添加一些音乐来开始播放吧</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Song {
  id: string | number
  name: string
  artist: string
  albumCover?: string
  duration?: number
  url?: string
}

interface Props {
  songs: Song[]
  currentIndex: number
  isPlaying?: boolean
}

interface Emits {
  (e: 'play', index: number): void
  (e: 'remove', index: number): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const formatTime = (seconds: number): string => {
  if (!seconds || isNaN(seconds)) return '00:00'

  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)

  return `${String(minutes).padStart(2, '0')}:${String(
    remainingSeconds
  ).padStart(2, '0')}`
}

const clearAll = () => {
  // 从后往前删除，避免索引变化问题
  for (let i = props.songs.length - 1; i >= 0; i--) {
    emit('remove', i)
  }
}

// 图片加载失败处理 - 隐藏图片显示天蓝色背景
const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.style.display = 'none'
  const parent = img.parentElement
  if (parent) {
    parent.classList.add('no-cover')
  }
}
</script>

<style scoped>
.playlist {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  overflow: hidden;
}

.playlist-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.9);
}

.playlist-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.playlist-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  padding: 6px 12px;
  border: none;
  background: transparent;
  color: #666;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background: rgba(0, 0, 0, 0.1);
  color: #333;
}

.playlist-content {
  flex: 1;
  overflow: hidden;
}

.playlist-scroll {
  height: 100%;
  overflow-y: auto;
  padding: 8px 0;
}

.playlist-scroll::-webkit-scrollbar {
  width: 6px;
}

.playlist-scroll::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
}

.playlist-scroll::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 3px;
}

.song-item {
  display: flex;
  align-items: center;
  padding: 8px 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 4px;
  margin: 0 8px;
}

.song-item:hover {
  background: rgba(0, 0, 0, 0.05);
}

.song-item.current {
  background: rgba(231, 76, 60, 0.1);
  color: #e74c3c;
}

.song-item.current .song-name {
  color: #e74c3c;
  font-weight: 500;
}

.song-index {
  width: 32px;
  text-align: center;
  font-size: 12px;
  color: #999;
  flex-shrink: 0;
}

.playing-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  height: 16px;
}

.wave-bar {
  width: 3px;
  height: 12px;
  background: #e74c3c;
  border-radius: 1.5px;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  opacity: 0.3;
}

.wave-bar.active {
  opacity: 1;
}

.wave-bar:nth-child(1).active {
  animation-name: wave1;
}

.wave-bar:nth-child(2).active {
  animation-name: wave2;
  animation-delay: 0.2s;
}

.wave-bar:nth-child(3).active {
  animation-name: wave3;
  animation-delay: 0.4s;
}

@keyframes wave1 {
  0% {
    height: 6px;
  }
  100% {
    height: 16px;
  }
}

@keyframes wave2 {
  0% {
    height: 4px;
  }
  100% {
    height: 12px;
  }
}

@keyframes wave3 {
  0% {
    height: 8px;
  }
  100% {
    height: 14px;
  }
}

.song-cover {
  width: 40px;
  height: 40px;
  margin: 0 12px;
  border-radius: 4px;
  overflow: hidden;
  flex-shrink: 0;
}

.song-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 无封面时的天蓝色背景 */
.song-cover.no-cover {
  background: linear-gradient(135deg, #87ceeb 0%, #4682b4 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.song-cover.no-cover::before {
  content: '♪';
  font-size: 1.5rem;
  color: white;
  opacity: 0.8;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
}

.song-info {
  flex: 1;
  min-width: 0;
  margin-right: 12px;
}

.song-name {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.song-artist {
  font-size: 12px;
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.song-duration {
  font-size: 12px;
  color: #999;
  margin-right: 12px;
  flex-shrink: 0;
  width: 40px;
  text-align: right;
}

.song-actions {
  display: flex;
  gap: 4px;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.song-item:hover .song-actions {
  opacity: 1;
}

.song-item.current .song-actions {
  opacity: 1;
}

.song-actions .action-btn {
  width: 28px;
  height: 28px;
  padding: 0;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.play-btn {
  color: #e74c3c;
}

.remove-btn {
  color: #999;
}

.remove-btn:hover {
  color: #e74c3c;
  background: rgba(231, 76, 60, 0.1);
}

.playlist-empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #999;
  text-align: center;
  padding: 40px 20px;
}

.empty-icon {
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty-icon svg {
  fill: currentColor;
}

.playlist-empty p {
  margin: 0 0 8px 0;
  font-size: 16px;
}

.empty-tip {
  font-size: 14px;
  opacity: 0.7;
}
</style>
