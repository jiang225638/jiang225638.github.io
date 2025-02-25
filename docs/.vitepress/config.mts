import { defineConfig } from 'vitepress'

// 导入主题的配置
import { blogTheme } from './blog-theme'

import { nav } from './config/nav'

// 如果使用 GitHub/Gitee Pages 等公共平台部署
// 通常需要修改 base 路径，通常为“/仓库名/”
// 如果项目名已经为 name.github.io 域名，则不需要修改！
const base =
  process.env.GITHUB_ACTIONS === 'true' ? '/jiang225638.github.io/' : '/'

// Vitepress 默认配置
// 详见文档：https://vitepress.dev/reference/site-config
export default defineConfig({
  // 继承博客主题(@sugarat/theme)
  extends: blogTheme,
  base,
  lang: 'zh-cn',
  title: '西红柿炒鸡蛋',
  description: '西红柿炒鸡蛋的博客，基于 vitepress 实现',
  lastUpdated: true,
  // 详见：https://vitepress.dev/zh/reference/site-config#head
  head: [
    // 配置网站的图标（显示在浏览器的 tab 上）
    // ['link', { rel: 'icon', href: `${base}favicon.ico` }], // 修改了 base 这里也需要同步修改
    [
      'link',
      {
        rel: 'icon',
        href: 'https://cdn.jsdelivr.net/gh//jiang225638/Cloud-Image-Hosting/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20240927165257.jpg'
      }
    ]
  ],
  themeConfig: {
    // 展示 2,3 级标题在目录中
    outline: {
      level: [2, 3],
      label: '目录'
    },
    // 默认文案修改
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '相关文章',
    lastUpdatedText: '上次更新于',

    // 设置logo
    logo: 'https://cdn.jsdelivr.net/gh//jiang225638/Cloud-Image-Hosting/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20240927165257.jpg',
    // editLink: {
    //   pattern:
    //     'https://github.com/ATQQ/sugar-blog/tree/master/packages/blogpress/:path',
    //   text: '去 GitHub 上编辑内容'
    // },
    // nav: [
    //   { text: '首页', link: '/' },
    //   { text: '前端', items: [
    //     { text: 'Vue', link: '/frontend/vue/' },
    //   ] },
    // ],
    nav: nav,
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/jiang225638/jiang225638.github.io'
      }
    ]
  }
})
