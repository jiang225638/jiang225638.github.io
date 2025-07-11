<template>
  <div class="lyrics-display">
    <div class="lyrics-header">
      <h3>歌词</h3>
      <div class="lyrics-controls">
        <button
          class="control-btn"
          :class="{ active: showTranslation }"
          @click="toggleTranslation"
          v-if="hasTranslation"
        >
          译
        </button>
        <button class="control-btn" @click="scrollToCurrentLyric">
          <svg width="16" height="16" viewBox="0 0 24 24">
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            />
          </svg>
        </button>
      </div>
    </div>

    <div ref="lyricsContainer" class="lyrics-content" @scroll="onScroll">
      <div
        class="lyrics-scroll"
        :style="{ transform: `translateY(${scrollOffset}px)` }"
      >
        <div
          v-for="(line, index) in processedLyrics"
          :key="index"
          class="lyric-line"
          :class="{
            current: index === currentLineIndex,
            passed: index < currentLineIndex,
            future: index > currentLineIndex
          }"
          @click="seekToLine(line)"
        >
          <div class="lyric-text">{{ line.text }}</div>
          <div
            v-if="showTranslation && line.translation"
            class="lyric-translation"
          >
            {{ line.translation }}
          </div>
        </div>

        <!-- 空状态 -->
        <div v-if="processedLyrics.length === 0" class="lyrics-empty">
          <div class="empty-icon">
            <svg width="48" height="48" viewBox="0 0 24 24">
              <path
                d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"
              />
            </svg>
          </div>
          <p>暂无歌词</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted } from 'vue'

interface LyricLine {
  time: number
  text: string
  translation?: string
}

interface Props {
  lyrics: LyricLine[]
  currentTime: number
}

interface Emits {
  (e: 'seek', time: number): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const lyricsContainer = ref<HTMLElement | null>(null)
const showTranslation = ref(false)
const isUserScrolling = ref(false)
const scrollTimeout = ref<number | null>(null)
const scrollOffset = ref(0)

// 处理后的歌词（添加默认的开始行）
const processedLyrics = computed(() => {
  if (!props.lyrics || props.lyrics.length === 0) return []

  const lyrics = [...props.lyrics]

  // 如果第一行不是从0开始，添加一个默认开始行
  if (lyrics[0] && lyrics[0].time > 0) {
    lyrics.unshift({
      time: 0,
      text: '♪ 音乐开始 ♪',
      translation: ''
    })
  }

  return lyrics
})

// 当前歌词行索引
const currentLineIndex = computed(() => {
  if (!processedLyrics.value.length) return -1

  for (let i = processedLyrics.value.length - 1; i >= 0; i--) {
    if (props.currentTime >= processedLyrics.value[i].time) {
      return i
    }
  }

  return 0
})

// 是否有翻译
const hasTranslation = computed(() => {
  return processedLyrics.value.some((line) => line.translation)
})

const toggleTranslation = () => {
  showTranslation.value = !showTranslation.value
}

const seekToLine = (line: LyricLine) => {
  emit('seek', line.time)
}

const scrollToCurrentLyric = () => {
  if (!lyricsContainer.value || currentLineIndex.value === -1) return

  const container = lyricsContainer.value
  const lineHeight = 80 // 估算的行高
  const containerHeight = container.clientHeight
  const targetScrollTop =
    currentLineIndex.value * lineHeight - containerHeight / 2

  container.scrollTo({
    top: Math.max(0, targetScrollTop),
    behavior: 'smooth'
  })
}

const onScroll = () => {
  isUserScrolling.value = true

  if (scrollTimeout.value) {
    clearTimeout(scrollTimeout.value)
  }

  scrollTimeout.value = setTimeout(() => {
    isUserScrolling.value = false
  }, 2000) as unknown as number
}

// 自动滚动到当前歌词
watch(
  currentLineIndex,
  async (newIndex) => {
    if (isUserScrolling.value || newIndex === -1) return

    await nextTick()
    scrollToCurrentLyric()
  },
  { immediate: true }
)

// 监听歌词变化，重置滚动状态
watch(
  () => props.lyrics,
  () => {
    isUserScrolling.value = false
    scrollOffset.value = 0
  },
  { immediate: true }
)

onMounted(() => {
  // 初始化时滚动到当前歌词
  if (currentLineIndex.value > 0) {
    scrollToCurrentLyric()
  }
})
</script>

<style scoped>
.lyrics-display {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  overflow: hidden;
}

.lyrics-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.9);
}

.lyrics-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.lyrics-controls {
  display: flex;
  gap: 8px;
}

.control-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  color: #666;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  font-size: 14px;
  font-weight: 500;
}

.control-btn:hover {
  background: rgba(0, 0, 0, 0.1);
  color: #333;
}

.control-btn.active {
  background: #e74c3c;
  color: white;
}

.lyrics-content {
  flex: 1;
  overflow-y: auto;
  position: relative;
  padding: 20px 0;
}

.lyrics-content::-webkit-scrollbar {
  width: 6px;
}

.lyrics-content::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
}

.lyrics-content::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 3px;
}

.lyrics-scroll {
  transition: transform 0.3s ease;
}

.lyric-line {
  padding: 12px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 8px;
  margin: 4px 8px;
  text-align: center;
  min-height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.lyric-line:hover {
  background: rgba(0, 0, 0, 0.05);
}

.lyric-line.current {
  background: rgba(231, 76, 60, 0.1);
  transform: scale(1.02);
}

.lyric-line.current .lyric-text {
  color: #e74c3c;
  font-weight: 600;
  font-size: 18px;
}

.lyric-line.passed .lyric-text {
  color: #999;
  opacity: 0.6;
}

.lyric-line.future .lyric-text {
  color: #666;
  opacity: 0.8;
}

.lyric-text {
  font-size: 16px;
  line-height: 1.5;
  color: #333;
  transition: all 0.3s ease;
  margin-bottom: 4px;
}

.lyric-translation {
  font-size: 14px;
  color: #999;
  line-height: 1.4;
  margin-top: 4px;
}

.lyric-line.current .lyric-translation {
  color: rgba(231, 76, 60, 0.8);
}

.lyrics-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: #999;
}

.empty-icon {
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty-icon svg {
  fill: currentColor;
}

.lyrics-empty p {
  margin: 0;
  font-size: 16px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .lyric-line {
    padding: 8px 16px;
    min-height: 50px;
  }

  .lyric-text {
    font-size: 14px;
  }

  .lyric-line.current .lyric-text {
    font-size: 16px;
  }

  .lyric-translation {
    font-size: 12px;
  }
}
</style>
