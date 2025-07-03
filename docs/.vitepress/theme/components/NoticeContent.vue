<script setup lang="ts" name="NoticeContent">
const namespace = "notice";
</script>

<template>
  <div :class="namespace">
    <p>微信 👇</p>
    <img src="/img/wechat/wechat.png"
      alt="QR Code" />
    <p class="">全网最美博客-teek(知识库&博客二合一) --正在持续迭代，欢迎大家尝鲜及提出新需求，共同打造一个完美的作品。</p>
  </div>
</template>

<style lang="scss" scoped>
.notice {
  img {
    width: 100%;
    height: 120px;
    object-fit: contain;
  }

  p {
    text-align: center;
    font-size: 14px;
    padding: 10px 0;
  }
}
</style>
