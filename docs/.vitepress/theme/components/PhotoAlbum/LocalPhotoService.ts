import type { PhotoItem } from './types'

// 本地图片数据
const localPhotos: PhotoItem[] = [
  {
    id: '1',
    url: '/img/bg/1.webp',
    thumbnailUrl: '/img/bg/1.webp',
    title: '宁静海滩',
    description:
      '蔚蓝大海与金色沙滩的完美邂逅，温柔的海浪轻抚着岸边，带来内心的宁静与平和。',
    uploadTime: new Date('2024-01-15'),
    fileSize: 832 * 1024,
    dimensions: { width: 1920, height: 1280 },
    tags: ['海滩', '自然', '宁静', '蓝色']
  },
  {
    id: '2',
    url: '/img/bg/2.webp',
    thumbnailUrl: '/img/bg/2.webp',
    title: '森林深处',
    description:
      '阳光透过茂密的树叶洒向大地，形成斑驳的光影，仿佛走进了童话世界的秘境。',
    uploadTime: new Date('2024-01-16'),
    fileSize: 115 * 1024,
    dimensions: { width: 1920, height: 1440 },
    tags: ['森林', '绿色', '阳光', '自然']
  },
  {
    id: '3',
    url: '/img/bg/3.webp',
    thumbnailUrl: '/img/bg/3.webp',
    title: '星空夜景',
    description:
      '璀璨的星河横跨夜空，远山如黛，在这静谧的夜晚里，感受宇宙的浩瀚与神秘。',
    uploadTime: new Date('2024-01-17'),
    fileSize: 200 * 1024,
    dimensions: { width: 1920, height: 1200 },
    tags: ['星空', '夜景', '山脉', '神秘']
  },
  {
    id: '4',
    url: '/img/bg/4.webp',
    thumbnailUrl: '/img/bg/4.webp',
    title: '春日樱花',
    description:
      '粉色的樱花漫天飞舞，春风轻拂，花瓣如雪花般飘落，诗意盎然的浪漫时刻。',
    uploadTime: new Date('2024-01-18'),
    fileSize: 285 * 1024,
    dimensions: { width: 1920, height: 1600 },
    tags: ['樱花', '春天', '粉色', '浪漫']
  },
  {
    id: '5',
    url: '/img/bg/5.webp',
    thumbnailUrl: '/img/bg/5.webp',
    title: '高山云海',
    description:
      '云雾缭绕的高山之巅，云海翻腾如波涛，站在峰顶俯瞰，感受大自然的壮阔。',
    uploadTime: new Date('2024-01-19'),
    fileSize: 151 * 1024,
    dimensions: { width: 1920, height: 1300 },
    tags: ['高山', '云海', '壮阔', '白色']
  },
  {
    id: '6',
    url: '/img/bg/6.webp',
    thumbnailUrl: '/img/bg/6.webp',
    title: '秋叶飞舞',
    description:
      '金秋时节，枫叶正红，微风吹过，片片红叶翩翩起舞，编织着秋天的诗篇。',
    uploadTime: new Date('2024-01-20'),
    fileSize: 340 * 1024,
    dimensions: { width: 1920, height: 1100 },
    tags: ['秋天', '枫叶', '红色', '金黄']
  },
  {
    id: '7',
    url: '/img/bg/7.webp',
    thumbnailUrl: '/img/bg/7.webp',
    title: '湖光山色',
    description:
      '碧绿的湖水如镜面般平静，倒映着远山和蓝天白云，构成一幅天然的水墨画。',
    uploadTime: new Date('2024-01-21'),
    fileSize: 306 * 1024,
    dimensions: { width: 1920, height: 1350 },
    tags: ['湖泊', '倒影', '山景', '绿色']
  },
  {
    id: '8',
    url: '/img/bg/8.webp',
    thumbnailUrl: '/img/bg/8.webp',
    title: '夕阳西下',
    description:
      '橙红色的夕阳缓缓沉入地平线，天空被染成绚烂的暖色调，美不胜收的黄昏时光。',
    uploadTime: new Date('2024-01-22'),
    fileSize: 218 * 1024,
    dimensions: { width: 1920, height: 1500 },
    tags: ['夕阳', '黄昏', '橙色', '温暖']
  },
  {
    id: '9',
    url: '/img/bg/9.webp',
    thumbnailUrl: '/img/bg/9.webp',
    title: '雪山雄姿',
    description:
      '皑皑白雪覆盖的山峰直插云霄，雪山在阳光下闪闪发光，展现着大自然的纯净与庄严。',
    uploadTime: new Date('2024-01-23'),
    fileSize: 561 * 1024,
    dimensions: { width: 1920, height: 1250 },
    tags: ['雪山', '白色', '纯净', '雄伟']
  },
  {
    id: '10',
    url: '/img/bg/10.webp',
    thumbnailUrl: '/img/bg/10.webp',
    title: '田园风光',
    description:
      '金黄的麦田随风摆动，远处的农舍炊烟袅袅，勾勒出宁静美好的田园生活画卷。',
    uploadTime: new Date('2024-01-24'),
    fileSize: 281 * 1024,
    dimensions: { width: 1920, height: 1180 },
    tags: ['田园', '麦田', '金黄', '乡村']
  },
  {
    id: '11',
    url: '/img/bg/11.webp',
    thumbnailUrl: '/img/bg/11.webp',
    title: '城市夜景',
    description:
      '繁华都市的夜晚灯火璀璨，高楼大厦如星座般闪烁，展现着现代文明的魅力。',
    uploadTime: new Date('2024-01-25'),
    fileSize: 148 * 1024,
    dimensions: { width: 1920, height: 1400 },
    tags: ['城市', '夜景', '灯光', '现代']
  },
  {
    id: '12',
    url: '/img/bg/12.webp',
    thumbnailUrl: '/img/bg/12.webp',
    title: '花海绽放',
    description:
      '五彩斑斓的花海一望无际，蝴蝶在花丛中翩翩起舞，春天的生机与活力扑面而来。',
    uploadTime: new Date('2024-01-26'),
    fileSize: 483 * 1024,
    dimensions: { width: 1920, height: 1080 },
    tags: ['花海', '五彩', '春天', '生机']
  },
  {
    id: '13',
    url: '/img/bg/13.webp',
    thumbnailUrl: '/img/bg/13.webp',
    title: '沙漠日出',
    description:
      '金色的沙丘在晨光中闪闪发光，太阳从地平线上缓缓升起，沙漠展现着独特的壮美。',
    uploadTime: new Date('2024-01-27'),
    fileSize: 462 * 1024,
    dimensions: { width: 1920, height: 1080 },
    tags: ['沙漠', '日出', '金色', '壮美']
  },
  {
    id: '14',
    url: '/img/bg/14.webp',
    thumbnailUrl: '/img/bg/14.webp',
    title: '瀑布奇观',
    description:
      '巨大的瀑布从悬崖上倾泻而下，水花四溅，气势磅礴，展现着大自然的震撼力量。',
    uploadTime: new Date('2024-01-28'),
    fileSize: 664 * 1024,
    dimensions: { width: 1920, height: 1080 },
    tags: ['瀑布', '水流', '震撼', '力量']
  },
  {
    id: '15',
    url: '/img/bg/15.webp',
    thumbnailUrl: '/img/bg/15.webp',
    title: '竹林幽径',
    description:
      '翠绿的竹林中小径蜿蜒，阳光斑驳地洒在石板路上，营造出幽静雅致的意境。',
    uploadTime: new Date('2024-01-29'),
    fileSize: 807 * 1024,
    dimensions: { width: 1920, height: 1080 },
    tags: ['竹林', '小径', '幽静', '绿色']
  },
  {
    id: '16',
    url: '/img/bg/16.webp',
    thumbnailUrl: '/img/bg/16.webp',
    title: '极光梦境',
    description:
      '神秘的极光在北极夜空中舞动，绿色的光带如丝绸般飘逸，创造着梦幻般的景象。',
    uploadTime: new Date('2024-01-30'),
    fileSize: 943 * 1024,
    dimensions: { width: 1920, height: 1080 },
    tags: ['极光', '夜空', '梦幻', '绿色']
  },
  {
    id: '17',
    url: '/img/bg/17.webp',
    thumbnailUrl: '/img/bg/17.webp',
    title: '古镇水乡',
    description:
      '小桥流水人家，古色古香的水乡小镇，白墙黛瓦倒映在清澈的河水中，诗意江南。',
    uploadTime: new Date('2024-01-31'),
    fileSize: 815 * 1024,
    dimensions: { width: 1920, height: 1080 },
    tags: ['古镇', '水乡', '江南', '诗意']
  },
  {
    id: '18',
    url: '/img/bg/18.webp',
    thumbnailUrl: '/img/bg/18.webp',
    title: '云上草原',
    description:
      '高原上的草原绿意盎然，白云低垂触手可及，牛羊悠闲地吃草，天高云淡心旷神怡。',
    uploadTime: new Date('2024-02-01'),
    fileSize: 119 * 1024,
    dimensions: { width: 1920, height: 1080 },
    tags: ['草原', '高原', '绿色', '悠闲']
  },
  {
    id: '19',
    url: '/img/bg/19.webp',
    thumbnailUrl: '/img/bg/19.webp',
    title: '梦幻紫薰',
    description:
      '紫色的薰衣草田一望无际，微风吹过花海翻滚，空气中弥漫着淡淡的花香。',
    uploadTime: new Date('2024-02-02'),
    fileSize: 98 * 1024,
    dimensions: { width: 1920, height: 1080 },
    tags: ['薰衣草', '紫色', '花香', '梦幻']
  },
  {
    id: '20',
    url: '/img/bg/20.webp',
    thumbnailUrl: '/img/bg/20.webp',
    title: '冰川世界',
    description:
      '蓝白色的冰川巍峨壮观，冰面反射着天空的蓝色，展现着地球最后的纯净之美。',
    uploadTime: new Date('2024-02-03'),
    fileSize: 6.7 * 1024 * 1024,
    dimensions: { width: 1920, height: 1080 },
    tags: ['冰川', '蓝色', '纯净', '壮观']
  }
]

// 本地相册服务类
export class LocalPhotoService {
  private photos: PhotoItem[] = []
  private favorites: Set<string> = new Set()

  constructor() {
    this.photos = [...localPhotos]
    this.loadFavoritesFromStorage()
  }

  // 获取所有照片
  getPhotos(): PhotoItem[] {
    return [...this.photos]
  }

  // 根据ID获取照片
  getPhotoById(id: string): PhotoItem | undefined {
    return this.photos.find((p) => p.id === id)
  }

  // 搜索照片
  searchPhotos(query: string): PhotoItem[] {
    const lowerQuery = query.toLowerCase()
    return this.photos.filter(
      (photo) =>
        photo.title?.toLowerCase().includes(lowerQuery) ||
        photo.description?.toLowerCase().includes(lowerQuery) ||
        photo.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery))
    )
  }

  // 按标签过滤
  filterByTags(tags: string[]): PhotoItem[] {
    return this.photos.filter((photo) =>
      photo.tags?.some((tag) => tags.includes(tag))
    )
  }

  // 获取所有标签
  getAllTags(): string[] {
    const tagSet = new Set<string>()
    this.photos.forEach((photo) => {
      photo.tags?.forEach((tag) => tagSet.add(tag))
    })
    return Array.from(tagSet).sort()
  }

  // 按颜色过滤
  filterByColor(color: string): PhotoItem[] {
    const colorTags: Record<string, string[]> = {
      蓝色: ['蓝色', '海滩', '湖泊', '冰川'],
      绿色: ['绿色', '森林', '竹林', '草原'],
      红色: ['红色', '秋天', '枫叶'],
      黄色: ['金黄', '田园', '沙漠', '夕阳'],
      紫色: ['紫色', '薰衣草', '梦幻'],
      白色: ['白色', '雪山', '云海', '纯净']
    }

    const targetTags = colorTags[color] || []
    return this.photos.filter((photo) =>
      photo.tags?.some((tag) => targetTags.includes(tag))
    )
  }

  // 排序照片
  sortPhotos(order: 'newest' | 'oldest' | 'name' | 'size'): PhotoItem[] {
    const sorted = [...this.photos]

    switch (order) {
      case 'newest':
        return sorted.sort(
          (a, b) => b.uploadTime.getTime() - a.uploadTime.getTime()
        )
      case 'oldest':
        return sorted.sort(
          (a, b) => a.uploadTime.getTime() - b.uploadTime.getTime()
        )
      case 'name':
        return sorted.sort((a, b) =>
          (a.title || '').localeCompare(b.title || '')
        )
      case 'size':
        return sorted.sort((a, b) => (b.fileSize || 0) - (a.fileSize || 0))
      default:
        return sorted
    }
  }

  // 获取随机照片
  getRandomPhotos(count: number = 6): PhotoItem[] {
    const shuffled = [...this.photos].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  }

  // 收藏功能
  toggleFavorite(photoId: string): boolean {
    if (this.favorites.has(photoId)) {
      this.favorites.delete(photoId)
    } else {
      this.favorites.add(photoId)
    }
    this.saveFavoritesToStorage()
    return this.favorites.has(photoId)
  }

  isFavorite(photoId: string): boolean {
    return this.favorites.has(photoId)
  }

  getFavoritePhotos(): PhotoItem[] {
    return this.photos.filter((photo) => this.favorites.has(photo.id))
  }

  // 获取统计信息
  getStats() {
    const totalSize = this.photos.reduce(
      (sum, photo) => sum + (photo.fileSize || 0),
      0
    )
    const totalPhotos = this.photos.length
    const favoriteCount = this.favorites.size
    const tagCount = this.getAllTags().length

    return {
      totalPhotos,
      favoriteCount,
      tagCount,
      totalSize,
      formattedSize: this.formatFileSize(totalSize),
      averageSize: this.formatFileSize(totalSize / totalPhotos)
    }
  }

  // 本地存储管理
  private saveFavoritesToStorage(): void {
    try {
      localStorage.setItem(
        'photoAlbumFavorites',
        JSON.stringify(Array.from(this.favorites))
      )
    } catch (error) {
      console.error('保存收藏到本地存储失败:', error)
    }
  }

  private loadFavoritesFromStorage(): void {
    try {
      const stored = localStorage.getItem('photoAlbumFavorites')
      if (stored) {
        const favorites = JSON.parse(stored)
        this.favorites = new Set(favorites)
      }
    } catch (error) {
      console.error('从本地存储加载收藏失败:', error)
      this.favorites = new Set()
    }
  }

  // 格式化文件大小
  private formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }
}

// 创建默认实例
export const localPhotoService = new LocalPhotoService()
