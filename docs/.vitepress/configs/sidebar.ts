import type { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Config['sidebar'] = {
  '/excellentArticle/': [
    {
      text: '每日阅读',
      items: [
        {
          text: '前端常见的安全攻击方式、原理、以及如何防护！',
          link: '/excellentArticle/2024-04-11/',
        },
        {
          text: '为什么需要缓存',
          link: '/excellentArticle/2024-04-12/',
        },
        {
          text: '面试官：Vue3中什么是Reactive的懒响应性？',
          link: '/excellentArticle/2024-04-15/',
        },
        {
          text: '搞懂 Vue3 中的各种 ref: toRef,toRefs,isRef,unref...',
          link: '/excellentArticle/2024-04-16/',
        },
        {
          text: '基于nginx+ffmpeg+vue3+TypeScript在网页上显示监控的实时画面',
          link: '/excellentArticle/2024-04-17/',
        },
        {
          text: '面试官：只知道v-model是modelValue语法糖，那你可以走了',
          link: '/excellentArticle/2024-04-18/',
        },
        {
          text: 'TypeScript很麻烦💔，不想使用！',
          link: '/excellentArticle/2024-04-23/',
        },
        {
          text: '一文掌握 TS 高级类型编程',
          link: '/excellentArticle/2024-04-24/',
        },
        {
          text: '前端视频人像实时捕获技术,超干货!!!',
          link: '/excellentArticle/2024-05-06/',
        },
        {
          text: '5分钟带你了解【前端装饰器】，“高大上”的“基础知识”',
          link: '/excellentArticle/2024-05-07/',
        },
        {
          text: '开发阶段！跨域问题多种解决方案的精华总结',
          link: '/excellentArticle/2024-05-15/',
        },
      ],
    },
  ],
  '/roteLearning/': [
    {
      text: '需要死记硬背的八股',
      items: [
        {
          text: '一丢丢vue面试题',
          link: '/roteLearning/vue/',
        },
        {
          text: '复习复习44个react知识点',
          link: '/roteLearning/react/',
        },
        {
          text: '进阶进阶！复习50个JavaScript「进阶」知识点',
          link: '/roteLearning/javaScript/',
        },
      ],
    },
  ],
  '/js/': [
    {
      text: '积累',
      items: [
        {
          text: '提高开发效率的10个JavaScript技巧',
          link: '/js/2024-04-19/',
        },
      ],
    },
  ],
  '/nestjs/': [
    {
      text: '原文请上后盾人官网查看www.houdunren.com',
      items: [
        {
          text: '基础知识',
          link: '/nestjs/base/',
        },
        {
          text: '提供者',
          link: '/nestjs/providers/',
        },
        {
          text: '模块',
          link: '/nestjs/module/',
        },
        {
          text: '项目配置',
          link: '/nestjs/proConfig/',
        },
        {
          text: 'prisma',
          link: '/nestjs/prisma/',
        },
      ],
    },
  ],
}
