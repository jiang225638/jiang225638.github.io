<template>
  <div class="photo-album">
    <!-- 相册头部 -->
    <div class="album-header">
      <div class="album-info">
        <h2 class="album-title">我的相册</h2>
        <div class="album-stats">
          <span class="stat-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="2"
                ry="2"
                stroke="currentColor"
                stroke-width="2"
              />
              <circle
                cx="8.5"
                cy="8.5"
                r="1.5"
                stroke="currentColor"
                stroke-width="2"
              />
              <polyline
                points="21,15 16,10 5,21"
                stroke="currentColor"
                stroke-width="2"
              />
            </svg>
            {{ stats.totalPhotos }} 张照片
          </span>
          <span class="stat-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 16V8C20.9996 7.64928 20.9071 7.30481 20.7315 7.00116C20.556 6.69751 20.3037 6.44536 20 6.27L12 2.27C11.696 2.09446 11.3511 2.00205 11 2.00205C10.6489 2.00205 10.304 2.09446 10 2.27L2 6.27C1.69626 6.44536 1.44398 6.69751 1.26846 7.00116C1.09293 7.30481 1.00036 7.64928 1 8V16C1.00036 16.3507 1.09293 16.6952 1.26846 16.9988C1.44398 17.3025 1.69626 17.5546 2 17.73L10 21.73C10.304 21.9055 10.6489 21.9979 11 21.9979C11.3511 21.9979 11.696 21.9055 12 21.73L20 17.73C20.3037 17.5546 20.556 17.3025 20.7315 16.9988C20.9071 16.6952 20.9996 16.3507 21 16Z"
                stroke="currentColor"
                stroke-width="2"
              />
              <polyline
                points="7.5,4.21 12,6.81 16.5,4.21"
                stroke="currentColor"
                stroke-width="2"
              />
              <polyline
                points="7.5,19.79 7.5,14.6 3,12"
                stroke="currentColor"
                stroke-width="2"
              />
              <polyline
                points="21,12 16.5,14.6 16.5,19.79"
                stroke="currentColor"
                stroke-width="2"
              />
              <polyline
                points="12,22.08 12,17"
                stroke="currentColor"
                stroke-width="2"
              />
            </svg>
            {{ stats.formattedSize }}
          </span>
          <span class="stat-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                stroke="currentColor"
                stroke-width="2"
              />
            </svg>
            {{ stats.favoriteCount }} 收藏
          </span>
          <span class="stat-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"
                stroke="currentColor"
                stroke-width="2"
              />
              <line
                x1="7"
                y1="7"
                x2="7.01"
                y2="7"
                stroke="currentColor"
                stroke-width="2"
              />
            </svg>
            {{ stats.tagCount }} 个标签
          </span>
        </div>
      </div>
    </div>

    <!-- 消息提示 -->
    <div v-if="message.visible" class="message" :class="message.type">
      <div class="message-content">
        <svg
          v-if="message.type === 'success'"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="2"
          />
          <line
            x1="15"
            y1="9"
            x2="9"
            y2="15"
            stroke="currentColor"
            stroke-width="2"
          />
          <line
            x1="9"
            y1="9"
            x2="15"
            y2="15"
            stroke="currentColor"
            stroke-width="2"
          />
        </svg>
        <span>{{ message.text }}</span>
      </div>
      <button class="message-close" @click="hideMessage">×</button>
    </div>

    <!-- 工具栏 -->
    <div v-if="photos.length > 0" class="toolbar">
      <div class="toolbar-left">
        <div class="view-mode">
          <button
            class="view-btn"
            :class="{ active: viewMode === 'grid', disabled: isTransitioning }"
            @click="switchViewMode('grid')"
            title="网格视图"
            :disabled="isTransitioning"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <rect
                x="3"
                y="3"
                width="7"
                height="7"
                stroke="currentColor"
                stroke-width="2"
              />
              <rect
                x="14"
                y="3"
                width="7"
                height="7"
                stroke="currentColor"
                stroke-width="2"
              />
              <rect
                x="14"
                y="14"
                width="7"
                height="7"
                stroke="currentColor"
                stroke-width="2"
              />
              <rect
                x="3"
                y="14"
                width="7"
                height="7"
                stroke="currentColor"
                stroke-width="2"
              />
            </svg>
          </button>
          <button
            class="view-btn"
            :class="{
              active: viewMode === 'masonry',
              disabled: isTransitioning
            }"
            @click="switchViewMode('masonry')"
            title="瀑布流视图"
            :disabled="isTransitioning"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <rect
                x="3"
                y="3"
                width="7"
                height="9"
                stroke="currentColor"
                stroke-width="2"
              />
              <rect
                x="14"
                y="3"
                width="7"
                height="5"
                stroke="currentColor"
                stroke-width="2"
              />
              <rect
                x="14"
                y="10"
                width="7"
                height="11"
                stroke="currentColor"
                stroke-width="2"
              />
              <rect
                x="3"
                y="14"
                width="7"
                height="7"
                stroke="currentColor"
                stroke-width="2"
              />
            </svg>
          </button>
        </div>

        <div class="search-box">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle
              cx="11"
              cy="11"
              r="8"
              stroke="currentColor"
              stroke-width="2"
            />
            <path d="m21 21-4.35-4.35" stroke="currentColor" stroke-width="2" />
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="搜索照片..."
            @input="handleSearch"
          />
          <button v-if="searchQuery" class="clear-search" @click="clearSearch">
            ×
          </button>
        </div>
      </div>

      <div class="toolbar-right">
        <div class="filter-buttons">
          <button
            class="filter-btn"
            :class="{ active: showFavoritesOnly }"
            @click="toggleFavoritesFilter"
            title="只显示收藏"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                :fill="showFavoritesOnly ? 'currentColor' : 'none'"
                stroke="currentColor"
                stroke-width="2"
              />
            </svg>
            收藏
          </button>
        </div>

        <div class="sort-dropdown">
          <select v-model="sortOrder" @change="handleSort">
            <option value="newest">最新优先</option>
            <option value="oldest">最旧优先</option>
            <option value="name-asc">名称 A-Z</option>
            <option value="name-desc">名称 Z-A</option>
            <option value="size-asc">文件大小↑</option>
            <option value="size-desc">文件大小↓</option>
          </select>
        </div>

        <button
          v-if="filteredPhotos.length > 0"
          class="action-btn primary"
          @click="startSlideshow"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <polygon points="5,3 19,12 5,21" fill="currentColor" />
          </svg>
          幻灯片
        </button>
      </div>
    </div>

    <!-- 相册内容 -->
    <div v-if="isLoading" class="loading-container">
      <div class="spinner"></div>
      <p>加载中...</p>
    </div>

    <div v-else-if="photos.length === 0" class="empty-album">
      <div class="empty-content">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="2"
            ry="2"
            stroke="currentColor"
            stroke-width="2"
          />
          <circle
            cx="8.5"
            cy="8.5"
            r="1.5"
            stroke="currentColor"
            stroke-width="2"
          />
          <polyline
            points="21,15 16,10 5,21"
            stroke="currentColor"
            stroke-width="2"
          />
        </svg>
        <h3>相册为空</h3>
        <p>暂无照片展示</p>
      </div>
    </div>

    <div v-else-if="filteredPhotos.length === 0" class="empty-search">
      <div class="empty-content">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
          <circle
            cx="11"
            cy="11"
            r="8"
            stroke="currentColor"
            stroke-width="2"
          />
          <path d="m21 21-4.35-4.35" stroke="currentColor" stroke-width="2" />
        </svg>
        <h3>未找到相关照片</h3>
        <p>尝试使用其他关键词搜索，或者清空搜索条件查看所有照片。</p>
        <button class="action-btn secondary" @click="clearSearch">
          清空搜索
        </button>
      </div>
    </div>

    <!-- 照片网格 -->
    <div
      v-else
      ref="photoGrid"
      class="photo-grid"
      :class="{
        'grid-view': viewMode === 'grid',
        'masonry-view': viewMode === 'masonry'
      }"
    >
      <div
        v-for="(photo, index) in filteredPhotos"
        :key="photo.id"
        ref="photoItems"
        class="photo-item"
        @click="openViewer(index)"
      >
        <div class="photo-wrapper">
          <img
            :src="photo.thumbnailUrl || photo.url"
            :alt="photo.title || 'Photo'"
            class="photo-image"
            loading="lazy"
            @error="handleImageError"
          />

          <!-- 悬浮信息 -->
          <div class="photo-overlay">
            <div class="photo-info">
              <h4 v-if="photo.title" class="photo-title">{{ photo.title }}</h4>
              <p v-if="photo.description" class="photo-description">
                {{ photo.description }}
              </p>
              <div class="photo-meta">
                <span v-if="photo.fileSize" class="meta-item">
                  {{ formatFileSize(photo.fileSize) }}
                </span>
                <span v-if="photo.dimensions" class="meta-item">
                  {{ photo.dimensions.width }}×{{ photo.dimensions.height }}
                </span>
                <span class="meta-item">
                  {{ formatDate(photo.uploadTime) }}
                </span>
              </div>
            </div>

            <div class="photo-actions">
              <button
                class="photo-action-btn"
                :class="{ active: localPhotoService.isFavorite(photo.id) }"
                @click.stop="toggleFavorite(photo)"
                title="收藏"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                    :fill="
                      localPhotoService.isFavorite(photo.id)
                        ? 'currentColor'
                        : 'none'
                    "
                    stroke="currentColor"
                    stroke-width="2"
                  />
                </svg>
              </button>
              <button
                class="photo-action-btn"
                @click.stop="downloadPhoto(photo)"
                title="下载"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 15L7 10H11V3H13V10H17L12 15Z"
                    fill="currentColor"
                  />
                  <path d="M20 18H4V20H20V18Z" fill="currentColor" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- 标签 -->
        <div v-if="photo.tags && photo.tags.length > 0" class="photo-tags">
          <span
            v-for="tag in photo.tags.slice(0, 3)"
            :key="tag"
            class="photo-tag"
            @click.stop="searchByTag(tag)"
          >
            #{{ tag }}
          </span>
          <span v-if="photo.tags.length > 3" class="tag-more">
            +{{ photo.tags.length - 3 }}
          </span>
        </div>
      </div>
    </div>

    <!-- 图片查看器 -->
    <PhotoViewer
      v-model:visible="viewerVisible"
      v-model:currentIndex="viewerIndex"
      :photos="filteredPhotos"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick, watch, onUnmounted } from 'vue'
import PhotoViewer from './PhotoViewer.vue'
import { localPhotoService } from './LocalPhotoService'
import type { PhotoItem, SortOrder } from './types'

// 响应式数据
const photos = ref<PhotoItem[]>([])
const isLoading = ref(true)

// DOM引用
const photoGrid = ref<HTMLElement>()
const photoItems = ref<HTMLElement[]>([])

// 视图模式
const viewMode = ref<'grid' | 'masonry'>('grid')
const isTransitioning = ref(false)

// 搜索和排序
const searchQuery = ref('')
const sortOrder = ref<SortOrder>('newest')
const showFavoritesOnly = ref(false)

// 查看器
const viewerVisible = ref(false)
const viewerIndex = ref(0)

// 消息提示
const message = ref({
  visible: false,
  type: 'success' as 'success' | 'error',
  text: ''
})

// 统计数据
const stats = ref({
  totalPhotos: 0,
  favoriteCount: 0,
  tagCount: 0,
  totalSize: 0,
  formattedSize: '0 Bytes',
  averageSize: '0 Bytes'
})

// 收藏状态缓存
const favoriteCache = ref(new Set<string>())

const filteredPhotos = computed(() => {
  let result = photos.value

  // 收藏过滤
  if (showFavoritesOnly.value) {
    result = result.filter((photo) => favoriteCache.value.has(photo.id))
  }

  // 搜索过滤
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim()
    result = result.filter(
      (photo) =>
        photo.title?.toLowerCase().includes(query) ||
        photo.description?.toLowerCase().includes(query) ||
        photo.tags?.some((tag) => tag.toLowerCase().includes(query))
    )
  }

  // 排序
  switch (sortOrder.value) {
    case 'newest':
      result = result.sort((a, b) => {
        const timeA = a.uploadTime?.getTime() || 0
        const timeB = b.uploadTime?.getTime() || 0
        return timeB - timeA
      })
      break
    case 'oldest':
      result = result.sort((a, b) => {
        const timeA = a.uploadTime?.getTime() || 0
        const timeB = b.uploadTime?.getTime() || 0
        return timeA - timeB
      })
      break
    case 'name-asc':
      result = result.sort((a, b) =>
        (a.title || '').localeCompare(b.title || '')
      )
      break
    case 'name-desc':
      result = result.sort((a, b) =>
        (b.title || '').localeCompare(a.title || '')
      )
      break
    case 'size-asc':
      result = result.sort((a, b) => (a.fileSize || 0) - (b.fileSize || 0))
      break
    case 'size-desc':
      result = result.sort((a, b) => (b.fileSize || 0) - (a.fileSize || 0))
      break
  }

  return result
})

// 方法
const loadPhotos = async () => {
  isLoading.value = true
  try {
    photos.value = await localPhotoService.getPhotos()
    stats.value = await localPhotoService.getStats()

    // 更新收藏状态缓存
    favoriteCache.value.clear()
    for (const photo of photos.value) {
      if (await localPhotoService.isFavorite(photo.id)) {
        favoriteCache.value.add(photo.id)
      }
    }
  } catch (error) {
    console.error('加载照片失败:', error)
    showMessage('加载照片失败', 'error')
  } finally {
    isLoading.value = false
  }
}

const openViewer = (index: number) => {
  viewerIndex.value = index
  viewerVisible.value = true
}

const startSlideshow = () => {
  if (filteredPhotos.value.length > 0) {
    viewerIndex.value = 0
    viewerVisible.value = true
    // 幻灯片功能在PhotoViewer组件中实现
  }
}

const handleSearch = () => {
  // 搜索是通过computed属性实时过滤的，这里可以添加额外逻辑
}

const clearSearch = () => {
  searchQuery.value = ''
}

const searchByTag = (tag: string) => {
  searchQuery.value = tag
}

const toggleFavoritesFilter = () => {
  showFavoritesOnly.value = !showFavoritesOnly.value
}

const handleSort = () => {
  // 排序是通过computed属性实时处理的，这里可以添加额外逻辑
}

const switchViewMode = async (mode: 'grid' | 'masonry') => {
  if (viewMode.value === mode || isTransitioning.value) return

  isTransitioning.value = true

  // 淡出动画
  const gridElement = photoGrid.value
  if (gridElement) {
    gridElement.style.opacity = '0'
    gridElement.style.transform = 'translateY(20px)'
  }

  // 等待淡出动画完成
  await new Promise((resolve) => setTimeout(resolve, 200))

  // 切换视图模式
  viewMode.value = mode

  // 等待DOM更新
  await nextTick()

  // 初始化新视图
  if (mode === 'masonry') {
    setTimeout(initWaterfall, 50)
  } else {
    clearWaterfall()
  }

  // 淡入动画
  setTimeout(() => {
    if (gridElement) {
      gridElement.style.opacity = '1'
      gridElement.style.transform = 'translateY(0)'
    }
    isTransitioning.value = false
  }, 50)
}

const toggleFavorite = async (photo: PhotoItem) => {
  const isFavorite = await localPhotoService.toggleFavorite(photo.id)

  // 更新收藏状态缓存
  if (isFavorite) {
    favoriteCache.value.add(photo.id)
  } else {
    favoriteCache.value.delete(photo.id)
  }

  showMessage(
    isFavorite
      ? `已添加 "${photo.title}" 到收藏`
      : `已从收藏中移除 "${photo.title}"`,
    'success'
  )
  // 更新统计数据
  stats.value = await localPhotoService.getStats()
}

const downloadPhoto = (photo: PhotoItem) => {
  const link = document.createElement('a')
  link.href = photo.url
  link.download = photo.title || 'photo'
  link.click()
}

const handleImageError = (e: Event) => {
  const img = e.target as HTMLImageElement
  img.style.display = 'none'
  console.error('图片加载失败:', img.src)
}

const showMessage = (text: string, type: 'success' | 'error' = 'success') => {
  message.value = { visible: true, text, type }
  setTimeout(() => {
    message.value.visible = false
  }, 3000)
}

const hideMessage = () => {
  message.value.visible = false
}

const formatDate = (date?: Date): string => {
  if (!date) return '未知时间'
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// 等待图片加载完成
const waitForImages = () => {
  return new Promise<void>((resolve) => {
    const images = photoGrid.value?.querySelectorAll('img') || []
    let loadedCount = 0

    if (images.length === 0) {
      resolve()
      return
    }

    const onImageLoad = () => {
      loadedCount++
      if (loadedCount === images.length) {
        resolve()
      }
    }

    images.forEach((img) => {
      if (img.complete) {
        onImageLoad()
      } else {
        img.addEventListener('load', onImageLoad)
        img.addEventListener('error', onImageLoad) // 即使加载失败也继续
      }
    })
  })
}

// 瀑布流布局
const initWaterfall = async () => {
  if (
    viewMode.value !== 'masonry' ||
    !photoGrid.value ||
    !photoItems.value.length
  )
    return

  await nextTick()
  await waitForImages() // 等待图片加载完成

  const container = photoGrid.value
  const items = photoItems.value

  // 计算列数和宽度 - 动态响应式
  const containerWidth = container.offsetWidth
  let gap = 20 // 默认间距
  let cols = 4 // 默认列数

  // 响应式调整列数和间距
  if (containerWidth >= 1400) {
    cols = 5
    gap = 24
  } else if (containerWidth >= 1200) {
    cols = 4
    gap = 20
  } else if (containerWidth >= 900) {
    cols = 3
    gap = 16
  } else if (containerWidth >= 600) {
    cols = 2
    gap = 12
  } else {
    cols = 1
    gap = 8
  }

  // 根据列数和容器宽度计算实际的项目宽度
  const itemWidth = Math.floor((containerWidth - gap * (cols - 1)) / cols)

  // 初始化列高度数组
  const columnHeights = new Array(cols).fill(0)

  // 设置容器样式
  container.style.position = 'relative'

  // 遍历每个item
  items.forEach((item, index) => {
    if (!item) return

    // 获取照片数据以计算实际高度
    const photo = filteredPhotos.value[index]
    const aspectRatio = photo.dimensions
      ? photo.dimensions.height / photo.dimensions.width
      : 1.2
    const itemHeight = Math.round(itemWidth * aspectRatio)

    // 找到最短的列
    const shortestColumnIndex = columnHeights.indexOf(
      Math.min(...columnHeights)
    )

    // 计算位置
    const left = shortestColumnIndex * (itemWidth + gap)
    const top = columnHeights[shortestColumnIndex]

    // 设置item样式
    item.style.position = 'absolute'
    item.style.left = `${left}px`
    item.style.top = `${top}px`
    item.style.width = `${itemWidth}px`

    // 设置图片容器高度
    const photoWrapper = item.querySelector('.photo-wrapper') as HTMLElement
    if (photoWrapper) {
      photoWrapper.style.height = `${itemHeight}px`
    }

    // 获取实际高度（包括标签等内容）
    const actualHeight = itemHeight + 60 // 60px for tags and padding

    // 更新列高度
    columnHeights[shortestColumnIndex] += actualHeight + gap
  })

  // 设置容器高度
  const maxHeight = Math.max(...columnHeights)
  container.style.height = `${maxHeight}px`
}

// 窗口大小变化处理
const handleResize = () => {
  if (viewMode.value === 'masonry') {
    setTimeout(initWaterfall, 200)
  }
}

// 生命周期
onMounted(() => {
  loadPhotos()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

// 清除瀑布流样式
const clearWaterfall = () => {
  if (!photoGrid.value || !photoItems.value.length) return

  const container = photoGrid.value
  const items = photoItems.value

  // 重置容器样式
  container.style.position = ''
  container.style.height = ''

  // 重置每个item的样式
  items.forEach((item) => {
    if (!item) return
    item.style.position = ''
    item.style.left = ''
    item.style.top = ''
    item.style.width = ''

    // 重置图片容器高度
    const photoWrapper = item.querySelector('.photo-wrapper') as HTMLElement
    if (photoWrapper) {
      photoWrapper.style.height = ''
    }
  })
}

// 监听器
watch(
  filteredPhotos,
  async () => {
    await nextTick()
    if (viewMode.value === 'masonry') {
      setTimeout(initWaterfall, 200)
    }
  },
  { flush: 'post' }
)
</script>

<style scoped>
.photo-album {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
  min-height: 100vh;
  background: #fafafa;
}

/* 相册头部 */
.album-header {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin-bottom: 3rem;
  padding: 2rem 0 1.5rem 0;
  border-bottom: 1px solid #e5e7eb;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  max-width: 1400px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}

.album-title {
  text-align: center;
  margin: 0 0 1rem 0;
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
}

.album-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
}

/* 消息提示 */
.message {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  margin-bottom: 1.5rem;
  border-radius: 8px;
  font-weight: 500;
}

.message.success {
  background: #d1fae5;
  color: #065f46;
  border: 1px solid #a7f3d0;
}

.message.error {
  background: #fee2e2;
  color: #991b1b;
  border: 1px solid #fca5a5;
}

.message-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.message-close {
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  color: inherit;
  opacity: 0.7;
}

.message-close:hover {
  opacity: 1;
}

/* 工具栏 */
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto 3rem auto;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  max-width: 1400px;
  width: 100%;
}

.toolbar-left,
.toolbar-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.view-mode {
  display: flex;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid #d1d5db;
}

.view-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border: none;
  background: #f9fafb;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s ease;
}

.view-btn.active {
  background: #3b82f6;
  color: white;
}

.view-btn.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
  background: #f9fafb;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 0.5rem 0.75rem;
  min-width: 300px;
}

.search-box svg {
  color: #6b7280;
  margin-right: 0.5rem;
}

.search-box input {
  flex: 1;
  border: none;
  background: none;
  outline: none;
  font-size: 0.875rem;
}

.clear-search {
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 0;
  margin-left: 0.5rem;
  font-size: 1.125rem;
}

.filter-buttons {
  display: flex;
  gap: 0.5rem;
}

.filter-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: white;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;
}

.filter-btn.active {
  background: #eff6ff;
  color: #1d4ed8;
  border-color: #3b82f6;
}

.filter-btn:hover {
  background: #f3f4f6;
}

.sort-dropdown select {
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: white;
  font-size: 0.875rem;
  cursor: pointer;
}

/* 按钮样式 */
.action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
}

.action-btn.primary {
  background: #3b82f6;
  color: white;
}

.action-btn.primary:hover {
  background: #2563eb;
}

.action-btn.secondary {
  background: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
}

.action-btn.secondary:hover {
  background: #e5e7eb;
}

/* 加载状态 */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  color: #6b7280;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #e5e7eb;
  border-top: 3px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* 空状态 */
.empty-album,
.empty-search {
  display: flex;
  justify-content: center;
  padding: 4rem 2rem;
}

.empty-content {
  text-align: center;
  max-width: 400px;
}

.empty-content svg {
  color: #9ca3af;
  margin-bottom: 1.5rem;
}

.empty-content h3 {
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
  color: #374151;
}

.empty-content p {
  margin: 0 0 2rem 0;
  color: #6b7280;
  line-height: 1.6;
}

/* 照片网格 */
.photo-grid {
  display: grid;
  gap: 1.5rem;
  transition: opacity 0.3s ease, transform 0.3s ease;
  opacity: 1;
  transform: translateY(0);
}

.photo-grid.grid-view {
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}

.photo-grid.masonry-view {
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  width: 100%;
}

.photo-item {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  animation: fadeInUp 0.6s ease forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 照片项目动画延迟 */
.photo-item:nth-child(1) {
  animation-delay: 0.1s;
}
.photo-item:nth-child(2) {
  animation-delay: 0.15s;
}
.photo-item:nth-child(3) {
  animation-delay: 0.2s;
}
.photo-item:nth-child(4) {
  animation-delay: 0.25s;
}
.photo-item:nth-child(5) {
  animation-delay: 0.3s;
}
.photo-item:nth-child(6) {
  animation-delay: 0.35s;
}
.photo-item:nth-child(7) {
  animation-delay: 0.4s;
}
.photo-item:nth-child(8) {
  animation-delay: 0.45s;
}
.photo-item:nth-child(9) {
  animation-delay: 0.5s;
}
.photo-item:nth-child(10) {
  animation-delay: 0.55s;
}
.photo-item:nth-child(n + 11) {
  animation-delay: 0.6s;
}

.grid-view .photo-item {
  display: block;
}

.photo-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.photo-wrapper {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.grid-view .photo-wrapper {
  padding-bottom: 75%; /* 4:3 宽高比 */
}

.masonry-view .photo-item {
  position: absolute;
  /* 宽度由JavaScript动态设置 */
}

.grid-view .photo-item {
  position: static !important;
  width: auto !important;
  left: auto !important;
  top: auto !important;
}

.masonry-view .photo-wrapper {
  padding-bottom: 0;
  height: auto;
  position: relative;
}

.photo-image {
  width: 100%;
  transition: transform 0.3s ease;
}

.grid-view .photo-image {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  object-fit: cover;
}

.masonry-view .photo-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.photo-item:hover .photo-image {
  transform: scale(1.05);
}

/* 悬浮信息 */
.photo-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.1) 50%,
    rgba(0, 0, 0, 0.8) 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  opacity: 0;
  transition: opacity 0.3s ease;
  color: white;
}

.photo-item:hover .photo-overlay {
  opacity: 1;
}

.photo-actions {
  display: flex;
  gap: 0.5rem;
  align-self: flex-end;
}

.photo-action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  backdrop-filter: blur(10px);
}

.photo-action-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.photo-action-btn.active {
  background: rgba(239, 68, 68, 0.8);
  color: white;
}

.photo-info {
  align-self: flex-start;
}

.photo-title {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.2;
}

.photo-description {
  margin: 0 0 0.5rem 0;
  font-size: 0.875rem;
  opacity: 0.9;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.photo-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  font-size: 0.75rem;
  opacity: 0.8;
}

/* 标签 */
.photo-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.75rem;
  background: white;
}

.photo-tag {
  padding: 0.25rem 0.5rem;
  background: #eff6ff;
  color: #1d4ed8;
  border-radius: 4px;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.photo-tag:hover {
  background: #dbeafe;
}

.tag-more {
  padding: 0.25rem 0.5rem;
  background: #f3f4f6;
  color: #6b7280;
  border-radius: 4px;
  font-size: 0.75rem;
}

/* 响应式设计 */
@media (min-width: 1400px) {
  .photo-album {
    max-width: 1600px;
  }

  .album-header,
  .toolbar,
  .photo-grid.grid-view,
  .photo-grid.masonry-view {
    max-width: 1600px;
  }

  .photo-grid.grid-view {
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  }

  .masonry-view .photo-item {
    /* 宽度由JavaScript动态设置 */
  }
}

@media (max-width: 1024px) {
  .photo-album {
    padding: 1rem 1.5rem;
    max-width: 1024px;
  }

  .album-header,
  .toolbar,
  .photo-grid.grid-view,
  .photo-grid.masonry-view {
    max-width: 1024px;
  }

  .photo-grid.grid-view {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }

  .masonry-view .photo-item {
    /* 宽度由JavaScript动态设置 */
  }
}

@media (max-width: 768px) {
  .photo-album {
    padding: 0.75rem 1rem;
    background: white;
    max-width: 768px;
  }

  .album-header,
  .toolbar,
  .photo-grid.grid-view,
  .photo-grid.masonry-view {
    max-width: 768px;
  }

  .album-header {
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;
    padding: 1.5rem 1rem;
  }

  .album-stats {
    gap: 1rem;
    justify-content: center;
  }

  .toolbar {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
    margin-bottom: 2rem;
    padding: 1rem;
  }

  .toolbar-left,
  .toolbar-right {
    justify-content: space-between;
  }

  .search-box {
    min-width: auto;
    flex: 1;
  }

  .photo-grid.grid-view {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 1rem;
  }

  .masonry-view .photo-item {
    /* 宽度由JavaScript动态设置 */
  }
}

@media (max-width: 480px) {
  .photo-album {
    padding: 0.5rem;
    background: white;
    max-width: 480px;
  }

  .album-header,
  .toolbar,
  .photo-grid.grid-view,
  .photo-grid.masonry-view {
    max-width: 480px;
  }

  .album-header {
    padding: 1rem 0.5rem;
    margin-bottom: 1.5rem;
  }

  .album-title {
    font-size: 1.5rem;
    text-align: center;
  }

  .album-stats {
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
  }

  .toolbar {
    padding: 0.75rem;
    margin-bottom: 1.5rem;
  }

  .toolbar-left,
  .toolbar-right {
    flex-direction: column;
    gap: 0.75rem;
  }

  .photo-grid.grid-view {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 0.75rem;
  }

  .masonry-view .photo-item {
    /* 宽度由JavaScript动态设置 */
  }
}
</style>
