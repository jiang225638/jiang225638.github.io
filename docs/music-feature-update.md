# 🎵 音乐播放器功能更新说明

## ✨ 新增功能

### 1. **自动加载本地音乐库**

- ✅ 播放列表默认显示 music 文件夹下的所有音乐
- ✅ 启动时自动加载所有本地音乐文件
- ✅ 无需手动添加，即开即用

### 2. **本地歌词支持**

- ✅ 支持从 lyric 文件夹读取.lrc 格式歌词文件
- ✅ 多种文件名匹配格式：
  - `歌曲名.lrc`
  - `艺术家-歌曲名.lrc`
  - `歌曲名-艺术家.lrc`
  - `文件名.lrc`
- ✅ 自动解析时间轴和歌词内容
- ✅ 歌词同步显示（如果有歌词文件）

### 3. **天蓝色默认封面**

- ✅ 没有封面图片时显示优雅的天蓝色渐变背景
- ✅ 包含音符图标装饰
- ✅ 统一的视觉体验，不再显示默认图标
- ✅ 适配所有播放器界面（主播放器、迷你模式、播放列表、搜索结果）

## 🎯 功能详情

### 自动音乐库加载

```javascript
// 启动时自动执行
const allSongs = await getAllSongs()
musicStore.addToPlaylist(allSongs)
```

- 扫描 music 文件夹下的所有支持格式音乐
- 自动解析文件名获取艺术家和歌曲信息
- 加载到播放列表，即可开始播放

### 歌词文件支持

```
docs/public/lyric/
├── 女儿国.lrc          # 对应 女儿国.mp3
├── 燕归巢.lrc          # 对应 燕归巢.mp3
├── 艺术家-歌曲名.lrc    # 另一种命名格式
└── ...
```

- 支持标准 LRC 格式：`[mm:ss.xxx]歌词内容`
- 自动时间轴同步
- 智能文件名匹配

### 天蓝色背景样式

```css
/* 主播放器封面 */
.album-cover.no-cover {
  background: linear-gradient(135deg, #87ceeb 0%, #4682b4 100%);
}

/* 播放列表小封面 */
.song-cover.no-cover::before {
  content: '♪';
  color: white;
}
```

## 📁 文件结构

```
docs/public/
├── music/              # 音乐文件
│   ├── 女儿国.mp3
│   ├── 燕归巢.mp3
│   └── ...
├── lyric/              # 歌词文件
│   ├── 女儿国.lrc
│   ├── 燕归巢.lrc
│   └── ...
└── music-config.json   # 音乐库配置
```

## 🚀 使用方法

### 1. 添加音乐

1. 将音乐文件放入 `docs/public/music/` 文件夹
2. 运行扫描命令：
   ```bash
   node scripts/music-manager.js scan
   ```
3. 刷新播放器页面，音乐自动出现在播放列表

### 2. 添加歌词

1. 将.lrc 歌词文件放入 `docs/public/lyric/` 文件夹
2. 确保文件名与音乐文件对应
3. 刷新页面，歌词自动加载

### 3. 自定义封面

1. 创建 `docs/public/img/covers/` 文件夹
2. 添加对应的封面图片文件
3. 在 `music-config.json` 中设置 `cover` 路径
4. 如果不设置，将显示美观的天蓝色背景

## 🎨 视觉效果

### 封面显示逻辑

```
有封面图片 → 显示图片
无封面图片 → 天蓝色渐变背景 + 音符图标
```

### 颜色方案

- **主色调**：天蓝色到钢蓝色渐变 (#87CEEB → #4682B4)
- **图标**：白色音符符号，带阴影效果
- **适配**：所有播放器界面统一风格

## ⚙️ 技术实现

### 歌词解析

```javascript
// 解析LRC格式
const match = line.match(/\[(\d{2}):(\d{2})\.?(\d{0,3})\](.*)/)
// 计算时间戳
const time = parseInt(minutes) * 60 + parseInt(seconds) + ms / 1000
```

### 封面处理

```javascript
// 图片加载失败时
const handleImageError = (event) => {
  const img = event.target
  img.style.display = 'none'
  img.parentElement.classList.add('no-cover')
}
```

### 自动加载

```javascript
// 组件挂载时
onMounted(async () => {
  const allSongs = await getAllSongs()
  musicStore.addToPlaylist(allSongs)
})
```

## 📋 当前状态

✅ **已完成功能**：

- [x] 自动加载 music 文件夹所有音乐
- [x] 本地.lrc 歌词文件支持
- [x] 天蓝色默认封面背景
- [x] 多种歌词文件命名格式支持
- [x] 统一的视觉体验

✅ **测试确认**：

- [x] 2 首音乐自动加载到播放列表
- [x] 歌词文件路径匹配正常
- [x] 天蓝色背景显示正常
- [x] 所有播放器界面风格统一

## 🔄 后续扩展

### 可选功能

1. **批量歌词下载**：自动获取歌词文件
2. **封面自动匹配**：从文件名或网络获取封面
3. **音乐标签读取**：从音频文件的元数据读取信息
4. **播放列表管理**：创建和管理自定义播放列表

### 配置选项

- 封面显示模式（图片/纯色/渐变）
- 歌词文件路径自定义
- 自动加载开关

---

> 🎵 **享受您的本地音乐体验！** 现在您可以轻松管理和播放本地音乐，享受完整的播放列表和歌词功能。
