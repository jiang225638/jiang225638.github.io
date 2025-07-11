---
date: 2025-07-11 14:40:43
title: local-music-guide
permalink: /pages/ff31f6
categories:
  - 
coverImg: /img/bg/2.webp
---
# 本地音乐系统使用指南

## 概述

本地音乐系统已经替代了原有的网络音乐 API，现在可以使用本地存储的音乐文件。系统支持多种主流音乐格式，包括 MP3、FLAC、WAV、OGG、M4A、AAC、WMA 等。

## 目录结构

```
docs/
├── public/
│   ├── music/                    # 音乐文件存放目录
│   │   ├── 周杰伦 - 青花瓷.mp3
│   │   ├── 邓紫棋 - 光年之外.flac
│   │   └── ...
│   └── music-config.json         # 音乐库配置文件
└── .vitepress/
    └── theme/
        └── api/
            └── musicApi.ts       # 本地音乐API
scripts/
└── music-manager.js             # 音乐管理工具
```

## 快速开始

### 1. 添加音乐文件

将你的音乐文件复制到 `docs/public/music/` 文件夹中。

**推荐的文件命名格式：**

- `艺术家 - 歌曲名.格式` (例如：`周杰伦 - 青花瓷.mp3`)
- `艺术家-歌曲名.格式` (例如：`邓紫棋-光年之外.flac`)

### 2. 扫描音乐文件

使用音乐管理工具扫描并更新音乐库：

```bash
# 进入项目根目录
cd /path/to/your/blog

# 扫描音乐文件
node scripts/music-manager.js scan
```

### 3. 查看音乐库

```bash
# 列出所有歌曲
node scripts/music-manager.js list
```

## 音乐管理工具

### 命令列表

```bash
# 显示帮助
node scripts/music-manager.js help

# 扫描音乐文件夹并更新音乐库
node scripts/music-manager.js scan

# 列出所有歌曲
node scripts/music-manager.js list
```

### 支持的格式

- **MP3** - 最常用的格式，兼容性好
- **FLAC** - 无损压缩格式，音质最佳
- **WAV** - 无压缩格式，文件较大
- **OGG** - 开源格式，压缩效率高
- **M4A** - Apple 格式，质量较好
- **AAC** - 高效压缩格式
- **WMA** - Microsoft 格式

## 配置文件说明

`music-config.json` 文件结构：

```json
{
  "musicLibrary": [
    {
      "id": "unique-id",
      "name": "filename.mp3",
      "title": "歌曲标题",
      "artist": "艺术家",
      "album": "专辑名",
      "duration": 240,
      "size": 3840000,
      "format": "MP3",
      "cover": "/img/music-default.png",
      "url": "/music/filename.mp3"
    }
  ],
  "settings": {
    "autoScanEnabled": false,
    "supportedFormats": [
      ".mp3",
      ".flac",
      ".wav",
      ".ogg",
      ".m4a",
      ".aac",
      ".wma"
    ],
    "defaultCover": "/img/music-default.png",
    "musicDirectory": "/music/"
  }
}
```

## 手动管理

### 手动添加歌曲

你也可以直接编辑 `music-config.json` 文件来添加歌曲：

```json
{
  "id": "unique-id",
  "name": "文件名.mp3",
  "title": "歌曲标题",
  "artist": "艺术家",
  "album": "专辑名",
  "duration": 240,
  "size": 3840000,
  "format": "MP3",
  "cover": "/img/custom-cover.jpg",
  "url": "/music/文件名.mp3"
}
```

### 自定义封面

1. 将封面图片放到 `docs/public/img/` 目录
2. 在配置文件中设置 `cover` 字段为图片路径

## 功能特点

### 搜索功能

- 支持按歌曲名搜索
- 支持按艺术家搜索
- 支持按专辑搜索
- 实时搜索结果

### 热门搜索

- 基于本地音乐库生成热门关键词
- 展示常见艺术家和歌曲

### 搜索历史

- 自动保存搜索历史
- 支持快速重复搜索
- 可清空搜索历史

### 播放功能

- 立即播放
- 添加到播放列表
- 显示歌曲时长
- 音乐格式显示

## 最佳实践

### 1. 文件组织

```
docs/public/music/
├── 华语流行/
│   ├── 周杰伦 - 青花瓷.mp3
│   └── 邓紫棋 - 光年之外.flac
├── 欧美流行/
│   └── Taylor Swift - Love Story.mp3
└── 古典音乐/
    └── 贝多芬 - 月光奏鸣曲.wav
```

### 2. 命名规范

- 使用统一的命名格式：`艺术家 - 歌曲名.格式`
- 避免特殊字符：`/ \ : * ? " < > |`
- 使用中文或英文，保持一致性

### 3. 音质选择

- **日常听音**：MP3 320kbps
- **高音质要求**：FLAC 无损
- **存储空间有限**：AAC 256kbps

### 4. 批量处理

```bash
# 扫描新添加的文件
node scripts/music-manager.js scan

# 定期检查音乐库状态
node scripts/music-manager.js list
```

## 故障排除

### 常见问题

1. **音乐文件不显示**

   - 检查文件格式是否支持
   - 运行扫描命令更新音乐库
   - 检查文件路径是否正确

2. **搜索结果为空**

   - 确认音乐库已更新
   - 检查搜索关键词
   - 查看浏览器控制台错误

3. **播放失败**
   - 检查音乐文件是否存在
   - 确认文件路径正确
   - 检查浏览器是否支持该格式

### 调试方法

1. **检查配置文件**

   ```bash
   cat docs/public/music-config.json
   ```

2. **检查音乐文件**

   ```bash
   ls -la docs/public/music/
   ```

3. **重新扫描**
   ```bash
   node scripts/music-manager.js scan
   ```

## 进阶功能

### 自定义封面

1. 准备专辑封面图片（推荐 300x300 像素）
2. 放置到 `docs/public/img/` 目录
3. 在配置文件中设置对应的 `cover` 路径

### 歌词支持

系统支持未来扩展 LRC 格式歌词文件：

1. 将同名 `.lrc` 文件放到音乐文件旁边
2. 系统会自动关联显示歌词

### 批量导入

对于大量音乐文件，可以编写自定义脚本：

```javascript
const MusicManager = require('./scripts/music-manager.js')
const manager = new MusicManager()

// 批量添加音乐
manager.updateLibrary()
manager.saveConfig()
```

## 维护建议

- 定期备份 `music-config.json` 文件
- 定期清理无效的音乐文件引用
- 保持文件命名的一致性
- 适时更新音乐库索引

---

> 💡 **提示**：如果遇到问题，请检查浏览器控制台的错误信息，这通常能帮助定位问题。
