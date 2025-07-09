<template>
  <span class="hitokoto-text">{{ displayText }}</span>
</template>

<script setup lang="ts">
import { ref, onMounted, readonly } from 'vue'
import { getHitokoto } from '../utils/quotable'

interface Props {
  fallback?: string
  autoLoad?: boolean
  showLoading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  fallback: '加载中...',
  autoLoad: true,
  showLoading: true
})

const displayText = ref(props.fallback)
const isLoading = ref(false)

const loadHitokoto = async () => {
  if (isLoading.value) return

  isLoading.value = true
  try {
    const newHitokoto = await getHitokoto()
    displayText.value = newHitokoto
  } catch (error) {
    console.warn('Failed to load hitokoto:', error)
    // 保持当前文本，不改变
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  if (props.autoLoad) {
    loadHitokoto()
  }
})

// 暴露方法供外部调用
defineExpose({
  loadHitokoto,
  isLoading: readonly(isLoading)
})
</script>

<style scoped>
.hitokoto-text {
  transition: opacity 0.3s ease;
}

.hitokoto-text.loading {
  opacity: 0.6;
}
</style>
