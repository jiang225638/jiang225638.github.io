<script setup lang="ts">
import Teek from 'vitepress-theme-teek'
import DynamicBannerDesc from '../components/DynamicBannerDesc.vue'
import { useData } from 'vitepress'

const { Layout } = Teek
const { theme, frontmatter } = useData()

// 获取Banner配置
const bannerConfig = theme.value.banner || {}
const textColor = bannerConfig.textColor || '#ffffff'
const descFontSize = bannerConfig.descFontSize || '1.4rem'
const descStyle = bannerConfig.descStyle || 'types'

// 检查是否在首页
const isHomePage = frontmatter.value.layout === 'home'
</script>

<template>
  <Layout>
    <!-- 使用Banner内容插槽来替换原有的描述 -->
    <template v-if="isHomePage" #teek-home-banner-content-after>
      <DynamicBannerDesc
        :text-color="textColor"
        :font-size="descFontSize"
        :enable-typing="descStyle === 'types'"
        :show-refresh-button="true"
        :auto-fetch="true"
        :type-speed="bannerConfig.typesInTime || 150"
        :delete-speed="bannerConfig.typesOutTime || 80"
        :pause-time="bannerConfig.typesNextTime || 2000"
      />
    </template>
  </Layout>
</template>
