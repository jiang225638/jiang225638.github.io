// nav导航栏配置
import { TeekIcon, VdoingIcon, SSLIcon, BlogIcon } from './icon/NavIcon'
export const Nav = [
  { text: '🏡首页', link: '/' },
  // 笔记
  {
    text: '🗃️笔记',
    items: [
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
            link: '/02.前端/121.Html.md'
          },
          {
            text: `
                <div style="display: flex; align-items: center; gap: 4px;">
                  <img src="/img/nav/css.png" alt="" style="width: 16px; height: 16px;">
                  <span>Css</span>
                </div>
                `,
            link: '/02.前端/122.Css.md'
          },
          {
            text: `
                <div style="display: flex; align-items: center; gap: 4px;">
                  <img src="/img/nav/css.png" alt="" style="width: 16px; height: 16px;">
                  <span>天地图</span>
                </div>
                `,
            link: '/02.前端/124.天地图.md'
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
            link: '/03.相册/123.相册.md'
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
            link: '/04.音乐/index.md'
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
                  <span>奋斗记录</span>
                </div>
                `,
            link: '/22.奋斗记录'
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
      // { text: '👂留言区', link: '/liuyanqu' },
      { text: '💡思考', link: '/thinking' }
      // {
      //   text: `
      //       <div style="display: flex; align-items: center; gap: 4px;">
      //         <img src="/img/nav/时间轴.svg" alt="" style="width: 16px; height: 16px;">
      //         <span>时间轴</span>
      //       </div>
      //       `,
      //   link: 'https://onedayxyy.cn/time-line/'
      // },
      // {
      //   text: `
      //       <div style="display: flex; align-items: center; gap: 4px;">
      //         <img src="/img/nav/网站统计.svg" alt="" style="width: 16px; height: 16px;">
      //         <span>网站统计</span>
      //       </div>
      //       `,
      //   link: 'https://umami.onedayxyy.cn/share/DzS4g85V8JkxsNRk/onedayxyy.cn'
      // },
      // {
      //   text: `
      //       <div style="display: flex; align-items: center; gap: 4px;">
      //         <img src="/img/nav/站点监控.svg" alt="" style="width: 16px; height: 16px;">
      //         <span>站点监控</span>
      //       </div>
      //       `,
      //   link: 'https://status.onedayxyy.cn/status/monitor'
      // }
    ]
  }
]
