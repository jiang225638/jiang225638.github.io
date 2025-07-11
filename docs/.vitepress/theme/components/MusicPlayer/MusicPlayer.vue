<template>
  <div class="music-player-container">
    <!-- 主播放器界面 -->
    <div v-if="!isMiniMode" class="music-player">
      <!-- 头部导航 -->
      <div class="player-header">
        <div class="header-nav">
          <button
            class="nav-btn"
            :class="{ active: activeTab === 'playlist' }"
            @click="setActiveTab('playlist')"
          >
            播放列表
          </button>
          <button
            class="nav-btn"
            :class="{ active: activeTab === 'lyrics' }"
            @click="setActiveTab('lyrics')"
          >
            歌词
          </button>
          <button
            class="nav-btn"
            :class="{ active: activeTab === 'search' }"
            @click="setActiveTab('search')"
          >
            搜索
          </button>
        </div>
        <button class="mini-btn" @click="toggleMiniMode">
          <svg width="16" height="16" viewBox="0 0 16 16">
            <path d="M3 5h10v1H3V5zm0 3h10v1H3V8zm0 3h7v1H3v-1z" />
          </svg>
        </button>
      </div>

      <!-- 主内容区域 -->
      <div class="player-content">
        <!-- 左侧：封面和歌曲信息 -->
        <div class="song-info-section">
          <div class="album-cover">
            <img
              :src="currentSongInfo.albumCover || '/nonexistent-image.jpg'"
              :alt="currentSongInfo.name"
              :class="{ rotating: isPlaying }"
              @error="handleImageError"
            />
            <div class="cover-overlay" v-if="!isPlaying">
              <button class="play-btn" @click="togglePlay">
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>
          </div>
          <div class="song-details">
            <h3 class="song-name">{{ currentSongInfo.name || '暂无播放' }}</h3>
            <p class="artist-name">{{
              currentSongInfo.artist || '未知艺术家'
            }}</p>
          </div>
        </div>

        <!-- 右侧：内容区域 -->
        <div class="content-area">
          <!-- 播放列表 -->
          <div v-if="activeTab === 'playlist'" class="playlist-panel">
            <PlayList
              :songs="playlist"
              :currentIndex="currentIndex"
              :isPlaying="isPlaying"
              @play="playSong"
              @remove="removeSong"
            />
          </div>

          <!-- 歌词面板 -->
          <div v-if="activeTab === 'lyrics'" class="lyrics-panel">
            <LyricsDisplay
              :lyrics="currentLyrics"
              :currentTime="currentTime"
              @seek="seekTo"
            />
          </div>

          <!-- 搜索面板 -->
          <div v-if="activeTab === 'search'" class="search-panel">
            <MusicSearch @add-to-playlist="addToPlaylist" @play-now="playNow" />
          </div>
        </div>
      </div>

      <!-- 底部控制栏 -->
      <div class="player-controls">
        <!-- 播放控制按钮 -->
        <div class="control-buttons">
          <button class="control-btn" @click="playPrevious">
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
            </svg>
          </button>
          <button class="control-btn main-play-btn" @click="togglePlay">
            <svg v-if="!isPlaying" width="24" height="24" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            <svg v-else width="24" height="24" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          </button>
          <button class="control-btn" @click="playNext">
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
            </svg>
          </button>
        </div>

        <!-- 进度条 -->
        <div class="progress-section">
          <span class="time-display">{{ formatTime(currentTime) }}</span>
          <ProgressBar
            :current="currentTime"
            :duration="duration"
            @seek="seekTo"
          />
          <span class="time-display">{{ formatTime(duration) }}</span>
        </div>

        <!-- 右侧控制 -->
        <div class="right-controls">
          <button class="control-btn" @click="togglePlayMode">
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path
                d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"
              />
            </svg>
          </button>
          <VolumeControl :volume="volume" @volume-change="setVolume" />
          <button class="control-btn" @click="toggleMiniMode">
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path d="M19 13H5v-2h14v2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mini模式播放器 -->
    <div v-if="isMiniMode" class="mini-player">
      <div class="mini-song-info">
        <img
          :src="currentSongInfo.albumCover || '/nonexistent-image.jpg'"
          class="mini-cover"
          @error="handleImageError"
        />
        <div class="mini-details">
          <span class="mini-song-name">{{ currentSongInfo.name }}</span>
          <span class="mini-artist">{{ currentSongInfo.artist }}</span>
        </div>
      </div>
      <div class="mini-controls">
        <button @click="playPrevious" title="上一首">
          <svg width="16" height="16" viewBox="0 0 24 24">
            <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
          </svg>
        </button>
        <button @click="togglePlay" :title="isPlaying ? '暂停' : '播放'">
          <svg v-if="!isPlaying" width="18" height="18" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
          <svg v-else width="18" height="18" viewBox="0 0 24 24">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>
        </button>
        <button @click="playNext" title="下一首">
          <svg width="16" height="16" viewBox="0 0 24 24">
            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
          </svg>
        </button>
        <button @click="toggleMiniMode" title="展开播放器">
          <svg width="16" height="16" viewBox="0 0 24 24">
            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
          </svg>
        </button>
      </div>
    </div>

    <!-- 音频元素 -->
    <audio
      ref="audioElement"
      @timeupdate="onTimeUpdate"
      @loadedmetadata="onLoadedMetadata"
      @ended="onSongEnded"
      @error="onAudioError"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted, watch } from 'vue'
import PlayList from './PlayList.vue'
import LyricsDisplay from './LyricsDisplay.vue'
import MusicSearch from './MusicSearch.vue'
import ProgressBar from './ProgressBar.vue'
import VolumeControl from './VolumeControl.vue'
import { useMusicStore } from '../../composables/useMusicStore'
import { formatTime } from '../../utils/timeUtils'
import { getAllSongs } from '../../api/musicApi'

// 音乐播放器状态
const musicStore = useMusicStore()

const audioElement = ref<HTMLAudioElement | null>(null)
const isMiniMode = ref(false)
const activeTab = ref('playlist')

// 播放状态
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const volume = ref(0.8)

// 当前歌曲信息 - 计算属性，确保类型安全
const currentSongInfo = computed(() => {
  const song = musicStore.currentSong.value
  return {
    id: song?.id || '',
    name: song?.name || '',
    artist: song?.artist || '',
    albumCover: song?.albumCover || '/img/music-default.png',
    url: song?.url || ''
  }
})

const currentIndex = computed(() => musicStore.state.currentIndex)
const playlist = computed(() => musicStore.state.playlist)
const currentLyrics = computed(() => musicStore.state.currentLyrics)

// 播放控制方法
const togglePlay = async () => {
  if (!audioElement.value || !currentSongInfo.value.url) return

  try {
    if (isPlaying.value) {
      audioElement.value.pause()
      isPlaying.value = false
    } else {
      await audioElement.value.play()
      isPlaying.value = true
    }
  } catch (error) {
    console.error('播放失败:', error)
  }
}

const playSong = async (index: number) => {
  await musicStore.playByIndex(index)
  if (audioElement.value && currentSongInfo.value.url) {
    audioElement.value.src = currentSongInfo.value.url
    audioElement.value.load()
  }
}

const playPrevious = () => {
  musicStore.playPrevious()
}

const playNext = () => {
  musicStore.playNext()
}

const seekTo = (time: number) => {
  if (audioElement.value) {
    audioElement.value.currentTime = time
    currentTime.value = time
  }
}

const setVolume = (vol: number) => {
  volume.value = vol
  if (audioElement.value) {
    audioElement.value.volume = vol
  }
}

const addToPlaylist = (song: any) => {
  musicStore.addToPlaylist(song)
}

const playNow = (song: any) => {
  musicStore.playNow(song)
}

const removeSong = (index: number) => {
  musicStore.removeSong(index)
}

const togglePlayMode = () => {
  musicStore.togglePlayMode()
}

const toggleMiniMode = () => {
  isMiniMode.value = !isMiniMode.value
}

const setActiveTab = (tab: string) => {
  activeTab.value = tab
}

// 音频事件处理
const onTimeUpdate = () => {
  if (audioElement.value) {
    currentTime.value = audioElement.value.currentTime
  }
}

const onLoadedMetadata = () => {
  if (audioElement.value) {
    duration.value = audioElement.value.duration
  }
}

const onSongEnded = () => {
  isPlaying.value = false
  musicStore.playNext()
}

const onAudioError = (error: Event) => {
  console.error('音频播放错误:', error)
  isPlaying.value = false
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

// 监听当前歌曲变化
watch(
  () => currentSongInfo.value,
  async (newSong) => {
    if (newSong.url && audioElement.value) {
      audioElement.value.src = newSong.url
      audioElement.value.load()
      if (isPlaying.value) {
        try {
          await audioElement.value.play()
        } catch (error) {
          console.error('自动播放失败:', error)
          isPlaying.value = false
        }
      }
    }
  }
)

onMounted(async () => {
  if (audioElement.value) {
    audioElement.value.volume = volume.value
  }

  // 自动加载所有本地音乐到播放列表
  try {
    const allSongs = await getAllSongs()
    if (allSongs.length > 0) {
      musicStore.addToPlaylist(allSongs)
      console.log(`已自动加载 ${allSongs.length} 首音乐到播放列表`)
    }
  } catch (error) {
    console.error('加载音乐库失败:', error)
  }
})
</script>

<style scoped>
.music-player-container {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.music-player {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
}

.player-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.header-nav {
  display: flex;
  gap: 8px;
}

.nav-btn {
  padding: 8px 16px;
  border: none;
  background: transparent;
  color: #666;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-btn.active {
  background: #e74c3c;
  color: white;
}

.nav-btn:hover {
  background: rgba(231, 76, 60, 0.1);
}

.mini-btn {
  padding: 8px;
  border: none;
  background: transparent;
  color: #666;
  border-radius: 4px;
  cursor: pointer;
}

.player-content {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.song-info-section {
  width: 280px;
  padding: 20px;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.album-cover {
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.album-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.album-cover img.rotating {
  animation: rotate 20s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 无封面时的天蓝色背景 */
.album-cover.no-cover {
  background: linear-gradient(135deg, #87ceeb 0%, #4682b4 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.album-cover.no-cover::before {
  content: '🎵';
  font-size: 4rem;
  color: white;
  opacity: 0.8;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.cover-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.album-cover:hover .cover-overlay {
  opacity: 1;
}

.play-btn {
  width: 60px;
  height: 60px;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #e74c3c;
}

.song-details {
  text-align: center;
}

.song-name {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0 0 8px 0;
}

.artist-name {
  font-size: 14px;
  color: #666;
  margin: 0;
}

.content-area {
  flex: 1;
  overflow: hidden;
}

.playlist-panel,
.lyrics-panel,
.search-panel {
  height: 100%;
  padding: 20px;
}

.player-controls {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.8);
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  gap: 20px;
}

.control-buttons {
  display: flex;
  align-items: center;
  gap: 12px;
}

.control-btn {
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  transition: all 0.3s ease;
}

.control-btn:hover {
  background: rgba(0, 0, 0, 0.1);
}

.main-play-btn {
  width: 48px;
  height: 48px;
  background: #e74c3c;
  color: white;
}

.main-play-btn:hover {
  background: #c0392b;
}

.progress-section {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
}

.time-display {
  font-size: 12px;
  color: #666;
  min-width: 40px;
  text-align: center;
}

.right-controls {
  display: flex;
  align-items: center;
  gap: 12px;
}

.mini-player {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  min-height: 80px;
}

.mini-song-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.mini-cover {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  object-fit: cover;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

/* 迷你播放器无封面时的天蓝色背景 */
.mini-song-info .no-cover {
  background: linear-gradient(135deg, #87ceeb 0%, #4682b4 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.mini-song-info .no-cover::before {
  content: '♪';
  font-size: 1.2rem;
  color: white;
  opacity: 0.8;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
}

.mini-details {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-width: 0;
}

.mini-song-name {
  font-size: 15px;
  font-weight: 600;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mini-artist {
  font-size: 13px;
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mini-controls {
  display: flex;
  gap: 12px;
  align-items: center;
}

.mini-controls button {
  width: 36px;
  height: 36px;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 50%;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  transition: all 0.2s ease;
}

.mini-controls button:hover {
  background: rgba(0, 0, 0, 0.1);
  transform: scale(1.1);
}

.mini-controls button:nth-child(2) {
  background: #e74c3c;
  color: white;
}

.mini-controls button:nth-child(2):hover {
  background: #c0392b;
}
</style>
