<script setup lang="ts" name="TestPage">
import { ref } from 'vue'

const homePage = ref('homePage')
</script>

<template>
  <div class="homePage">
    <video
      class="w-full"
      src="https://v0.stream.tencentmusic.com/0b53jiaaaaaaoaadz3gkfrrkcswdabfaaaaa.f140000.mp4?dis_k=ee25d5dd31d10da3fbfc610236b77a60&dis_t=1715593195&local=1&fromtag=1231013"
      controls
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
