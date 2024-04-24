import type { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Config['sidebar'] = {
  '/excellentArticle/': [
    {
      text: '每日阅读',
      items: [
        {
          text: '2024-04-11',
          link: '/excellentArticle/2024-04-11/',
        },
        {
          text: '2024-04-12',
          link: '/excellentArticle/2024-04-12/',
        },
        {
          text: '2024-04-15',
          link: '/excellentArticle/2024-04-15/',
        },
        {
          text: '2024-04-16',
          link: '/excellentArticle/2024-04-16/',
        },
        {
          text: '2024-04-17',
          link: '/excellentArticle/2024-04-17/',
        },
        {
          text: '2024-04-18',
          link: '/excellentArticle/2024-04-18/',
        },
        {
          text: '2024-04-23',
          link: '/excellentArticle/2024-04-23/',
        },
        {
          text: '2024-04-24',
          link: '/excellentArticle/2024-04-24/',
        },
      ],
    },
  ],
  '/roteLearning/': [
    {
      text: '需要死记硬背的八股',
      items: [
        {
          text: 'vue',
          link: '/roteLearning/vue/',
        },
        {
          text: 'react',
          link: '/roteLearning/react/',
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
