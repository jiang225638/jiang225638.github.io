import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
  { text: '首页', link: '/' },
  {
    text: '技术',
    items: [
      { text: 'Vue', link: '/skill/frontend/Vue/' },
      { text: 'js', link: '/skill/frontend/js/' },
      { text: 'TS', link: '/skill/frontend/ts/' },
      { text: 'css', link: '/skill/frontend/css/' },
      { text: 'html', link: '/skill/frontend/html' },
      { text: 'vue', link: '/skill/frontend/vue/' },
      { text: 'react', link: '/skill/frontend/react/' },
      { text: 'nestjs', link: '/skill/frontend/nestjs/base/' },
      { text: 'JAVA', link: '/skill/frontend/java/2024-06-26/' }
    ]
  },
  {
    text: '看过的文章',
    link: '/excellentArticle/'
  }
]
