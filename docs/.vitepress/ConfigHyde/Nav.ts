// nav导航栏配置
import { TeekIcon, VdoingIcon, SSLIcon, BlogIcon } from './icon/NavIcon'
export const Nav = [
  { text: '🏡首页', link: '/' },

  // 下拉菜单 (测试 导航栏图标-自定义组件 对  下拉菜单的影响)
  // {
  //   text: "📖笔记专栏",
  //   items: [
  //     {
  //       component: "NavIcon",
  //       props: TeekIcon,
  //     },
  //     {
  //       component: "NavIcon",
  //       props: VdoingIcon,
  //     },
  //     {
  //       component: "NavIcon",
  //       props: SSLIcon,
  //     },
  //     {
  //       component: "NavIcon",
  //       props: BlogIcon,
  //     },
  //   ],
  // },

  // (测试 导航栏图标-自定义组件 对  分组菜单 的影响)
  // {
  //   text: '指南',
  //   items: [
  //     {
  //       // 分组标题1
  //       text: '介绍',
  //       items: [
  //         {
  //           component: "NavIcon",
  //           props: SSLIcon,
  //         },
  //         {
  //           component: "NavIcon",
  //           props: BlogIcon,
  //         },
  //       ],
  //     },
  //     {
  //       // 分组标题2
  //       text: '基础设置',
  //       items: [
  //         {
  //           component: "NavIcon",
  //           props: SSLIcon,
  //         },
  //         {
  //           component: "NavIcon",
  //           props: BlogIcon,
  //         },
  //       ],
  //     },
  //   ],
  // },

  // 笔记
  {
    text: '🗃️笔记',
    items: [
      {
        // 分组标题1
        text: '运维',
        items: [
          {
            text: `
                <div style="display: flex; align-items: center; gap: 4px;">
                  <img src="/img/nav/linux.svg" alt="" style="width: 16px; height: 16px;">
                  <span>Linux</span>
                </div>
                `,
            link: '/linux'
          },
          {
            text: `
                <div style="display: flex; align-items: center; gap: 4px;">
                  <img src="/img/nav/nginx.png" alt="" style="width: 16px; height: 16px;">
                  <span>Nginx</span>
                </div>
                `,
            link: '/nginx'
          }
        ]
      },
      {
        // 分组标题2
        text: '前端',
        items: [
          {
            text: `
                <div style="display: flex; align-items: center; gap: 4px;">
                  <img src="/img/nav/html.png" alt="" style="width: 16px; height: 16px;">
                  <span>Html</span>
                </div>
                `,
            link: '/html'
          },
          {
            text: `
                <div style="display: flex; align-items: center; gap: 4px;">
                  <img src="/img/nav/css.png" alt="" style="width: 16px; height: 16px;">
                  <span>Css</span>
                </div>
                `,
            link: '/css'
          }
        ]
      },
      {
        // 分组标题3
        text: '编程',
        items: [
          {
            text: `
                <div style="display: flex; align-items: center; gap: 4px;">
                  <img src="/img/nav/python.png" alt="" style="width: 16px; height: 16px;">
                  <span>Python</span>
                </div>
                `,
            link: '/python'
          },
          {
            text: `
                <div style="display: flex; align-items: center; gap: 4px;">
                  <img src="/img/nav/go.svg" alt="" style="width: 16px; height: 16px;">
                  <span>Go</span>
                </div>
                `,
            link: '/go'
          }
        ]
      },
      {
        text: '专题',
        items: [
          {
            text: `
                <div style="display: flex; align-items: center; gap: 4px;">
                  <img src="/img/nav/博客.svg" alt="" style="width: 16px; height: 16px;">
                  <span>博客搭建</span>
                </div>
                `,
            link: '/blog'
          },
          {
            text: `
                <div style="display: flex; align-items: center; gap: 4px;">
                  <img src="/img/nav/前端demo.svg" alt="" style="width: 16px; height: 16px;">
                  <span>前端demo</span>
                </div>
                `,
            link: '/qianduan-demo'
          },
          {
            text: `
                <div style="display: flex; align-items: center; gap: 4px;">
                  <img src="/img/nav/Git.svg" alt="" style="width: 16px; height: 16px;">
                  <span>Git</span>
                </div>
                `,
            link: '/git'
          },
          {
            text: `
                <div style="display: flex; align-items: center; gap: 4px;">
                  <img src="/img/nav/面试.svg" alt="" style="width: 16px; height: 16px;">
                  <span>面试</span>
                </div>
                `,
            link: '/mianshi'
          },
          {
            text: `
                <div style="display: flex; align-items: center; gap: 4px;">
                  <img src="/img/nav/NAS.svg" alt="" style="width: 16px; height: 16px;">
                  <span>NAS</span>
                </div>
                `,
            link: '/NAS'
          },
          {
            text: `
                <div style="display: flex; align-items: center; gap: 4px;">
                  <img src="/img/nav/脚本.svg" alt="" style="width: 16px; height: 16px;">
                  <span>脚本</span>
                </div>
                `,
            link: '/jiaoben'
          },
          {
            text: `
                <div style="display: flex; align-items: center; gap: 4px;">
                  <img src="/img/nav/工具.svg" alt="" style="width: 16px; height: 16px;">
                  <span>工具</span>
                </div>
                `,
            link: '/tools'
          }
        ]
      },
      {
        text: '开源项目',
        items: [
          {
            text: `
                <div style="display: flex; align-items: center; gap: 4px;">
                  <img src="/img/nav/teek.svg" alt="" style="width: 16px; height: 16px;">
                  <span>Teek-one</span>
                </div>
                `,
            link: '/teek'
          },
          {
            text: `
                <div style="display: flex; align-items: center; gap: 4px;">
                  <img src="/img/nav/Typora.svg" alt="" style="width: 16px; height: 16px;">
                  <span>Typora-one</span>
                </div>
                `,
            link: '/typora-theme-one'
          }
        ]
      }
    ]
  },

  // 生活
  {
    text: '🏓生活',
    items: [
      {
        // 分组标题1
        text: '娱乐',
        items: [
          {
            text: `
                <div style="display: flex; align-items: center; gap: 4px;">
                  <img src="/img/nav/相册.svg" alt="" style="width: 16px; height: 16px;">
                  <span>相册</span>
                </div>
                `,
            link: 'https://photo.onedayxyy.cn/'
          },
          {
            text: `
                <div style="display: flex; align-items: center; gap: 4px;">
                  <img src="/img/nav/电影.svg" alt="" style="width: 16px; height: 16px;">
                  <span>电影</span>
                </div>
                `,
            link: '/movie'
          },
          {
            text: `
                <div style="display: flex; align-items: center; gap: 4px;">
                  <img src="/img/nav/音乐.svg" alt="" style="width: 16px; height: 16px;">
                  <span>音乐</span>
                </div>
                `,
            link: '/music'
          }
        ]
      },
      {
        // 分组标题2
        text: '小屋',
        items: [
          {
            text: `
                <div style="display: flex; align-items: center; gap: 4px;">
                  <img src="/img/nav/精神小屋.svg" alt="" style="width: 16px; height: 16px;">
                  <span>精神小屋</span>
                </div>
                `,
            link: '/love'
          },
          {
            text: `
                <div style="display: flex; align-items: center; gap: 4px;">
                  <img src="/img/nav/时间管理.svg" alt="" style="width: 16px; height: 16px;">
                  <span>时间管理</span>
                </div>
                `,
            link: '/time-plan'
          },
          {
            text: `
                <div style="display: flex; align-items: center; gap: 4px;">
                  <img src="/img/nav/文案.svg" alt="" style="width: 16px; height: 16px;">
                  <span>文案</span>
                </div>
                `,
            link: '/wenan'
          }
          // { text: "💖情侣空间", link: "https://fxj.onedayxyy.cn/" },
        ]
      }
    ]
  },

  // 索引
  {
    text: '👏索引',
    items: [
      { text: '📃分类页', link: '/categories' },
      { text: '🔖标签页', link: '/tags' },
      {
        text: `
            <div style="display: flex; align-items: center; gap: 4px;">
              <img src="/img/nav/归档.svg" alt="" style="width: 16px; height: 16px;">
              <span>归档页</span>
            </div>
            `,
        link: '/archives'
      },
      {
        text: `
            <div style="display: flex; align-items: center; gap: 4px;">
              <img src="/img/nav/清单.svg" alt="" style="width: 16px; height: 16px;">
              <span>清单页</span>
            </div>
            `,
        link: '/articleOverview'
      },
      {
        text: `
            <div style="display: flex; align-items: center; gap: 4px;">
              <img src="/img/nav/登录.svg" alt="" style="width: 16px; height: 16px;">
              <span>登录页</span>
            </div>
            `,
        link: '/login'
      },
      {
        text: `
            <div style="display: flex; align-items: center; gap: 4px;">
              <img src="/img/nav/风险提示.svg" alt="" style="width: 16px; height: 16px;">
              <span>风险链接提示页</span>
            </div>
            `,
        link: '/risk-link?target=https://onedayxyy.cn/'
      }
    ]
  },

  // 关于
  {
    text: '🍷关于',
    items: [
      { text: '👋关于我', link: '/resume' },
      { text: '🎉关于本站', link: '/about-website' },
      { text: '🌐网站导航', link: '/websites' },
      { text: '👂留言区', link: '/liuyanqu' },
      { text: '💡思考', link: '/thinking' },
      {
        text: `
            <div style="display: flex; align-items: center; gap: 4px;">
              <img src="/img/nav/时间轴.svg" alt="" style="width: 16px; height: 16px;">
              <span>时间轴</span>
            </div>
            `,
        link: 'https://onedayxyy.cn/time-line/'
      },
      {
        text: `
            <div style="display: flex; align-items: center; gap: 4px;">
              <img src="/img/nav/网站统计.svg" alt="" style="width: 16px; height: 16px;">
              <span>网站统计</span>
            </div>
            `,
        link: 'https://umami.onedayxyy.cn/share/DzS4g85V8JkxsNRk/onedayxyy.cn'
      },
      {
        text: `
            <div style="display: flex; align-items: center; gap: 4px;">
              <img src="/img/nav/站点监控.svg" alt="" style="width: 16px; height: 16px;">
              <span>站点监控</span>
            </div>
            `,
        link: 'https://status.onedayxyy.cn/status/monitor'
      }
    ]
  }
]
