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
          text: '2024-04-13',
          link: '/excellentArticle/2024-04-13/',
        },
      ],
    },
  ],
}
