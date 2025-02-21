import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
  { text: '首页', link: '/' },
  {
    text: '前端',
    items: [
      { text: 'Vue', link: '/frontend/Vue/' },
      { text: '技术', link: '/docs/tech/' },
    ],
  },
  {
    text: '前端',
    items: [
      { text: 'js', link: '/js/' },
      { text: 'TS', link: '/ts/' },
      { text: 'css', link: '/css/' },
      { text: 'html', link: '/html' },
      { text: 'vue', link: '/vue/' },
      { text: 'react', link: '/react/' },
      { text: 'nestjs', link: '/nestjs/base/' },
      { text: 'JAVA', link: '/java/2024-06-26/' },
    ],
  },
  {
    text: '看过的文章', link: '/excellentArticle/'
  }
]
