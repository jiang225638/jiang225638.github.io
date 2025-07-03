// FriendLink用于在首页展示一些友链
export const FriendLink = {
  enabled: true, // 是否启用友情链接卡片
  limit: 5, // 一页显示的数量
  // autoScroll: true, // 是否自动滚动
  // scrollSpeed: 2500, // 滚动间隔时间，单位：毫秒。autoScroll 为 true 时生效

  autoPage: true, // 是否自动翻页
  pageSpeed: 4000, // 翻页间隔时间，单位：毫秒。autoPage 为 true 时生效
  titleClick: (router) => router.go("/websites"), // 查看更多友链

  // 友情链接数据列表
  list: [
    {
      avatar: "/teek-logo-large.png",
      name: "vitepress-theme-teek",
      desc: "Teek官网",
      link: "https://vp.teek.top/",
    },  
    {
      name: "Teeker",
      desc: "朝圣的使徒，正在走向编程的至高殿堂！",
      link: "http://notes.teek.top/",
      avatar: "https://testingcf.jsdelivr.net/gh/Kele-Bingtang/static/user/avatar2.png",
    },     
    {
      avatar: "/img/website/hyde.ico",
      name: "Hyde Blog",
      desc: "人心中的成见是一座大山",
      link: "https://teek.seasir.top/",
    },
    {
      avatar: "https://wiki.eryajf.net/img/logo.png",
      name: "二丫讲梵",
      desc: "💻学习📝记录🔗分享",
      link: "https://wiki.eryajf.net/",
    },
    {
      avatar: "/img/website/sugarat.top-logo.jpeg",
      name: "粥里有勺糖",
      desc: "大佬，新颖，不错的VitePress主题",
      link: "https://sugarat.top/",
    },
    {
      name: "VitePress 快速上手中文教程",
      desc: "如果你也想搭建它，那跟我一起做吧",
      link: "https://vitepress.yiov.top/",
      avatar: "https://avatars.githubusercontent.com/u/90893790?v=4",
    },
    {
      avatar: "https://img.onedayxyy.cn/images/POETIZE-logo.jpg",
      name: "POETIZE",
      desc: "最美博客",
      link: "https://poetize.cn/",
    },
    {
      avatar: "https://img.onedayxyy.cn/images/image-20250220073534772.png",
      name: "宇阳",
      desc: "记录所学知识，缩短和大神的差距！",
      link: "https://liuyuyang.net",
    },
    {
      avatar: "https://sinc.us.kg/avatar/avatar.webp",
      name: "凿壁偷光不算偷",
      desc: "tk 道友",
      link: "https://sinc.us.kg/",
    },
    {
      avatar: "https://zhouyu2156.github.io/favicon.png",
      name: "极客兔 - 笔记站",
      desc: "一心创作优质内容",
      link: "https://zhouyu2156.github.io/",
    },  
  ],
  // autoScroll: true,
};
