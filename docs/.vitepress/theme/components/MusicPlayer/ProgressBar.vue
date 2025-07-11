<template>
  <div
    ref="progressContainer"
    class="progress-bar"
    @click="handleClick"
    @mousedown="handleMouseDown"
  >
    <div class="progress-track">
      <div
        class="progress-fill"
        :style="{ width: progressPercentage + '%' }"
      ></div>
      <div
        class="progress-thumb"
        :style="{ left: progressPercentage + '%' }"
        @mousedown="handleThumbMouseDown"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface Props {
  current: number
  duration: number
}

interface Emits {
  (e: 'seek', time: number): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const progressContainer = ref<HTMLElement | null>(null)
const isDragging = ref(false)
const dragStartX = ref(0)
const dragStartProgress = ref(0)

const progressPercentage = computed(() => {
  if (props.duration === 0) return 0
  return Math.min(100, Math.max(0, (props.current / props.duration) * 100))
})

const handleClick = (event: MouseEvent) => {
  if (isDragging.value) return

  const rect = progressContainer.value?.getBoundingClientRect()
  if (!rect) return

  const clickX = event.clientX - rect.left
  const percentage = (clickX / rect.width) * 100
  const time = (percentage / 100) * props.duration

  emit('seek', time)
}

const handleMouseDown = (event: MouseEvent) => {
  event.preventDefault()
}

const handleThumbMouseDown = (event: MouseEvent) => {
  event.preventDefault()
  event.stopPropagation()

  isDragging.value = true
  dragStartX.value = event.clientX
  dragStartProgress.value = progressPercentage.value

  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}

const handleMouseMove = (event: MouseEvent) => {
  if (!isDragging.value || !progressContainer.value) return

  const rect = progressContainer.value.getBoundingClientRect()
  const deltaX = event.clientX - dragStartX.value
  const deltaPercentage = (deltaX / rect.width) * 100

  const newPercentage = Math.min(
    100,
    Math.max(0, dragStartProgress.value + deltaPercentage)
  )
  const time = (newPercentage / 100) * props.duration

  emit('seek', time)
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
.progress-bar {
  position: relative;
  width: 100%;
  height: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.progress-track {
  position: relative;
  width: 100%;
  height: 4px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #e74c3c;
  border-radius: 2px;
  transition: width 0.1s ease;
}

.progress-thumb {
  position: absolute;
  top: 50%;
  width: 12px;
  height: 12px;
  background: #e74c3c;
  border: 2px solid white;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  transition: transform 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.progress-thumb:hover {
  transform: translate(-50%, -50%) scale(1.2);
}

.progress-bar:hover .progress-thumb {
  opacity: 1;
}

.progress-thumb {
  opacity: 0;
}
</style>
