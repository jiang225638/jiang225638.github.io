---
layout: home
layoutClass: 'm-home-layout'

hero:
  name: 点点滴滴
  text: 
  tagline: 生命是不倒行的，也不与昨日一同停留。
  image:
    src: /logo1.gif
    alt: 物语
  actions:
    - text: one
      link:
    - text: two
      link: /nav/
      theme: alt
    - text: three
      link:
    - text: four
      link: /test
      theme: alt
features:
  - icon: 📖
    title: 常用知识点
    details: 整理前端常用知识点<small>（面试八股文）</small><br />如有异议按你的理解为主，不接受反驳
    link: 
    linkText: 原理解读
  - icon: 📘
    title: 源码阅读
    details: 了解各种库的实现原理<br />学习其中的小技巧和冷知识
    link: 
    linkText: 源码阅读
  - icon: 💡
    title: 工作经验
    details: 在工作中学到的一切<small>（常用库/工具/奇淫技巧等）</small><br />配合 CV 大法来更好的摸鱼
    link: 
    linkText: 常用工具库
  - icon: 🧰
    title: 提效工具
    details: 工欲善其事，必先利其器<br />记录开发和日常使用中所用到的软件、插件、扩展等
    link: 
    linkText: 提效工具
  - icon: 🐞
    title: 踩坑记录
    details: 那些年我们踩过的坑<br />总有一些让你意想不到的问题
    link: 
    linkText: 踩坑记录
  - icon: 💯
    title: 只要你有一件合理的事去做，你的生活就会显得特别美好 。
    details: '<small class="bottom-small">一个想躺平的小开发</small>'
    link: 
---

<style>
/*爱的魔力转圈圈*/
.m-home-layout .image-src:hover {
  transform: translate(-50%, -50%) rotate(666turn);
  transition: transform 59s 1s cubic-bezier(0.3, 0, 0.8, 1);
}

.m-home-layout .details small {
  opacity: 0.8;
}

.m-home-layout .bottom-small {
  display: block;
  margin-top: 2em;
  text-align: right;
}
</style>
