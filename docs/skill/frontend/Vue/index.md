---
sticky: 999
title: 🔧 文章配置详情
readingTime: true
tag:
  - 配置
recommend: 3
description: 文章配置详情
top: 1
sidebar: false
cover: false
---

# 文章配置详情

```ts

---
description: 简单介绍主题的由来和实现原理 // 用于设置文章在首页卡片列表里展示的 描述信息
# 使用自定义的HTML内容设置文章在首页卡片列表里展示的描述信息
descriptionHTML: '
<span style="color:var(--description-font-color);">1分钟内完成自己的博客创建</span>
<pre style="background-color: #292b30; padding: 15px; border-radius: 10px;" class="shiki material-theme-palenight"><code>
    <span class="line"><span style="color:#FFCB6B;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">create</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">@sugarat/theme@latest</span></span>
</code>
</pre>'
#  hiddenCover 控制是否展示当前文章的封面，全局配置开关见 article.hiddenCover，如果hiddenCover为 true 则不会在文章页展示上述的封面
hiddenCover: true
# cover: url 用于设置文章在首页卡片列表里展示的 封面信息 未指定时，默认取文章中出现的第一张图片,同时如果手动设置了，封面将同时在文章页展示
cover: false
# 用于设置文章是否出现在首页的列表里, 比如设置在changelog.md里，首页将不会展示此项
hidden: true
# 用于单独设置文章的作者信息
author: 粥里有勺糖
# 单独设置是否展示文章的预计阅读时间，全局配置开关见 article.readingTime
readingTime: true
# 单独为某篇文章设置是否开启评论
comment: false
# 单独设置文章的发布时间，不设置的情况下默认会通过Git取文件最后修改时间，设置为 false 则不会在文章页展示
date: 2023-01-04
# 用于按标签给文章分类，同时，在文章页标签可点击跳转 
tag:
 - 日志
tags:
 - 信息
categories:
 - 测试分类
# 用于设置在首页展示的 精选文章，值越大展示越靠前
sticky: 1
# 用于设置在首页置顶展示的文章，从 1 开始，值越小越靠前
top: 1

recommend: 1 // #可用于配置左侧推荐列表数据表现，默认只展示同级目录下的文章
// 文章左侧展示的 推荐文章 顺序（越小越靠前）
// 在推荐列表中隐藏掉不展示
// 手动关联不同目录的文章进行展现

publish: false // 表明文章是否发布，用于设置文章是否出现在首页和侧边栏里

# 用于单独控制某篇文章底部按钮，点击按钮会在按钮下方渲染一个自定义的html内容，例如可以用来做赞赏按钮，内置了 wechatPay 和 aliPay 两个图标，也可自定义图标(svg)。
buttonAfterArticle:
  openTitle: 投币
  closeTitle: 下次一定
  content: '<img src="https://img.cdn.sugarat.top/mdImg/MTY0Nzc1NTYyOTE5Mw==647755629193">'
  icon: aliPay
  # size: small
  # expand: true
---
```


