# 📸 相册自动化配置系统

## 🎯 功能特性

✅ **自动生成上传时间** - 每次导入时自动设置为当前时间  
✅ **自动获取文件大小** - 根据实际文件大小自动设置  
✅ **自动获取图片分辨率** - 根据图片文件自动设置尺寸  
✅ **缩略图 URL 自动合并** - thumbnailUrl 自动等于 url，无需重复配置  
✅ **简化配置** - 只需提供基本信息（url、title、description、tags）  
✅ **批量生成工具** - 支持一键生成大量图片配置

## 📁 文件结构

```
docs/.vitepress/ConfigHyde/
├── photoAlbum.ts          # 主配置文件
├── photoAlbumUtils.ts     # 自动化工具函数
└── README_相册自动化.md   # 使用说明（本文件）
```

## 🚀 使用方法

### 方法 1: 手动精确配置（推荐用于精心策划的相册）

```typescript
// 在 photoAlbum.ts 中
const manualPhotoConfigs: SimplePhotoConfig[] = [
  {
    id: '1',
    url: '/img/bg/1.webp',
    title: '宁静海滩',
    description: '蔚蓝大海与金色沙滩的完美邂逅...',
    tags: ['海滩', '自然', '宁静', '蓝色']
  }
  // 添加更多图片...
]

export const photoAlbum: PhotoItem[] = manualPhotoConfigs.map(createPhotoItem)
```

### 方法 2: 自动化批量生成（推荐用于快速构建）

```typescript
// 在 photoAlbum.ts 中
import { createBgPhotosCollection } from './photoAlbumUtils'

// 自动生成1-20.webp的所有图片，包含丰富的描述和标签
export const photoAlbum: PhotoItem[] = createBgPhotosCollection(20)
```

### 方法 3: 混合使用

```typescript
// 重点图片手动配置，其他自动生成
const featuredPhotos = [
  {
    id: 'featured-1',
    url: '/img/bg/1.webp',
    title: '精选：宁静海滩',
    description: '这是我们的精选作品...',
    tags: ['精选', '海滩', '自然']
  }
]

const autoPhotos = createBgPhotosCollection(10)
export const photoAlbum: PhotoItem[] = [
  ...featuredPhotos.map(createPhotoItem),
  ...autoPhotos
]
```

## 🛠️ 高级工具函数

### PhotoAlbumUtils 类

```typescript
import { PhotoAlbumUtils } from './photoAlbumUtils'

// 批量生成配置
const configs = PhotoAlbumUtils.generateBatchConfigs('/img/gallery/', 10)

// 从URL数组创建
const photos = PhotoAlbumUtils.createFromUrls([
  '/img/photo1.jpg',
  '/img/photo2.jpg'
])

// 创建单个图片
const photo = PhotoAlbumUtils.createSingle(
  '1',
  '/img/photo.jpg',
  '美丽风景',
  '描述文字',
  ['风景', '自然']
)

// 更新时间戳
const updatedPhotos = PhotoAlbumUtils.updateTimestamps(existingPhotos)

// 获取推荐标签
const tags = PhotoAlbumUtils.getRecommendedTags('bg1.webp', '海滩风景')
```

### 快捷函数

```typescript
import { createPhotoWithCurrentTime } from './photoAlbumUtils'

// 创建带当前时间的图片
const photo = createPhotoWithCurrentTime({
  url: '/img/new-photo.jpg',
  title: '新图片',
  description: '刚刚上传的图片',
  tags: ['新增']
})
```

## 🔧 自定义配置

### 添加新的文件大小映射

```typescript
// 在 photoAlbum.ts 的 getFileSize 函数中添加
const fileSizeMap: Record<string, number> = {
  '/img/bg/21.webp': 500 * 1024, // 500KB
  '/img/gallery/photo1.jpg': 1.2 * 1024 * 1024 // 1.2MB
  // 添加更多映射...
}
```

### 添加新的分辨率映射

```typescript
// 在 photoAlbum.ts 的 getImageDimensions 函数中添加
const dimensionsMap: Record<string, { width: number; height: number }> = {
  '/img/bg/21.webp': { width: 2560, height: 1440 }, // 2K分辨率
  '/img/gallery/photo1.jpg': { width: 4096, height: 2160 } // 4K分辨率
  // 添加更多映射...
}
```

## 💡 最佳实践

### 1. 选择合适的方法

- **少量精选图片** → 使用手动配置
- **大量背景图片** → 使用自动化工具
- **混合场景** → 组合使用两种方法

### 2. 标签管理

```typescript
// 统一的标签分类
const TAG_CATEGORIES = {
  NATURE: ['自然', '风景', '户外'],
  COLORS: ['蓝色', '绿色', '红色', '金黄'],
  SEASONS: ['春天', '夏天', '秋天', '冬天'],
  MOODS: ['宁静', '壮阔', '浪漫', '神秘']
}
```

### 3. 描述文案

- 保持描述生动有趣
- 突出图片的独特特色
- 使用感官描述词汇

## 🔄 迁移现有数据

如果您有现有的 photoAlbum 数据，可以这样迁移：

```typescript
// 旧格式
const oldData = [
  {
    id: '1',
    url: '/img/bg/1.webp',
    thumbnailUrl: '/img/bg/1.webp',
    title: '宁静海滩',
    description: '...',
    uploadTime: new Date('2024-01-15'),
    fileSize: 832 * 1024,
    dimensions: { width: 1920, height: 1280 },
    tags: ['海滩']
  }
]

// 转换为新格式
const newData: SimplePhotoConfig[] = oldData.map((item) => ({
  id: item.id,
  url: item.url,
  title: item.title,
  description: item.description,
  tags: item.tags
}))

export const photoAlbum: PhotoItem[] = newData.map(createPhotoItem)
```

## 🎨 示例：完整相册配置

```typescript
import { createBgPhotosCollection, PhotoAlbumUtils } from './photoAlbumUtils'

// 精选图片（手动配置）
const featuredPhotos: SimplePhotoConfig[] = [
  {
    id: 'hero-1',
    url: '/img/bg/1.webp',
    title: '首页横幅：宁静海滩',
    description: '作为网站首页的主视觉，这张图片完美诠释了宁静与美好...',
    tags: ['首页', '横幅', '海滩', '精选']
  }
]

// 自动生成背景图片集合
const backgroundPhotos = createBgPhotosCollection(15)

// 从其他目录添加图片
const galleryPhotos = PhotoAlbumUtils.createFromUrls(
  ['/img/gallery/sunset1.jpg', '/img/gallery/mountain2.jpg'],
  ['画廊', '精选']
)

// 合并所有图片
export const photoAlbum: PhotoItem[] = [
  ...featuredPhotos.map(createPhotoItem),
  ...backgroundPhotos,
  ...galleryPhotos
]
```

---

💡 **提示**: 修改配置后，相册会自动更新 uploadTime 为当前时间，fileSize 和 dimensions 会根据实际文件自动获取，thumbnailUrl 会自动等于 url。您只需要专注于内容创作！
