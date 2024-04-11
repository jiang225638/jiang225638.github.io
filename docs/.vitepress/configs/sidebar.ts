import type { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Config['sidebar'] = {
  '/excellentArticle/': [
    {
      text: '每日阅读',
      items: [
        {
          text: '2024-04-11',
          link: '/excellentArticle',
        },
        {
          text: '2024-04-12',
          link: '/test/',
        },
      ],
    },
  ],
}
