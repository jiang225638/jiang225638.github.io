<script setup lang="ts" name="BannerImgArrow">
import { TkIcon } from "vitepress-theme-teek";
import arrowSvg from "../svg/arrow";
import { useData } from "vitepress";
import { ref } from "vue";

const { theme } = useData();

const namespace = "banner";

const handleClickArrow = () => {
  // 获取窗口高度
  const windowH = document.getElementsByClassName("tk-banner")[0].clientHeight;
  window.scrollTo({
    top: windowH - 20,
    behavior: "smooth",
  });
};

const isMobile = ref(false);

// 移动端不显示箭头，则打开下面注释，并引入 useWindowSize：import { useWindowSize } from "vitepress-theme-teek";
// useWindowSize(width => {
//   // if (width <= 719) isMobile.value = true;
//   // else isMobile.value = false;
// });
</script>

<template>
  <div v-if="!isMobile" :class="`${namespace}-arrow tk-wallpaper-outside`">
    <TkIcon
      :icon="arrowSvg"
      size="40px"
      color="#ffffff"
      :class="`${namespace}-arrow__icon`"
      @click="handleClickArrow"
    />
  </div>
</template>

<style lang="scss" scoped>
$namespace: banner;

.#{$namespace}-arrow {
  position: absolute;
  bottom: 120px;
  left: 50%;
  transform: translateX(-50%);

  &__icon {
    cursor: pointer;
    animation: bounce-in 3s 2s infinite;
  }
}

@keyframes bounce-in {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(20px);
  }

  100% {
    transform: translateY(0);
  }
}
</style>