<template>
  <div class="volume-control">
    <button class="volume-btn" @click="toggleMute">
      <svg width="18" height="18" viewBox="0 0 24 24">
        <path
          v-if="isMuted || volume === 0"
          d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"
        />
        <path v-else-if="volume < 0.3" d="M7 9v6h4l5 5V4l-5 5H7z" />
        <path
          v-else-if="volume < 0.7"
          d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"
        />
        <path
          v-else
          d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"
        />
      </svg>
    </button>

    <div
      ref="volumeSlider"
      class="volume-slider"
      @click="handleSliderClick"
      @mousedown="handleMouseDown"
    >
      <div class="volume-track">
        <div
          class="volume-fill"
          :style="{ width: displayVolume * 100 + '%' }"
        ></div>
        <div
          class="volume-thumb"
          :style="{ left: displayVolume * 100 + '%' }"
          @mousedown="handleThumbMouseDown"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'

interface Props {
  volume: number
}

interface Emits {
  (e: 'volume-change', volume: number): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const volumeSlider = ref<HTMLElement | null>(null)
const isDragging = ref(false)
const isMuted = ref(false)
const lastVolume = ref(0.8)

const displayVolume = computed(() => {
  return isMuted.value ? 0 : props.volume
})

const toggleMute = () => {
  if (isMuted.value) {
    isMuted.value = false
    emit('volume-change', lastVolume.value)
  } else {
    lastVolume.value = props.volume
    isMuted.value = true
    emit('volume-change', 0)
  }
}

const handleSliderClick = (event: MouseEvent) => {
  if (isDragging.value) return

  const rect = volumeSlider.value?.getBoundingClientRect()
  if (!rect) return

  const clickX = event.clientX - rect.left
  const percentage = Math.max(0, Math.min(1, clickX / rect.width))

  isMuted.value = false
  emit('volume-change', percentage)
}

const handleMouseDown = (event: MouseEvent) => {
  event.preventDefault()
}

const handleThumbMouseDown = (event: MouseEvent) => {
  event.preventDefault()
  event.stopPropagation()

  isDragging.value = true

  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}

const handleMouseMove = (event: MouseEvent) => {
  if (!isDragging.value || !volumeSlider.value) return

  const rect = volumeSlider.value.getBoundingClientRect()
  const x = event.clientX - rect.left
  const percentage = Math.max(0, Math.min(1, x / rect.width))

  isMuted.value = false
  emit('volume-change', percentage)
}

const handleMouseUp = () => {
  isDragging.value = false

  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
}

onUnmounted(() => {
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
})
</script>

<style scoped>
.volume-control {
  display: flex;
  align-items: center;
  gap: 8px;
}

.volume-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  transition: all 0.2s ease;
}

.volume-btn:hover {
  background: rgba(0, 0, 0, 0.1);
  color: #333;
}

.volume-slider {
  width: 80px;
  height: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.volume-track {
  position: relative;
  width: 100%;
  height: 3px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 2px;
}

.volume-fill {
  height: 100%;
  background: #e74c3c;
  border-radius: 2px;
  transition: width 0.1s ease;
}

.volume-thumb {
  position: absolute;
  top: 50%;
  width: 10px;
  height: 10px;
  background: #e74c3c;
  border: 1px solid white;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  opacity: 0;
  transition: all 0.2s ease;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
}

.volume-slider:hover .volume-thumb {
  opacity: 1;
}

.volume-thumb:hover {
  transform: translate(-50%, -50%) scale(1.2);
}
</style>
