import { Blog } from "./Svgicon";
export const TeekIcon = {
  text: "Teek主题",
  link: "/Teek",
  subMenu: true, // 是否有子菜单
  iconProps: {
    icon: "https://vp.teek.top/teek-logo-mini.svg",
    iconType: "img",
    // size: 12, // 图标大小
  },
};

export const VdoingIcon = {
  text: "Vdoing主题",
  link: "/Vdoing",
  subMenu: true, // 是否有子菜单
  iconProps: {
    icon: "https://vuepress.vuejs.org/images/hero.png",
    iconType: "img",
    size: 16, // 图标大小
  },
};

export const SSLIcon = {
  text: "SSL证书",
  link: "/SSL",
  subMenu: true, // 是否有子菜单
  iconProps: {
    icon: "https://allinssl.com/logo.svg",
    iconType: "img",
    size: 12, // 图标大小
  },
};

export const BlogIcon = {
  text: "博客搭建",
  link: "/Blog",
  subMenu: true, // 是否有子菜单
  iconProps: {
    icon: Blog,
    iconType: "svg",
  },
};
