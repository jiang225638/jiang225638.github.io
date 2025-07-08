import type { PhotoItem } from './types'
import { createPhotoAlbum } from './autoPhotoUtils'
import { photoConfigs } from '../../../ConfigHyde/photoAlbum'

// 自动生成的相册数据（异步）
let localPhotos: PhotoItem[] = []
let isPhotosLoaded = false
let photoLoadPromise: Promise<void> | null = null

// 初始化相册数据
async function initializePhotos(): Promise<void> {
  if (isPhotosLoaded) return

  try {
    console.log('正在自动生成相册数据...')
    localPhotos = await createPhotoAlbum(photoConfigs)
    isPhotosLoaded = true
    console.log(`相册数据生成完成，共 ${localPhotos.length} 张图片`)
  } catch (error) {
    console.error('初始化相册数据失败:', error)
    localPhotos = []
  }
}

// 确保数据已加载
function ensurePhotosLoaded(): Promise<void> {
  if (!photoLoadPromise) {
    photoLoadPromise = initializePhotos()
  }
  return photoLoadPromise
}

// 本地相册服务类
export class LocalPhotoService {
  private photos: PhotoItem[] = []
  private favorites: Set<string> = new Set()
  private initialized = false

  constructor() {
    this.loadFavoritesFromStorage()
    // 异步初始化照片数据
    this.initializeAsync()
  }

  // 异步初始化照片数据
  private async initializeAsync(): Promise<void> {
    if (this.initialized) return

    await ensurePhotosLoaded()
    this.photos = [...localPhotos]
    this.initialized = true
  }

  // 确保数据已初始化
  async ensureInitialized(): Promise<void> {
    if (!this.initialized) {
      await this.initializeAsync()
    }
  }

  // 获取所有照片
  async getPhotos(): Promise<PhotoItem[]> {
    await this.ensureInitialized()
    return [...this.photos]
  }

  // 根据ID获取照片
  async getPhotoById(id: string): Promise<PhotoItem | undefined> {
    await this.ensureInitialized()
    return this.photos.find((p) => p.id === id)
  }

  // 搜索照片
  async searchPhotos(query: string): Promise<PhotoItem[]> {
    await this.ensureInitialized()
    const lowerQuery = query.toLowerCase()
    return this.photos.filter(
      (photo) =>
        photo.title?.toLowerCase().includes(lowerQuery) ||
        photo.description?.toLowerCase().includes(lowerQuery) ||
        photo.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery))
    )
  }

  // 按标签过滤
  async filterByTags(tags: string[]): Promise<PhotoItem[]> {
    await this.ensureInitialized()
    return this.photos.filter((photo) =>
      photo.tags?.some((tag) => tags.includes(tag))
    )
  }

  // 获取所有标签
  async getAllTags(): Promise<string[]> {
    await this.ensureInitialized()
    const tagSet = new Set<string>()
    this.photos.forEach((photo) => {
      photo.tags?.forEach((tag) => tagSet.add(tag))
    })
    return Array.from(tagSet).sort()
  }

  // 按颜色过滤
  async filterByColor(color: string): Promise<PhotoItem[]> {
    await this.ensureInitialized()
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
  async sortPhotos(
    order: 'newest' | 'oldest' | 'name' | 'size'
  ): Promise<PhotoItem[]> {
    await this.ensureInitialized()
    const sorted = [...this.photos]

    switch (order) {
      case 'newest':
        return sorted.sort((a, b) => {
          const timeA = a.uploadTime?.getTime() || 0
          const timeB = b.uploadTime?.getTime() || 0
          return timeB - timeA
        })
      case 'oldest':
        return sorted.sort((a, b) => {
          const timeA = a.uploadTime?.getTime() || 0
          const timeB = b.uploadTime?.getTime() || 0
          return timeA - timeB
        })
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
  async getRandomPhotos(count: number = 6): Promise<PhotoItem[]> {
    await this.ensureInitialized()
    const shuffled = [...this.photos].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  }

  // 收藏功能
  async toggleFavorite(photoId: string): Promise<boolean> {
    await this.ensureInitialized()
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

  async getFavoritePhotos(): Promise<PhotoItem[]> {
    await this.ensureInitialized()
    return this.photos.filter((photo) => this.favorites.has(photo.id))
  }

  // 获取统计信息
  async getStats() {
    await this.ensureInitialized()
    const totalSize = this.photos.reduce(
      (sum, photo) => sum + (photo.fileSize || 0),
      0
    )
    const totalPhotos = this.photos.length
    const favoriteCount = this.favorites.size
    const tagCount = (await this.getAllTags()).length

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
