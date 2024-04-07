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
  { text: '前端导航', link: '/nav/' },
  { text: '茂茂主页', link: 'https://fe-mm.com' },
  {
    text: '茂茂物语',
    link: 'https://notes.fe-mm.com',
  },
  { text: 'mmPlayer', link: 'https://netease-music.fe-mm.com' },
  {
    text: '油猴脚本',
    // link: 'https://github.com/maomao1996/tampermonkey-scripts',
    items: [
      { text: '测试1', link: 'https://www.baidu.com' },
      { text: '测试2', link: 'https://www.baidu.com' },
    ],
  },
  {
    text: '油猴脚本',
    link: 'https://github.com/maomao1996/tampermonkey-scripts',
  },
]
