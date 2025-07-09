<template>
  <div class="dynamic-banner-desc">
    <div class="typing-text" :style="{ color: textColor, fontSize: fontSize }">
      <span v-if="isTyping" class="typing-content">{{ displayText }}</span>
      <span v-else class="static-content">{{ displayText }}</span>
      <span v-if="showCursor" class="cursor">|</span>
    </div>
    <div v-if="showRefreshButton" class="refresh-controls">
      <button 
        @click="refreshHitokoto" 
        :disabled="isLoading"
        class="refresh-btn"
        :style="{ color: textColor }"
      >
        <span v-if="isLoading">🔄</span>
        <span v-else>💫</span>
        {{ isLoading ? '获取中...' : '换一句' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { getHitokoto, hitokoto as fallbackHitokoto } from '../utils/quotable'
import { useData } from 'vitepress'

interface Props {
  /** 文字颜色 */
  textColor?: string
  /** 字体大小 */
  fontSize?: string
  /** 是否启用打字机效果 */
  enableTyping?: boolean
  /** 是否显示刷新按钮 */
  showRefreshButton?: boolean
  /** 是否自动获取API数据 */
  autoFetch?: boolean
  /** 打字速度（毫秒） */
  typeSpeed?: number
  /** 删除速度（毫秒） */
  deleteSpeed?: number
  /** 字句间停顿时间（毫秒） */
  pauseTime?: number
}

const props = withDefaults(defineProps<Props>(), {
  textColor: '#ffffff',
  fontSize: '1.4rem',
  enableTyping: true,
  showRefreshButton: true,
  autoFetch: true,
  typeSpeed: 150,
  deleteSpeed: 80,
  pauseTime: 2000
})

const { theme } = useData()

// 状态管理
const displayText = ref('')
const currentQuote = ref(fallbackHitokoto)
const isLoading = ref(false)
const isTyping = ref(false)
const showCursor = ref(true)

// 打字机相关状态
const typeIndex = ref(0)
const isDeleting = ref(false)
const typeTimer = ref<NodeJS.Timeout | null>(null)
const cursorTimer = ref<NodeJS.Timeout | null>(null)

// 计算属性
const isTypingMode = computed(() => props.enableTyping)

// 光标闪烁
const startCursorBlink = () => {
  if (cursorTimer.value) clearInterval(cursorTimer.value)
  cursorTimer.value = setInterval(() => {
    showCursor.value = !showCursor.value
  }, 530)
}

const stopCursorBlink = () => {
  if (cursorTimer.value) {
    clearInterval(cursorTimer.value)
    cursorTimer.value = null
  }
  showCursor.value = true
}

// 打字机效果
const typeWriter = () => {
  if (!isTypingMode.value) {
    displayText.value = currentQuote.value
    return
  }

  isTyping.value = true
  const text = currentQuote.value
  
  if (!isDeleting.value && typeIndex.value <= text.length) {
    // 打字阶段
    displayText.value = text.substring(0, typeIndex.value)
    typeIndex.value++
    
    if (typeIndex.value <= text.length) {
      typeTimer.value = setTimeout(typeWriter, props.typeSpeed)
    } else {
      // 打字完成，开始光标闪烁
      startCursorBlink()
      setTimeout(() => {
        stopCursorBlink()
        isDeleting.value = true
        typeWriter()
      }, props.pauseTime)
    }
  } else if (isDeleting.value && typeIndex.value >= 0) {
    // 删除阶段
    displayText.value = text.substring(0, typeIndex.value)
    typeIndex.value--
    
    if (typeIndex.value >= 0) {
      typeTimer.value = setTimeout(typeWriter, props.deleteSpeed)
    } else {
      // 删除完成，重新开始
      isDeleting.value = false
      setTimeout(typeWriter, 500)
    }
  }
}

// 停止打字机效果
const stopTypeWriter = () => {
  if (typeTimer.value) {
    clearTimeout(typeTimer.value)
    typeTimer.value = null
  }
  stopCursorBlink()
  isTyping.value = false
}

// 启动打字机效果
const startTypeWriter = () => {
  stopTypeWriter()
  typeIndex.value = 0
  isDeleting.value = false
  displayText.value = ''
  typeWriter()
}

// 获取新的一言
const refreshHitokoto = async () => {
  if (isLoading.value) return
  
  isLoading.value = true
  try {
    const newQuote = await getHitokoto()
    currentQuote.value = newQuote
    
    if (isTypingMode.value) {
      startTypeWriter()
    } else {
      displayText.value = newQuote
    }
  } catch (error) {
    console.warn('Failed to refresh hitokoto:', error)
  } finally {
    isLoading.value = false
  }
}

// 初始化
const initialize = async () => {
  // 如果启用自动获取，先尝试获取API数据
  if (props.autoFetch) {
    try {
      const apiQuote = await getHitokoto()
      currentQuote.value = apiQuote
    } catch (error) {
      console.warn('Initial hitokoto fetch failed, using fallback:', error)
      // 使用fallback数据
    }
  }
  
  // 启动显示效果
  if (isTypingMode.value) {
    startTypeWriter()
  } else {
    displayText.value = currentQuote.value
  }
}

// 生命周期
onMounted(() => {
  initialize()
})

onUnmounted(() => {
  stopTypeWriter()
})

// 暴露方法
defineExpose({
  refreshHitokoto,
  isLoading
})
</script>

<style scoped>
.dynamic-banner-desc {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.typing-text {
  position: relative;
  min-height: 1.5em;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  line-height: 1.6;
  word-break: break-word;
  hyphens: auto;
}

.typing-content,
.static-content {
  display: inline-block;
}

.cursor {
  display: inline-block;
  margin-left: 2px;
  font-weight: normal;
  animation: none;
}

.refresh-controls {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.dynamic-banner-desc:hover .refresh-controls {
  opacity: 1;
}

.refresh-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 6px 12px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.refresh-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.4);
  transform: translateY(-1px);
}

.refresh-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.refresh-btn span:first-child {
  display: inline-block;
  margin-right: 4px;
}

.refresh-btn:disabled span:first-child {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .typing-text {
    font-size: 1.2rem !important;
    padding: 0 1rem;
  }
  
  .refresh-controls {
    opacity: 1; /* 移动端始终显示 */
  }
}
</style> 