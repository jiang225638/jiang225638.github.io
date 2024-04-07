import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
  {
    text: '记录',
    items: [
      { text: 'js', link: '/js/' },
      { text: 'css', link: '' },
      { text: 'html', link: '' },
      { text: 'vue', link: '' },
      { text: 'react', link: '' },
      { text: 'nestjs', link: '' },
    ],
  },
  { text: '主页', link: '' },
  {
    text: '物语',
    link: '',
  },
  { text: '导航5', link: '' },
  {
    text: '导航6',
    // link: 'https://github.com/maomao1996/tampermonkey-scripts',
    items: [
      { text: '测试1', link: 'https://www.baidu.com' },
      { text: '测试2', link: 'https://www.baidu.com' },
    ],
  },
  {
    text: '导航7',
    link: '',
  },
  { text: '前端网址导航', link: '/nav/' },
]
