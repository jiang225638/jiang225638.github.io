<script setup lang="ts" name="TestPage">
import { ref } from 'vue'

const homePage = ref('homePage')
</script>

<template>
  <div class="homePage">
    <video
      class="w-full"
      src="https://cdn.jsdelivr.net/gh/xdlumia/files/video-play/IronMan.mp4"
      controls
      muted
      autoplay
    ></video>
  </div>
</template>

<style lang="scss" scoped>
.homePage {
  width: 100%;
  height: 44vh;
  background-color: rgba(99, 124, 217, 0.2);
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.w-full {
  width: 100vw;
  height: 52vh;
  margin-top: 5rem;
}
</style>
