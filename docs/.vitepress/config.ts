import { defineConfig } from "vitepress";
import { defineTeekConfig } from "vitepress-theme-teek/config";
import { version } from "vitepress-theme-teek/es/version";
import { Wallpaper } from "./ConfigHyde/Wallaper"; // 导入Wallaper模块

import { CommentData } from "./ConfigHyde/Comment"; //导入评论配置
import { Nav } from "./ConfigHyde/Nav"; // 导入Nav模块
import { SocialLinks } from "./ConfigHyde/SocialLinks"; //导入社交链接配置


import {
  groupIconMdPlugin,
  groupIconVitePlugin,
} from "vitepress-plugin-group-icons"; // 导入代码组图标插件

import timeline from "vitepress-markdown-timeline"; // 导入时间线插件

import type { HeadConfig } from "vitepress"; // 在文件顶部添加类型导入
import { HeadData } from "./ConfigHyde/Head"; // 导入 HeadData 导入和类型断言


const description = [
  "欢迎来到 vitepress-theme-teek 使用文档",
  "Teek 是一个基于 VitePress 构建的主题，是在默认主题的基础上进行拓展，支持 VitePress 的所有功能、配置",
  "Teek 拥有三种典型的知识管理形态：结构化、碎片化、体系化，可以轻松构建一个结构化知识库，适用个人博客、文档站、知识库等场景",
].toString();
const CoverImgList = Wallpaper; // 获取壁纸列表


const teekConfig = defineTeekConfig({
  // author: { name: "Teeker", link: "https://github.com/Kele-Bingtang" },
  blogger: {
    // 博主信息，显示在首页侧边栏
    avatar: "/img/xyy.webp",
    shape: "circle-rotate", // 头像风格：square 为方形头像，circle 为圆形头像，circle-rotate 可支持鼠标悬停旋转
    name: "One",
    slogan: "明心静性，爱自己",
    circleBgImg: "/img/bg/14.webp", // 头像圆形背景图
    circleBgMask: false, // 头像圆形背景图是否显示遮罩层
    color: "#fff",
  },


  // 分类卡片
  category: {
    enabled: true, // 是否启用分类卡片
    limit: 8, // 一页显示的数量
    autoPage: false, // 是否自动翻页
    pageSpeed: 4000, // 翻页间隔时间，单位：毫秒。autoPage 为 true 时生效
  },  
  // 标签卡片
  tag: {
    enabled: true, // 是否启用标签卡片
    limit: 21, // 一页显示的数量
    autoPage: false, // 是否自动翻页
    pageSpeed: 4000, // 翻页间隔时间，单位：毫秒。autoPage 为 true 时生效
  },


  // 精选文章卡片
  topArticle: {
    enabled: true, // 是否启用精选文章卡片
    limit: 5, // 一页显示的数量
    autoPage: false, // 是否自动翻页
    pageSpeed: 4000, // 翻页间隔时间，单位：毫秒。autoPage 为 true 时生效
    dateFormat: "yyyy-MM-dd", // 精选文章的日期格式
    // dateFormat: "yyyy-MM-dd hh:mm:ss", // 精选文章的日期格式
  },

  page: {
    pageSize: 18, //首页 Post 文章列表的分页配置
  },

  // 首页尺寸变大
  themeSize: "large",

  // 布蒜子统计分析
  docAnalysis: {
    createTime: "2021-10-19",
    statistics: {
      provider: "busuanzi",
    },
    wordCount: true,
    readingTime: true,
    // overrideInfo: [
    //   { key: "lastActiveTime", value: (_, currentValue) => `${currentValue}前` },
    //   { key: "totalPosts", label: "文章总数目" },
    // ],
    appendInfo: [{ key: "index", label: "序号", value: "One" }],
  },


  // 风险链接提示页
  riskLink: {
    enabled: true, //是否启用风险链接提示功能
    whitelist: ["https://onedayxyy.cn/", "https://vp.teek.top/", "https://teek.seasir.top/", /https:\/\/github.com/, /https:\/\/giee.com/], // 白名单，匹配到的链接不提示风险
    blacklist: [], // 黑名单，匹配到的链接提示风险
  },




  articleBottomTip: () => {
    return {
      type: "tip",
      title: "声明",
      text: `<p>作者：One</p>
             <p>版权：此文章版权归 One 所有，如有转载，请注明出处!</p>
             <p style="margin-bottom: 0">链接：可点击右上角分享此页面复制文章链接</p>
            `,
    };
  },


  
  backTopDone: (TkMessage) =>
    TkMessage.success({
      message: "已达到顶部🎉",
      duration: 3000,
    }),
  toCommentDone: (TkMessage) =>
    TkMessage.success({
      message: "已达到评论区✨",
      duration: 3000,
    }),
  // 新版代码块配置
  codeBlock: {
    disabled: false, // 是否禁用新版代码块
    collapseHeight: 700, // 超出高度后自动折叠，设置 true 则默认折叠，false 则默认不折叠
    copiedDone: (TkMessage) => TkMessage.success("代码已复制 🎉"),
  },

  post: {
    showCapture: false,  //关闭自动摘要
  },

  articleShare: { enabled: true },

  articleAnalyze: {
    imageViewer: { hideOnClickModal: true }, // 图片预览是否点击遮罩层关闭}
    showIcon: true, // 作者、日期、分类、标签、字数、阅读时长、浏览量等文章信息的图标是否显示
    // dateFormat: "yyyy-MM-dd hh:mm:ss", // 文章日期格式，首页和文章页解析日期时使用
    dateFormat: "yyyy-MM-dd", // 文章日期格式，首页和文章页解析日期时使用
    showInfo: true, // 是否展示作者、日期、分类、标签、字数、阅读时长、浏览量等文章信息，分别作用于首页和文章页
    showAuthor: true, // 是否展示作者
    showCreateDate: true, // 是否展示创建日期
    showUpdateDate: true, // 是否展示更新日期，是否展示更新时间，仅在文章页显示
    showCategory: true, // 是否展示分类
    showTag: true, // 是否展示标签
    // showTag: ["article"], // 是否展示标签

    // 将文章信息传到一级标题下面
    teleport: {
      selector: "h1",
      position: "after",
      className: "h1-bottom-info",
    },
  },


  // 超过半年的文章自动提示文章内容可能已过时
  articleTopTip: (frontmatter) => {
    const tip: Record<string, string> = {
      type: "warning",
      text: "文章发布较早，内容可能过时，阅读注意甄别。",
    };

    // 大于半年，添加提示
    const longTime = 6 * 30 * 24 * 60 * 60 * 1000;
    if (
      frontmatter.date &&
      Date.now() - new Date(frontmatter.date).getTime() > longTime
    )
      return tip;
  },

  // 评论配置
  comment: {
    provider: "twikoo",
    options: CommentData,
  },


  // 公告
  notice: {
    enabled: true, // 是否启用公告功能
    title: "公告", // 公告标题，支持函数式：需要和国际化搭配使用，根据不同语言环境返回不同标题
    initOpen: true,
    duration: 3000, // 弹框定时自动关闭，0 不自动消失
    mobileMinify: false, // 移动端自动最小化
    reopen: true, // 关闭公告弹框后，是否支持重新打开，如果为 false，则代表公告只显示一次
    useStorage: false, // 是否使用 localStorage 存储公告状态，如：当打开公告弹框后，下次进来则自动打开弹框
    twinkle: false, // 公告图标是否打开闪烁提示
    position: "center", // 公告弹框出现位置
  },



  vitePlugins: {
    sidebarOption: {
      // initItems: false, //这条命令注释后，才会让文档和目录的样式保持一致
      collapsed: true, //打开侧边栏自动收缩功能
    },

    autoFrontmatter: true, // 自动生成 frontmatter
    permalinkOption: {
      notFoundDelayLoad: 1000, // 1秒后加载
    },

    // 自动格式formatter插件 添加文章封面图
    autoFrontmatterOption: {
      exclude: { title: true, date: true }, // 排除自动生成字段
      transform: frontmatter => {
       // 如果文件本身存在了 coverImg，则不生成
       if (frontmatter.coverImg) return;
        
       const list = CoverImgList;
        
       const coverImg = list[Math.floor(Math.random() * list.length)];
        
       const transformResult = { ...frontmatter, coverImg };
        
       return Object.keys(transformResult).length ? transformResult : undefined;
      },
    }, 
  },

  markdown: {
    config: (md) => {
      md.use(timeline); //时间线插件
      md.use(groupIconMdPlugin); // 代码组图标插件
    },    
    demo: {
      githubUrl: "https://github.com/Kele-Bingtang/vitepress-theme-teek/blob/master/docs",
    },
  },
  siteAnalytics: [
    {
      provider: "baidu",
      options: {
        id: "d5ee872d9aa1ef8021f4a3921b2e9c2a",
      },
    },
    {
      provider: "google",
      options: {
        id: "G-K5GNDW3L7K",
      },
    },
  ],


  // 赞赏在文章下方
  appreciation: {
    position: "doc-after",
    options: {
      // buttonHtml: `<button>测试按钮</button>`,
      icon: "weChatPay", // 赞赏图标，内置 weChatPay 和 alipay
      expandTitle: "打赏支持", // 展开标题，支持 HTML
      collapseTitle: "下次一定", // 折叠标题，支持 HTML
      content: `<img src='/img/alipay/1.png'><img src='/img/alipay/2.png'>`, // 赞赏内容，支持 HTML
      expand: false, // 是否默认展开，默认 false
    },
  },  
});

// https://vitepress.dev/reference/site-config
export default defineConfig({
  extends: teekConfig,
  title: "One",
  description: description,
  cleanUrls: false,
  lastUpdated: true,
  lang: "zh-CN",
  head: HeadData as HeadConfig[],
  markdown: {
    // 开启行号
    lineNumbers: true,
    image: {
      // 默认禁用；设置为 true 可为所有图片启用懒加载。
      lazyLoading: true,
    },
    // 更改容器默认值标题
    container: {
      tipLabel: "提示",
      warningLabel: "警告",
      dangerLabel: "危险",
      infoLabel: "信息",
      detailsLabel: "详细信息",
    },
  },
  sitemap: {
    hostname: "https://vp.teek.top",
    transformItems: items => {
      const permalinkItemBak: typeof items = [];
      // 使用永久链接生成 sitemap
      const permalinks = (globalThis as any).VITEPRESS_CONFIG.site.themeConfig.permalinks;
      items.forEach(item => {
        const permalink = permalinks?.map[item.url];
        if (permalink) permalinkItemBak.push({ url: permalink, lastmod: item.lastmod });
      });
      return [...items, ...permalinkItemBak];
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // logo: "/teek-logo-mini.svg",
    logo: "/favicon.ico",
    darkModeSwitchLabel: "主题",
    sidebarMenuLabel: "菜单",
    returnToTopLabel: "返回顶部",
    lastUpdatedText: "上次更新时间",
    outline: {
      level: [2, 4],
      label: "本页导航",
    },
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },

    nav: Nav, // 导航栏配置    
    // socialLinks: [{ icon: "github", link: "https://github.com/Kele-Bingtang/vitepress-theme-teek" }],
    socialLinks: SocialLinks, // 社交链接配置




    search: {
      provider: "local",
    },
    editLink: {
      text: "在 GitHub 上编辑此页",
      pattern: "https://github.com/Kele-Bingtang/vitepress-theme-teek/edit/master/docs/:path",
    },
  },

  vite: {
    server: {
      // host: "127.0.0.1", // 指定服务器应该监听哪个 IP 地址
      // port: 5173, // 指定开发服务器端口
      // strictPort: true, // 若端口已被占用则会直接退出
      open: true, // 运行后自动打开网页
    },
    
    // 构建
    build: {
      chunkSizeWarningLimit: 1500, // 限制警告的块大小
    },    
  },  
});
