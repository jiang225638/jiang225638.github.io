<template>
  <div class="music-search">
    <div class="search-header">
      <h3>搜索音乐</h3>
    </div>

    <div class="search-input-wrapper">
      <div class="search-input">
        <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24">
          <path
            d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
          />
        </svg>
        <input
          v-model="searchQuery"
          @keyup.enter="search"
          placeholder="搜索歌曲、歌手..."
          class="search-field"
        />
        <button v-if="searchQuery" @click="clearSearch" class="clear-btn">
          <svg width="16" height="16" viewBox="0 0 24 24">
            <path
              d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
            />
          </svg>
        </button>
      </div>
      <button
        @click="search"
        :disabled="!searchQuery.trim() || isLoading"
        class="search-btn"
      >
        {{ isLoading ? '搜索中...' : '搜索' }}
      </button>
    </div>

    <!-- 热门搜索 -->
    <div v-if="!hasSearched && hotKeywords.length > 0" class="hot-search">
      <h4>热门搜索</h4>
      <div class="hot-keywords">
        <button
          v-for="keyword in hotKeywords"
          :key="keyword"
          @click="searchKeyword(keyword)"
          class="hot-keyword"
        >
          {{ keyword }}
        </button>
      </div>
    </div>

    <!-- 搜索历史 -->
    <div v-if="!hasSearched && searchHistory.length > 0" class="search-history">
      <div class="history-header">
        <h4>搜索历史</h4>
        <button @click="clearHistory" class="clear-history-btn">清空</button>
      </div>
      <div class="history-list">
        <div
          v-for="(item, index) in searchHistory"
          :key="index"
          @click="searchKeyword(item)"
          class="history-item"
        >
          <svg class="history-icon" width="14" height="14" viewBox="0 0 24 24">
            <path
              d="M13,3A9,9 0 0,0 4,12H1L4.89,15.89L4.96,16.03L9,12H6A7,7 0 0,1 13,5A7,7 0 0,1 20,12A7,7 0 0,1 13,19C11.07,19 9.32,18.21 8.06,16.94L6.64,18.36C8.27,20 10.5,21 13,21A9,9 0 0,0 22,12A9,9 0 0,0 13,3Z"
            />
          </svg>
          <span>{{ item }}</span>
          <button
            @click.stop="removeHistoryItem(index)"
            class="remove-history-btn"
          >
            <svg width="12" height="12" viewBox="0 0 24 24">
              <path
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- 搜索结果 -->
    <div v-if="hasSearched" class="search-results">
      <div class="results-header">
        <h4>搜索结果 ({{ searchResults.length }})</h4>
        <button @click="backToSearch" class="back-btn">
          <svg width="16" height="16" viewBox="0 0 24 24">
            <path
              d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
            />
          </svg>
          返回
        </button>
      </div>

      <div v-if="isLoading" class="loading">
        <div class="loading-spinner"></div>
        <p>搜索中...</p>
      </div>

      <div v-else-if="searchResults.length > 0" class="results-list">
        <div
          v-for="(song, index) in searchResults"
          :key="song.id"
          class="result-item"
        >
          <div class="song-cover">
            <img
              :src="song.albumCover || '/nonexistent-image.jpg'"
              :alt="song.name"
              @error="handleImageError"
            />
            <div class="cover-overlay">
              <button @click="$emit('play-now', song)" class="play-overlay-btn">
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>
          </div>

          <div class="song-info">
            <div class="song-name" :title="song.name">{{ song.name }}</div>
            <div class="song-artist" :title="song.artist">{{
              song.artist
            }}</div>
            <div class="song-album" :title="song.album">{{ song.album }}</div>
          </div>

          <div class="song-duration">
            {{ formatTime(song.duration) }}
          </div>

          <div class="song-actions">
            <button
              @click="$emit('play-now', song)"
              class="action-btn play-btn"
              title="立即播放"
            >
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
            <button
              @click="$emit('add-to-playlist', song)"
              class="action-btn add-btn"
              title="添加到播放列表"
            >
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div v-else class="no-results">
        <div class="no-results-icon">
          <svg width="48" height="48" viewBox="0 0 24 24">
            <path
              d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
            />
          </svg>
        </div>
        <p>没有找到相关音乐</p>
        <p class="no-results-tip">试试其他关键词吧</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { searchSongs, getHotKeywords } from '../../api/musicApi'

interface Song {
  id: string | number
  name: string
  artist: string
  album: string
  albumCover: string
  duration: number
  url?: string
}

interface Emits {
  (e: 'add-to-playlist', song: Song): void
  (e: 'play-now', song: Song): void
}

const emit = defineEmits<Emits>()

const searchQuery = ref('')
const isLoading = ref(false)
const hasSearched = ref(false)
const searchResults = ref<Song[]>([])
const hotKeywords = ref<string[]>([])
const searchHistory = ref<string[]>([])

const formatTime = (seconds: number): string => {
  if (!seconds || isNaN(seconds)) return '00:00'

  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)

  return `${String(minutes).padStart(2, '0')}:${String(
    remainingSeconds
  ).padStart(2, '0')}`
}

const search = async () => {
  const query = searchQuery.value.trim()
  if (!query) return

  isLoading.value = true
  hasSearched.value = true

  try {
    const results = await searchSongs(query)
    searchResults.value = results

    // 添加到搜索历史
    addToHistory(query)
  } catch (error) {
    console.error('搜索失败:', error)
    searchResults.value = []
  } finally {
    isLoading.value = false
  }
}

const searchKeyword = (keyword: string) => {
  searchQuery.value = keyword
  search()
}

const clearSearch = () => {
  searchQuery.value = ''
}

const backToSearch = () => {
  hasSearched.value = false
  searchResults.value = []
}

const addToHistory = (query: string) => {
  // 移除重复项
  const index = searchHistory.value.indexOf(query)
  if (index > -1) {
    searchHistory.value.splice(index, 1)
  }

  // 添加到开头
  searchHistory.value.unshift(query)

  // 限制历史记录数量
  if (searchHistory.value.length > 10) {
    searchHistory.value = searchHistory.value.slice(0, 10)
  }

  // 保存到本地存储
  localStorage.setItem(
    'music-search-history',
    JSON.stringify(searchHistory.value)
  )
}

const clearHistory = () => {
  searchHistory.value = []
  localStorage.removeItem('music-search-history')
}

const removeHistoryItem = (index: number) => {
  searchHistory.value.splice(index, 1)
  localStorage.setItem(
    'music-search-history',
    JSON.stringify(searchHistory.value)
  )
}

const loadSearchHistory = () => {
  try {
    const history = localStorage.getItem('music-search-history')
    if (history) {
      searchHistory.value = JSON.parse(history)
    }
  } catch (error) {
    console.error('加载搜索历史失败:', error)
  }
}

const loadHotKeywords = async () => {
  try {
    hotKeywords.value = await getHotKeywords()
  } catch (error) {
    console.error('加载热门搜索失败:', error)
    // 设置默认热门搜索
    hotKeywords.value = [
      '周杰伦',
      '邓紫棋',
      '薛之谦',
      '毛不易',
      '李荣浩',
      '张学友',
      '王菲',
      '陈奕迅'
    ]
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

onMounted(() => {
  loadSearchHistory()
  loadHotKeywords()
})
</script>

<style scoped>
.music-search {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  overflow: hidden;
}

.search-header {
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.9);
}

.search-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.search-input-wrapper {
  display: flex;
  gap: 12px;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.search-input {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  padding: 0 12px;
}

.search-icon {
  color: #999;
  margin-right: 8px;
  flex-shrink: 0;
}

.search-field {
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: 14px;
  padding: 8px 0;
  color: #333;
}

.search-field::placeholder {
  color: #999;
}

.clear-btn {
  width: 20px;
  height: 20px;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  margin-left: 8px;
}

.clear-btn:hover {
  background: rgba(0, 0, 0, 0.1);
}

.search-btn {
  padding: 8px 20px;
  border: none;
  background: #e74c3c;
  color: white;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
}

.search-btn:hover:not(:disabled) {
  background: #c0392b;
}

.search-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.hot-search,
.search-history {
  padding: 16px 20px;
}

.hot-search h4,
.search-history h4 {
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 500;
  color: #666;
}

.hot-keywords {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.hot-keyword {
  padding: 6px 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.8);
  border-radius: 16px;
  cursor: pointer;
  font-size: 12px;
  color: #666;
  transition: all 0.2s ease;
}

.hot-keyword:hover {
  border-color: #e74c3c;
  color: #e74c3c;
  background: rgba(231, 76, 60, 0.1);
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.clear-history-btn {
  padding: 4px 8px;
  border: none;
  background: transparent;
  color: #999;
  cursor: pointer;
  font-size: 12px;
  border-radius: 4px;
}

.clear-history-btn:hover {
  background: rgba(0, 0, 0, 0.1);
  color: #666;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.history-item {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.history-item:hover {
  background: rgba(0, 0, 0, 0.05);
}

.history-icon {
  color: #999;
  margin-right: 8px;
  flex-shrink: 0;
}

.history-item span {
  flex: 1;
  font-size: 14px;
  color: #666;
}

.remove-history-btn {
  width: 20px;
  height: 20px;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  opacity: 0;
  transition: all 0.2s ease;
}

.history-item:hover .remove-history-btn {
  opacity: 1;
}

.remove-history-btn:hover {
  background: rgba(231, 76, 60, 0.1);
  color: #e74c3c;
}

.search-results {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.9);
}

.results-header h4 {
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  color: #666;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border: none;
  background: transparent;
  color: #666;
  cursor: pointer;
  border-radius: 4px;
  font-size: 12px;
  transition: all 0.2s ease;
}

.back-btn:hover {
  background: rgba(0, 0, 0, 0.1);
  color: #333;
}

.loading {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #999;
}

.loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-top: 3px solid #e74c3c;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.results-list {
  flex: 1;
  overflow-y: auto;
  padding: 8px 0;
}

.results-list::-webkit-scrollbar {
  width: 6px;
}

.results-list::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
}

.results-list::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 3px;
}

.result-item {
  display: flex;
  align-items: center;
  padding: 8px 20px;
  margin: 0 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.result-item:hover {
  background: rgba(0, 0, 0, 0.05);
}

.song-cover {
  position: relative;
  width: 48px;
  height: 48px;
  border-radius: 6px;
  overflow: hidden;
  margin-right: 12px;
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

.cover-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.result-item:hover .cover-overlay {
  opacity: 1;
}

.play-overlay-btn {
  width: 24px;
  height: 24px;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #e74c3c;
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
  margin-bottom: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.song-album {
  font-size: 11px;
  color: #999;
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

.result-item:hover .song-actions {
  opacity: 1;
}

.action-btn {
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.play-btn {
  color: #e74c3c;
}

.add-btn {
  color: #666;
}

.action-btn:hover {
  background: rgba(0, 0, 0, 0.1);
}

.play-btn:hover {
  background: rgba(231, 76, 60, 0.1);
}

.add-btn:hover {
  background: rgba(0, 0, 0, 0.1);
  color: #333;
}

.no-results {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #999;
  text-align: center;
  padding: 40px 20px;
}

.no-results-icon {
  margin-bottom: 16px;
  opacity: 0.5;
}

.no-results-icon svg {
  fill: currentColor;
}

.no-results p {
  margin: 0 0 8px 0;
  font-size: 16px;
}

.no-results-tip {
  font-size: 14px;
  opacity: 0.7;
}
</style>
