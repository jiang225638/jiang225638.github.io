# 📸 自动化相册系统使用说明

## 🎯 核心特性

✅ **ID 自动排序** - 根据配置顺序自动生成 1, 2, 3...  
✅ **当前时间自动设置** - `uploadTime` 自动设置为当前时间  
✅ **文件大小自动获取** - 使用 `fetch` API 获取真实文件大小  
✅ **图片尺寸自动获取** - 使用 `new Image()` 获取真实分辨率  
✅ **缩略图自动合并** - `thumbnailUrl` 自动等于 `url`  
✅ **极简配置** - 只需填写 `url`、`title`、`description`、`tags`

## 📁 文件结构

```
docs/
├── .vitepress/
│   ├── ConfigHyde/
│   │   └── photoAlbum.ts          # 相册配置（只需填写基本信息）
│   └── theme/components/PhotoAlbum/
│       ├── autoPhotoUtils.ts      # 自动化工具函数
│       ├── LocalPhotoService.ts   # 相册服务（已更新支持异步）
│       ├── types.ts              # 类型定义
│       └── README.md             # 本文档
└── public/img/bg/                # 图片文件
```

## 🚀 快速开始

### 1. 配置相册 (`photoAlbum.ts`)

```typescript
// 只需要填写这 4 个字段，其他全部自动生成！
export const photoConfigs: SimplePhotoConfig[] = [
  {
    url: '/img/bg/1.webp',
    title: '宁静海滩',
    description: '蔚蓝大海与金色沙滩的完美邂逅...',
    tags: ['海滩', '自然', '宁静', '蓝色']
  },
  {
    url: '/img/bg/2.webp',
    title: '森林深处',
    description: '阳光透过茂密的树叶洒向大地...',
    tags: ['森林', '绿色', '阳光', '自然']
  }
  // 继续添加更多图片...
]
```

### 2. 自动生成完整数据

配置会自动转换为：

```typescript
// 自动生成的完整 PhotoItem 对象
{
  id: "1",                    // ✨ 自动排序
  url: "/img/bg/1.webp",
  thumbnailUrl: "/img/bg/1.webp", // ✨ 自动合并
  title: "宁静海滩",
  description: "蔚蓝大海与金色沙滩的完美邂逅...",
  uploadTime: new Date(),     // ✨ 自动设置为当前时间
  fileSize: 851968,          // ✨ 使用 fetch 自动获取 (832KB)
  dimensions: {              // ✨ 使用 new Image() 自动获取
    width: 1920,
    height: 1280
  },
  tags: ["海滩", "自然", "宁静", "蓝色"]
}
```

### 3. 使用相册服务

```typescript
import { localPhotoService } from './LocalPhotoService'

// 所有方法现在都是异步的
const photos = await localPhotoService.getPhotos()
const photo = await localPhotoService.getPhotoById('1')
const results = await localPhotoService.searchPhotos('海滩')
const stats = await localPhotoService.getStats()
```

## 🛠️ 自动化工具函数

### `createPhotoAlbum(configs)`

批量创建完整相册：

```typescript
import { createPhotoAlbum } from './autoPhotoUtils'
import { photoConfigs } from '../../../ConfigHyde/photoAlbum'

const photos = await createPhotoAlbum(photoConfigs)
console.log(photos) // 完整的 PhotoItem 数组
```

### `createSinglePhoto(url, title, description, tags)`

创建单个相册项：

```typescript
import { createSinglePhoto } from './autoPhotoUtils'

const photo = await createSinglePhoto(
  '/img/new-photo.jpg',
  '新图片',
  '刚刚上传的图片',
  ['新增', '测试']
)
```

### `getImageFileSize(url)` 和 `getImageDimensions(url)`

手动获取图片信息：

```typescript
import { getImageFileSize, getImageDimensions } from './autoPhotoUtils'

const size = await getImageFileSize('/img/photo.jpg')
const { width, height } = await getImageDimensions('/img/photo.jpg')
```

## 💻 在组件中使用

### Vue 组件示例

```vue
<template>
  <div class="photo-gallery">
    <div v-if="loading">正在加载相册...</div>
    <div v-else class="photos-grid">
      <img
        v-for="photo in photos"
        :key="photo.id"
        :src="photo.url"
        :alt="photo.title"
        @click="viewPhoto(photo)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { localPhotoService } from './LocalPhotoService'

const photos = ref([])
const loading = ref(true)

onMounted(async () => {
  photos.value = await localPhotoService.getPhotos()
  loading.value = false
})

const viewPhoto = (photo) => {
  console.log('查看照片:', photo.title)
}
</script>
```

## 🔧 高级配置

### 自定义 ID 生成

```typescript
import { createPhotoItem } from './autoPhotoUtils'

// 使用自定义ID
const customConfig = {
  url: '/img/special.jpg',
  title: '特殊图片',
  description: '具有自定义ID的图片',
  tags: ['特殊']
}

const photo = await createPhotoItem(customConfig, -1) // index为-1
photo.id = 'custom-id-001' // 手动设置ID
```

### 批量生成模板

```typescript
import { generateConfigTemplate } from './autoPhotoUtils'

// 生成配置模板
const templates = generateConfigTemplate('/img/gallery/', 10, 1)
console.log(templates)
// 输出：
// [
//   { url: '/img/gallery/1.webp', title: '图片 1', description: '请填写图片 1 的描述', tags: ['待分类'] },
//   { url: '/img/gallery/2.webp', title: '图片 2', description: '请填写图片 2 的描述', tags: ['待分类'] },
//   ...
// ]
```

### 验证图片 URL

```typescript
import { isValidImageUrl } from './autoPhotoUtils'

console.log(isValidImageUrl('/img/photo.jpg')) // true
console.log(isValidImageUrl('/img/photo.webp')) // true
console.log(isValidImageUrl('/img/photo.txt')) // false
```

## 📈 性能优化

### 1. 图片懒加载

系统自动并行获取文件大小和尺寸：

```typescript
// 内部实现 - 并行获取信息
const [fileSize, dimensions] = await Promise.all([
  getImageFileSize(config.url),
  getImageDimensions(config.url)
])
```

### 2. 缓存机制

相册数据只加载一次：

```typescript
// 首次调用时加载，后续调用使用缓存
let isPhotosLoaded = false
let localPhotos: PhotoItem[] = []
```

### 3. 错误处理

自动处理图片加载失败：

```typescript
// 如果图片加载失败，使用默认尺寸
img.onerror = () => {
  resolve({ width: 1920, height: 1080 })
}
```

## 🎨 添加新图片

### 简单添加

在 `photoConfigs` 数组中添加新配置：

```typescript
export const photoConfigs: SimplePhotoConfig[] = [
  // ... 现有配置
  {
    url: '/img/bg/新图片.webp',
    title: '新图片标题',
    description: '新图片的描述文字',
    tags: ['新标签', '分类']
  }
]
```

### 批量添加

```typescript
const newPhotos = [
  {
    url: '/img/gallery/sunset1.jpg',
    title: '日落美景',
    description: '金色的夕阳西下',
    tags: ['日落', '美景']
  },
  {
    url: '/img/gallery/mountain2.jpg',
    title: '雄伟山峰',
    description: '高耸入云的山峰',
    tags: ['山峰', '雄伟']
  }
]

export const photoConfigs: SimplePhotoConfig[] = [
  ...existingConfigs,
  ...newPhotos
]
```

## 🔍 调试和监控

系统会在控制台输出详细信息：

```
正在自动生成相册数据...
开始生成相册，正在获取图片信息...
相册生成完成，共 10 张图片
相册数据生成完成，共 10 张图片
```

如果出现错误，会显示：

```
无法获取图片 /img/xxx.jpg 的文件大小: NetworkError
无法获取图片 /img/xxx.jpg 的尺寸: Error loading image
```

---

## 🎯 总结

新的自动化系统让您只需要关注内容创作：

- **只填写 4 个字段**：`url`、`title`、`description`、`tags`
- **6 个字段自动生成**：`id`、`thumbnailUrl`、`uploadTime`、`fileSize`、`dimensions`
- **真实数据**：文件大小和尺寸都是从实际文件获取
- **现代化**：支持异步加载，错误处理完善

享受简单而强大的相册管理体验！ 🎉
