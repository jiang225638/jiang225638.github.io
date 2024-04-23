import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
  {
    text: '看穿尘世',
    items: [
      { text: 'js', link: '/js/' },
      { text: 'TS', link: '/ts/' },
      { text: 'css', link: '/css/' },
      { text: 'html', link: '/html' },
      { text: 'vue', link: '/vue/' },
      { text: 'react', link: '/react/' },
      { text: 'nestjs', link: '/nestjs/base/' },
    ],
  },
  {
    text: '阅尽繁华',
    items: [{ text: '读过的精彩', link: '/excellentArticle/' }],
  },
  // { text: '导航3', link: '' },
  // {
  //   text: '导航4',
  //   link: '',
  // },
  // { text: '导航5', link: '' },
  // {
  //   text: '导航6',
  //   // link: 'https://github.com/maomao1996/tampermonkey-scripts',
  //   items: [
  //     { text: '测试1', link: 'https://www.baidu.com' },
  //     { text: '测试2', link: 'https://www.baidu.com' },
  //   ],
  // },
  // {
  //   text: '导航7',
  //   link: '',
  // },
  // { text: '前端网址导航', link: '/nav/' },
]
