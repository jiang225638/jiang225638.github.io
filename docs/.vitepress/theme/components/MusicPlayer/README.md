# 🎵 网易云音乐播放器组件

基于 Vue 3 + TypeScript 构建的网易云音乐播放器组件，仿照网易云音乐官方界面设计。

## ✨ 功能特性

- 🎵 **海量曲库**: 接入网易云音乐 API，提供丰富的音乐资源
- 🔍 **智能搜索**: 支持歌曲、歌手、专辑多维度搜索
- 📝 **同步歌词**: 实时显示歌词，支持翻译和点击跳转
- 🎚️ **播放控制**: 支持播放/暂停、上一首/下一首、进度调节
- 🔊 **音量控制**: 音量调节和静音功能
- 🔄 **播放模式**: 顺序播放、列表循环、随机播放、单曲循环
- 💾 **状态保存**: 自动保存播放状态和历史记录
- 📱 **响应式设计**: 支持桌面端和移动端

## 🏗️ 组件结构

```
MusicPlayer/
├── MusicPlayer.vue          # 主播放器组件
├── ProgressBar.vue          # 进度条组件
├── VolumeControl.vue        # 音量控制组件
├── PlayList.vue             # 播放列表组件
├── LyricsDisplay.vue        # 歌词显示组件
├── MusicSearch.vue          # 音乐搜索组件
└── README.md               # 使用说明
```

## 🚀 快速开始

### 1. 基本使用

```vue
<template>
  <div class="music-container">
    <MusicPlayer />
  </div>
</template>

<script setup>
import MusicPlayer from './components/MusicPlayer/MusicPlayer.vue'
</script>
```

### 2. 页面集成

```vue
<template>
  <div class="music-page">
    <MusicPlayerPage />
  </div>
</template>

<script setup>
import MusicPlayerPage from './components/MusicPlayerPage.vue'
</script>
```

## 🎹 操作指南

### 播放控制

- **播放/暂停**: 点击主播放按钮或封面上的播放按钮
- **上一首/下一首**: 点击对应的控制按钮
- **进度跳转**: 点击进度条任意位置或拖拽进度球
- **音量调节**: 点击音量图标切换静音，拖拽音量滑块调节音量

### 播放模式

- **顺序播放**: 按播放列表顺序播放
- **列表循环**: 播放完最后一首后从第一首开始
- **随机播放**: 随机选择下一首歌曲
- **单曲循环**: 重复播放当前歌曲

### 搜索音乐

1. 点击"搜索"标签页
2. 在搜索框中输入歌曲名、歌手名或专辑名
3. 按回车键或点击搜索按钮
4. 在搜索结果中选择歌曲：
   - 点击播放按钮立即播放
   - 点击添加按钮加入播放列表

### 歌词功能

- **自动滚动**: 歌词会随播放进度自动滚动高亮
- **手动跳转**: 点击任一行歌词跳转到对应时间点
- **翻译显示**: 如果歌曲有翻译，可点击"译"按钮显示/隐藏翻译
- **回到当前**: 点击星形按钮回到当前播放位置

### 播放列表管理

- **添加歌曲**: 通过搜索功能添加歌曲到播放列表
- **播放歌曲**: 双击歌曲项或点击播放按钮
- **移除歌曲**: 点击歌曲项右侧的删除按钮
- **清空列表**: 点击播放列表头部的"清空列表"按钮

## 🔧 API 配置

### 网易云音乐 API

组件使用网易云音乐 API 获取音乐数据，默认配置：

```typescript
const API_BASE_URL = 'https://netease-cloud-music-api-nu-seven.vercel.app'
const BACKUP_API_URL = 'https://netease-music-api.herokuapp.com'
```

如需使用自己的 API 服务器，请修改 `docs/.vitepress/theme/api/musicApi.ts` 文件中的配置。

### 支持的 API 接口

- 🔍 歌曲搜索: `/search`
- 🎵 歌曲详情: `/song/detail`
- 🔗 播放地址: `/song/url`
- 📝 歌词获取: `/lyric`
- 🔥 热门搜索: `/search/hot`
- 📋 歌单详情: `/playlist/detail`
- ✅ 歌曲检查: `/check/music`

## 📱 响应式设计

组件针对不同屏幕尺寸进行了优化：

- **桌面端** (>768px): 完整功能界面
- **平板端** (768px-480px): 适配平板显示
- **手机端** (<480px): 简化移动界面

## 💾 数据存储

播放器会自动保存以下数据到本地存储：

- **播放状态**: 播放列表、当前歌曲、播放模式、音量等
- **播放历史**: 最近播放的 100 首歌曲
- **搜索历史**: 最近搜索的 10 个关键词

数据存储在 `localStorage` 中，浏览器清理缓存时会丢失。

## 🎨 自定义样式

组件支持通过 CSS 变量自定义主题色彩：

```css
.music-player-container {
  --primary-color: #e74c3c;
  --background-color: rgba(255, 255, 255, 0.95);
  --text-color: #333;
  --border-color: rgba(0, 0, 0, 0.1);
}
```

## ⚠️ 注意事项

1. **API 限制**: 网易云音乐 API 可能有访问限制，建议部署自己的 API 服务
2. **跨域问题**: 在开发环境可能遇到跨域问题，可使用 CORS 插件解决
3. **版权声明**: 仅供学习使用，请支持正版音乐
4. **网络依赖**: 需要良好的网络环境才能正常播放音乐

## 🔍 故障排除

### 常见问题

**Q: 搜索不到歌曲或无法播放？** A: 检查网络连接和 API 服务状态，可能是 API 服务不可用。

**Q: 歌曲播放卡顿？** A: 可能是网络带宽不足或 API 服务响应慢，建议使用稳定的网络环境。

**Q: 歌词不显示？** A: 部分歌曲可能没有歌词数据，或歌词加载失败。

**Q: 界面显示异常？** A: 检查浏览器兼容性，建议使用现代浏览器（Chrome、Firefox、Safari 等）。

## 📄 许可证

本项目基于 MIT 许可证开源，仅供学习和技术展示使用。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进这个项目！
