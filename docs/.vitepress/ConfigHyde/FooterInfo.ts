// 底部信息配置
import { version } from "vitepress-theme-teek/es/version"; // 导入版本号

export const FooterInfo = {
  topMessage: [
    `<span><img alt="VitePress" src="https://liuyuyang.net/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fanimals.65eaf6e3.webp&w=750&q=75"><span/>`,
  
    `<a target="_blank" href="https://vitepress.dev/" title="本站框架基于 VitePress_v1.6.3" ><img alt="VitePress" src="https://img.shields.io/badge/Frame-VitePress-4868C2?logo=vitepress&amp;logoColor=fff" ></a>

    <a target="_blank" href="http://creativecommons.org/licenses/by-nc-sa/4.0/" title="本站内容采用 CC BY-NC-SA 4.0 国际许可协议进行许可"><img alt="Copyright" src="https://img.shields.io/badge/Copyright-BY--NC--SA%204.0-d42328?logo=coursera&amp;logoColor=fff"></a>
    
    <a target="_blank" href="https://twikoo.js.org/" title="本站评论系统使用 Twikoo" ><img alt="Twikoo" src="https://img.shields.io/badge/Comments-Twikoo-0072F9"></a>
    
    <a target="_blank" href="https://www.algolia.com/" title="本站搜索服务使用 Algolia"><img alt="Algolia" src="https://img.shields.io/badge/Search-Algolia-3095FA?logo=Algolia"></a>

    <a target="_blank" href="https://www.ucloud.cn/" title="本站部署服务使用 ucloud"><img alt="ucloud" src="https://img.shields.io/badge/Ucloud-Server?logo=alibabacloud&label=Server&color=%23FF6A00"></a> 

    <a target="_blank" href="https://www.dogecloud.com/" title="本站部署服务使用 dogecloud"><img alt="dogecloud" src="https://img.shields.io/badge/多吉云-CDN?logo=alibabacloud&label=CDN&color=%23FF6A00"></a>
    
    <a target="_blank" href="https://umami.is/" title="本站统计服务使用 Umami"><img alt="Umami" src="https://img.shields.io/badge/umami-000000?logo=umami&label=Count&color=%23FF6A00"></a>

    
    <a target="_blank" href="https://nginx.org/" title="本站Nginx反向代理服务 Nginx"><img alt="Nginx" src="https://img.shields.io/badge/Nginx-Proxy?logo=Nginx&label=Proxy"></a>`,
  ],
  theme: {
    name: `Theme By Teek@${version}-2025-06-03`,
  },
  bottomMessage: [
    `<script id="LA-DATA-WIDGET" crossorigin="anonymous" charset="UTF-8" src="https://v6-widget.51.la/v6/3LmZHLhDZIDpMaT0/quote.js?theme=#1690FF,#333333,#999999,#007BFF,#FFFFFF,#1690FF,12&f=12&display=0,0,1,1,1,1,1,1"></script>`,
    `<span id="runtime"></span>(●'◡'●)`,
    `<a href="https://51.la/" target="_blank" style="display:flex;align-items:center;justify-content:center;">本网站由<img src="https://51.la/favicon.ico" style="width:16px;height:16px;" alt="51.LA"> 51.LA 提供数据统计服务</a>`,
    "唯一真正的智慧，是知道自己一无所知。 —— 来自 J",
  ],
  copyright: {
    createYear: 2021,
    suffix: "J Blog",
  },
  icpRecord: {
    name: "陇ICP备2023002645号",
    link: "http://beian.miit.gov.cn/",
  },
  // 网络安全备案信息配置
  securityRecord: {
    name: "甘公网安备62102702000211号",
    link: "https://beian.mps.gov.cn/",
  },
  customHtml: ``, // 搭配 ./theme/composables/useRuntime.ts
};
