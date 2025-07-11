<template>
  <teleport to="body">
    <div
      v-if="visible"
      class="photo-viewer"
      @click.self="closeViewer"
      @keydown="handleKeydown"
      tabindex="0"
    >
      <!-- 背景遮罩 -->
      <div class="viewer-backdrop" @click="closeViewer"></div>

      <!-- 查看器内容 -->
      <div class="viewer-content">
        <!-- 头部工具栏 -->
        <div class="viewer-header">
          <div class="photo-info">
            <h3 v-if="currentPhoto?.title" class="photo-title">
              {{ currentPhoto.title }}
            </h3>
            <div class="photo-meta">
              <span class="photo-index">
                {{ currentIndex + 1 }} / {{ photos.length }}
              </span>
              <span v-if="currentPhoto?.fileSize" class="photo-size">
                {{ formatFileSize(currentPhoto.fileSize) }}
              </span>
              <span v-if="currentPhoto?.dimensions" class="photo-dimensions">
                {{ currentPhoto.dimensions.width }} ×
                {{ currentPhoto.dimensions.height }}
              </span>
            </div>
          </div>

          <div class="viewer-actions">
            <button
              class="action-btn"
              @click="toggleSlideshow"
              :title="isSlideshow ? '停止幻灯片' : '开始幻灯片'"
            >
              <svg
                v-if="!isSlideshow"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
              </svg>
              <svg
                v-else
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path d="M6 4H8V20H6V4ZM16 4H18V20H16V4Z" fill="currentColor" />
              </svg>
            </button>

            <!-- <button class="action-btn" @click="downloadPhoto" title="下载图片">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 15L7 10H11V3H13V10H17L12 15Z"
                  fill="currentColor"
                />
                <path d="M20 18H4V20H20V18Z" fill="currentColor" />
              </svg>
            </button> -->

            <!-- <button class="action-btn" @click="sharePhoto" title="分享图片">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 16.08C17.24 16.08 16.56 16.38 16.04 16.85L8.91 12.7C8.96 12.47 9 12.24 9 12C9 11.76 8.96 11.53 8.91 11.3L15.96 7.19C16.5 7.69 17.21 8 18 8C19.66 8 21 6.66 21 5C21 3.34 19.66 2 18 2C16.34 2 15 3.34 15 5C15 5.24 15.04 5.47 15.09 5.7L8.04 9.81C7.5 9.31 6.79 9 6 9C4.34 9 3 10.34 3 12C3 13.66 4.34 15 6 15C6.79 15 7.5 14.69 8.04 14.19L15.16 18.34C15.11 18.55 15.08 18.77 15.08 19C15.08 20.61 16.39 21.92 18 21.92C19.61 21.92 20.92 20.61 20.92 19C20.92 17.39 19.61 16.08 18 16.08Z"
                  fill="currentColor"
                />
              </svg>
            </button> -->

            <!-- <button
              class="action-btn"
              @click="deleteCurrentPhoto"
              title="删除图片"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button> -->

            <button
              class="action-btn close-btn"
              @click="closeViewer"
              title="关闭 (ESC)"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- 主图片区域 -->
        <div class="viewer-main">
          <!-- 导航按钮 -->
          <button
            v-show="photos.length > 1"
            class="nav-btn nav-prev"
            @click="previousPhoto"
            :disabled="currentIndex === 0 && !isLoop"
            title="上一张 (←)"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>

          <button
            v-show="photos.length > 1"
            class="nav-btn nav-next"
            @click="nextPhoto"
            :disabled="currentIndex === photos.length - 1 && !isLoop"
            title="下一张 (→)"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>

          <!-- 图片容器 -->
          <div
            ref="imageContainer"
            class="image-container"
            @wheel.prevent="handleWheel"
            @mousedown="startDrag"
            @mousemove="drag"
            @mouseup="endDrag"
            @mouseleave="endDrag"
          >
            <img
              ref="currentImage"
              :src="currentPhoto?.url"
              :alt="currentPhoto?.title || 'Photo'"
              class="main-image"
              :style="imageStyle"
              @load="handleImageLoad"
              @error="handleImageError"
              @dragstart.prevent
            />

            <!-- 加载指示器 -->
            <div v-if="isLoading" class="loading-indicator">
              <div class="spinner"></div>
              <p>加载中...</p>
            </div>

            <!-- 错误提示 -->
            <div v-if="hasError" class="error-indicator">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p>图片加载失败</p>
            </div>
          </div>
        </div>

        <!-- 底部工具栏 -->
        <div class="viewer-footer">
          <div class="zoom-controls">
            <button
              class="zoom-btn"
              @click="zoomOut"
              :disabled="scale <= minScale"
              title="缩小 (-)"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle
                  cx="11"
                  cy="11"
                  r="8"
                  stroke="currentColor"
                  stroke-width="2"
                />
                <path
                  d="M8 11H14"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </button>

            <span class="zoom-level">{{ Math.round(scale * 100) }}%</span>

            <button
              class="zoom-btn"
              @click="zoomIn"
              :disabled="scale >= maxScale"
              title="放大 (+)"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle
                  cx="11"
                  cy="11"
                  r="8"
                  stroke="currentColor"
                  stroke-width="2"
                />
                <path
                  d="M11 8V14M8 11H14"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </button>

            <button class="zoom-btn" @click="resetTransform" title="重置 (R)">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 4V9H9M20 20V15H15M20.49 9A9 9 0 0 0 5.64 5.64L4 4M19.36 18.36A9 9 0 0 1 4 9"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>

            <button class="zoom-btn" @click="rotateImage" title="旋转 (T)">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21.5 2V8H15.5M21.34 15.57A10 10 0 1 1 22 10"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>

          <!-- 缩略图导航 -->
          <div v-if="photos.length > 1" class="thumbnail-nav">
            <div class="thumbnail-list" ref="thumbnailList">
              <div
                v-for="(photo, index) in photos"
                :key="photo.id"
                class="thumbnail-item"
                :class="{ active: index === currentIndex }"
                @click="goToPhoto(index)"
              >
                <img
                  :src="photo.thumbnailUrl || photo.url"
                  :alt="photo.title || `Photo ${index + 1}`"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 幻灯片进度条 -->
      <div v-if="isSlideshow" class="slideshow-progress">
        <div
          class="progress-bar"
          :style="{ width: slideshowProgress + '%' }"
        ></div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import type { PhotoItem } from './types'
import { photoService } from './photoService'

// 属性定义
interface Props {
  visible: boolean
  photos: PhotoItem[]
  currentIndex: number
  isLoop?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isLoop: true
})

// 事件定义
const emit = defineEmits<{
  'update:visible': [value: boolean]
  'update:currentIndex': [value: number]
  photoDeleted: [photoId: string]
}>()

// 响应式数据
const imageContainer = ref<HTMLElement>()
const currentImage = ref<HTMLImageElement>()
const thumbnailList = ref<HTMLElement>()

const isLoading = ref(false)
const hasError = ref(false)

// 变换相关
const scale = ref(1)
const translateX = ref(0)
const translateY = ref(0)
const rotation = ref(0)

// 缩放限制
const minScale = 0.1
const maxScale = 5

// 拖拽相关
const isDragging = ref(false)
const dragStart = ref({ x: 0, y: 0 })
const dragOffset = ref({ x: 0, y: 0 })

// 幻灯片相关
const isSlideshow = ref(false)
const slideshowTimer = ref<number>()
const slideshowInterval = 3000 // 3秒
const slideshowProgress = ref(0)
const progressTimer = ref<number>()

// 计算属性
const currentPhoto = computed(() => {
  return props.photos[props.currentIndex] || null
})

const imageStyle = computed(() => {
  return {
    transform: `scale(${scale.value}) translate(${translateX.value}px, ${translateY.value}px) rotate(${rotation.value}deg)`,
    transition: isDragging.value ? 'none' : 'transform 0.3s ease'
  }
})

// 方法
const closeViewer = () => {
  stopSlideshow()
  emit('update:visible', false)
}

const goToPhoto = (index: number) => {
  if (index >= 0 && index < props.photos.length) {
    emit('update:currentIndex', index)
    resetTransform()
  }
}

const previousPhoto = () => {
  const newIndex = props.currentIndex - 1
  if (newIndex >= 0) {
    goToPhoto(newIndex)
  } else if (props.isLoop) {
    goToPhoto(props.photos.length - 1)
  }
}

const nextPhoto = () => {
  const newIndex = props.currentIndex + 1
  if (newIndex < props.photos.length) {
    goToPhoto(newIndex)
  } else if (props.isLoop) {
    goToPhoto(0)
  }
}

// 变换控制
const zoomIn = () => {
  const newScale = Math.min(scale.value * 1.2, maxScale)
  scale.value = newScale
}

const zoomOut = () => {
  const newScale = Math.max(scale.value / 1.2, minScale)
  scale.value = newScale
}

const resetTransform = () => {
  scale.value = 1
  translateX.value = 0
  translateY.value = 0
  rotation.value = 0
}

const rotateImage = () => {
  rotation.value = (rotation.value + 90) % 360
}

// 鼠标滚轮缩放
const handleWheel = (e: WheelEvent) => {
  e.preventDefault()

  const delta = e.deltaY > 0 ? -0.1 : 0.1
  const newScale = Math.max(minScale, Math.min(maxScale, scale.value + delta))
  scale.value = newScale
}

// 拖拽功能
const startDrag = (e: MouseEvent) => {
  if (scale.value <= 1) return

  isDragging.value = true
  dragStart.value = { x: e.clientX, y: e.clientY }
  dragOffset.value = { x: translateX.value, y: translateY.value }
}

const drag = (e: MouseEvent) => {
  if (!isDragging.value) return

  const deltaX = e.clientX - dragStart.value.x
  const deltaY = e.clientY - dragStart.value.y

  translateX.value = dragOffset.value.x + deltaX
  translateY.value = dragOffset.value.y + deltaY
}

const endDrag = () => {
  isDragging.value = false
}

// 键盘导航
const handleKeydown = (e: KeyboardEvent) => {
  switch (e.key) {
    case 'Escape':
      closeViewer()
      break
    case 'ArrowLeft':
      previousPhoto()
      break
    case 'ArrowRight':
      nextPhoto()
      break
    case '+':
    case '=':
      zoomIn()
      break
    case '-':
      zoomOut()
      break
    case 'r':
    case 'R':
      resetTransform()
      break
    case 't':
    case 'T':
      rotateImage()
      break
    case ' ':
      e.preventDefault()
      toggleSlideshow()
      break
  }
}

// 图片加载处理
const handleImageLoad = () => {
  isLoading.value = false
  hasError.value = false
  resetTransform()
}

const handleImageError = () => {
  isLoading.value = false
  hasError.value = true
}

// 幻灯片功能
const toggleSlideshow = () => {
  if (isSlideshow.value) {
    stopSlideshow()
  } else {
    startSlideshow()
  }
}

const startSlideshow = () => {
  if (props.photos.length <= 1) return

  isSlideshow.value = true
  slideshowProgress.value = 0

  const updateProgress = () => {
    slideshowProgress.value += (100 / slideshowInterval) * 100
    if (slideshowProgress.value >= 100) {
      nextPhoto()
      slideshowProgress.value = 0
    }
  }

  progressTimer.value = window.setInterval(updateProgress, 100)
}

const stopSlideshow = () => {
  isSlideshow.value = false
  if (slideshowTimer.value) {
    clearInterval(slideshowTimer.value)
  }
  if (progressTimer.value) {
    clearInterval(progressTimer.value)
  }
  slideshowProgress.value = 0
}

// 其他功能
const downloadPhoto = () => {
  if (!currentPhoto.value) return

  const link = document.createElement('a')
  link.href = currentPhoto.value.url
  link.download = currentPhoto.value.title || 'photo'
  link.click()
}

const sharePhoto = async () => {
  if (!currentPhoto.value) return

  if (navigator.share) {
    try {
      await navigator.share({
        title: currentPhoto.value.title || 'Photo',
        text: currentPhoto.value.description || '',
        url: currentPhoto.value.url
      })
    } catch (error) {
      console.log('分享取消')
    }
  } else {
    // 复制链接到剪贴板
    try {
      await navigator.clipboard.writeText(currentPhoto.value.url)
      // 这里可以显示一个提示消息
      console.log('链接已复制到剪贴板')
    } catch (error) {
      console.error('复制失败:', error)
    }
  }
}

const deleteCurrentPhoto = () => {
  if (!currentPhoto.value) return

  if (confirm('确定要删除这张图片吗？此操作不可撤销。')) {
    const photoId = currentPhoto.value.id
    const success = photoService.deletePhoto(photoId)

    if (success) {
      emit('photoDeleted', photoId)

      // 如果删除的是最后一张照片，调整索引
      if (props.currentIndex >= props.photos.length - 1) {
        const newIndex = Math.max(0, props.photos.length - 2)
        emit('update:currentIndex', newIndex)
      }

      // 如果没有照片了，关闭查看器
      if (props.photos.length <= 1) {
        closeViewer()
      }
    }
  }
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// 监听器
watch(
  () => props.currentIndex,
  () => {
    isLoading.value = true
    hasError.value = false
    resetTransform()

    // 滚动缩略图到当前位置
    nextTick(() => {
      if (thumbnailList.value) {
        const activeItem = thumbnailList.value.querySelector(
          '.thumbnail-item.active'
        ) as HTMLElement
        if (activeItem) {
          activeItem.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center'
          })
        }
      }
    })
  }
)

watch(
  () => props.visible,
  (newVisible) => {
    if (newVisible) {
      document.body.style.overflow = 'hidden'
      nextTick(() => {
        // 聚焦到查看器以接收键盘事件
        const viewer = document.querySelector('.photo-viewer') as HTMLElement
        viewer?.focus()
      })
    } else {
      document.body.style.overflow = ''
      stopSlideshow()
    }
  }
)

// 生命周期
onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  stopSlideshow()
  document.body.style.overflow = ''
})
</script>

<style scoped>
.photo-viewer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.95);
  color: white;
  outline: none;
}

.viewer-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
}

.viewer-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

/* 头部工具栏 */
.viewer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
}

.photo-info {
  flex: 1;
  min-width: 0;
}

.photo-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.photo-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.7);
}

.viewer-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.close-btn {
  margin-left: 1rem;
  background: rgba(239, 68, 68, 0.2);
}

.close-btn:hover {
  background: rgba(239, 68, 68, 0.3);
}

/* 主图片区域 */
.viewer-main {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.nav-btn {
  position: absolute;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border: none;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.nav-btn:hover:not(:disabled) {
  background: rgba(0, 0, 0, 0.7);
  transform: scale(1.1);
}

.nav-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.nav-prev {
  left: 2rem;
}

.nav-next {
  right: 2rem;
}

.image-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: grab;
}

.image-container:active {
  cursor: grabbing;
}

.main-image {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
  transform-origin: center;
  user-select: none;
}

.loading-indicator,
.error-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: rgba(255, 255, 255, 0.7);
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* 底部工具栏 */
.viewer-footer {
  padding: 1rem 2rem;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
}

.zoom-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.zoom-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
}

.zoom-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.2);
}

.zoom-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.zoom-level {
  min-width: 60px;
  text-align: center;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
}

/* 缩略图导航 */
.thumbnail-nav {
  overflow: hidden;
}

.thumbnail-list {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 0.5rem 0;
}

.thumbnail-list::-webkit-scrollbar {
  height: 4px;
}

.thumbnail-list::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
}

.thumbnail-list::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
}

.thumbnail-item {
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid transparent;
}

.thumbnail-item:hover {
  border-color: rgba(255, 255, 255, 0.5);
}

.thumbnail-item.active {
  border-color: #3b82f6;
}

.thumbnail-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 幻灯片进度条 */
.slideshow-progress {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: rgba(255, 255, 255, 0.2);
  z-index: 1000;
}

.slideshow-progress .progress-bar {
  height: 100%;
  background: #3b82f6;
  transition: width 0.1s linear;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .viewer-header {
    padding: 1rem;
  }

  .photo-meta {
    flex-direction: column;
    gap: 0.25rem;
  }

  .viewer-actions {
    gap: 0.25rem;
  }

  .action-btn {
    width: 36px;
    height: 36px;
  }

  .nav-btn {
    width: 48px;
    height: 48px;
  }

  .nav-prev {
    left: 1rem;
  }

  .nav-next {
    right: 1rem;
  }

  .viewer-footer {
    padding: 1rem;
  }

  .zoom-controls {
    gap: 0.5rem;
  }
}

@media (max-width: 480px) {
  .photo-title {
    font-size: 1rem;
  }

  .photo-meta {
    font-size: 0.75rem;
  }

  .nav-btn {
    width: 40px;
    height: 40px;
  }

  .thumbnail-item {
    width: 48px;
    height: 48px;
  }
}
</style>
