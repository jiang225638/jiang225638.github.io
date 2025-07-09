<script setup lang="ts" name="TeekLayoutProvider">
import type { TeekConfig } from 'vitepress-theme-teek'
import Teek, { teekConfigContext, clockIcon } from 'vitepress-theme-teek'
import { useData } from 'vitepress'
import { watch, nextTick, ref, provide } from 'vue'
// import { teekDocConfig } from "../config/teekConfig";
import { teekBlogCardConfig } from '../config/teekConfig'
import { useRibbon } from '../composables/useRibbon'
import { useRuntime } from '../composables/useRuntime'
import ConfigSwitch from './ConfigSwitch.vue'
import ContributeChart from './ContributeChart.vue'
import NotFound from './404.vue'
import BannerImgArrow from './BannerImgArrow.vue' //导入横幅图片箭头组件
import DynamicBannerDesc from './DynamicBannerDesc.vue' //导入动态Banner描述组件

import NoticeContent from './NoticeContent.vue' //导入公告组件
import GlobalGreet from './GlobalGreet.vue' //导入全局问候组件
import TitleChange from './TitleChange.vue' //导入网页标题变化
import ScrollProgressBar from './ScrollProgressBar.vue' //导入顶部滚动条组件

const ns = 'layout-provider'
const { frontmatter } = useData()

// // 默认文档风
// const currentStyle = ref("doc");
// const teekConfig = ref(teekDocConfig);

// 默认博客 卡片风
const currentStyle = ref('blog-card')
const teekConfig = ref(teekBlogCardConfig)
provide(teekConfigContext, teekConfig)

// 彩带背景
const { start: startRibbon, stop: stopRibbon } = useRibbon({
  immediate: false,
  clickReRender: true
})

// 页脚运行时间
const { start: startRuntime, stop: stopRuntime } = useRuntime(
  '2021-10-19 00:00:00',
  {
    prefix: `<span style="width: 16px; display: inline-block; vertical-align: -3px; margin-right: 3px;">${clockIcon}</span>小破站已运行 `
  }
)

const watchRuntimeAndRibbon = async (layout: string, style: string) => {
  const isHome = layout === 'home'
  const isDoc = [undefined, 'doc'].includes(layout)
  const isBlog = style.startsWith('blog')

  await nextTick()
  if (isHome && isBlog) startRuntime()
  else stopRuntime()

  // 关闭彩带背景，直接停止彩带
  stopRibbon()

  // 如果需要恢复彩带功能，可以注释上面一行，取消下面注释
  // if ((isHome && isBlog && style !== "blog-body") || (isDoc && teekConfig.value.pageStyle)) startRibbon();
  // else stopRibbon();
}

watch(
  frontmatter,
  async (newVal) => watchRuntimeAndRibbon(newVal.layout, currentStyle.value),
  { immediate: true }
)

const handleConfigSwitch = (config: TeekConfig, style: string) => {
  teekConfig.value = config

  watchRuntimeAndRibbon(frontmatter.value.layout, style)
}
</script>

<template>
  <Teek.Layout>
    <template #layout-top>
      <!-- 全局问候组件 -->
      <GlobalGreet />
      <!-- 看板娘组件 -->
      <!--<OhMyLive2D />-->
      <!-- 顶部滚动条组件 -->
      <ScrollProgressBar />
      <!--网页标题切换组件  -->
      <TitleChange />
      <!-- 返回顶部组件 -->
      <!--<BackToTop /> -->
    </template>

    <template #teek-theme-enhance-bottom>
      <div :class="[ns, 'flx-align-center']">
        <ConfigSwitch v-model="currentStyle" @switch="handleConfigSwitch" />
      </div>
    </template>

    <template #nav-screen-content-after>
      <ConfigSwitch v-model="currentStyle" @switch="handleConfigSwitch" />
    </template>

    <template #teek-archives-top-before>
      <ContributeChart />
    </template>

    <template #not-found>
      <NotFound />
    </template>

    <template #teek-notice-content>
      <!-- 公告组件 -->
      <NoticeContent />
    </template>

    <template #teek-home-banner-content-after>
      <!-- 动态Banner描述组件 -->
      <DynamicBannerDesc
        :text-color="teekConfig.banner?.textColor || '#ffffff'"
        :font-size="teekConfig.banner?.descFontSize || '1.4rem'"
        :enable-typing="teekConfig.banner?.descStyle === 'types'"
        :show-refresh-button="true"
        :auto-fetch="true"
        :type-speed="teekConfig.banner?.typesInTime || 150"
        :delete-speed="teekConfig.banner?.typesOutTime || 80"
        :pause-time="teekConfig.banner?.typesNextTime || 2000"
      />
    </template>

    <template #teek-home-banner-feature-after>
      <!-- 横幅图片箭头组件 -->
      <BannerImgArrow />
    </template>
  </Teek.Layout>
</template>

<style lang="scss">
.tk-my.is-circle-bg {
  // margin-bottom: 15px;

  .tk-my__avatar.circle-rotate {
    margin-top: 90px;
  }
}
</style>
