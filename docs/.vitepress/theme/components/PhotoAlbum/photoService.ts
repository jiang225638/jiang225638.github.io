import type {
  PhotoItem,
  UploadConfig,
  UploadResult,
  UploadProgress
} from './types'

// 默认配置 - 可以根据你的CDN服务商调整
const defaultConfig: UploadConfig = {
  apiUrl: 'https://api.imgur.com/3/image', // 示例使用Imgur API
  maxFileSize: 10 * 1024 * 1024, // 10MB
  allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  cdnDomain: 'https://i.imgur.com'
}

// 其他流行的CDN配置示例
export const cdnConfigs = {
  imgur: {
    apiUrl: 'https://api.imgur.com/3/image',
    headers: {
      Authorization: 'Client-ID YOUR_IMGUR_CLIENT_ID' // 需要替换为实际的Client ID
    }
  },
  cloudinary: {
    apiUrl: 'https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload', // 需要替换云名称
    uploadPreset: 'YOUR_UPLOAD_PRESET' // 需要设置上传预设
  },
  qiniu: {
    apiUrl: 'https://upload.qiniup.com/',
    domain: 'YOUR_QINIU_DOMAIN' // 七牛云域名
  }
}

export class PhotoService {
  private config: UploadConfig
  private photos: PhotoItem[] = []

  constructor(config?: Partial<UploadConfig>) {
    this.config = { ...defaultConfig, ...config }
    this.loadPhotosFromStorage()
  }

  // 验证文件
  validateFile(file: File): { valid: boolean; error?: string } {
    if (!this.config.allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: `不支持的文件类型。支持: ${this.config.allowedTypes.join(', ')}`
      }
    }

    if (file.size > this.config.maxFileSize) {
      const maxSizeMB = this.config.maxFileSize / (1024 * 1024)
      return {
        valid: false,
        error: `文件过大。最大支持: ${maxSizeMB}MB`
      }
    }

    return { valid: true }
  }

  // 获取图片尺寸
  private getImageDimensions(
    file: File
  ): Promise<{ width: number; height: number }> {
    return new Promise((resolve, reject) => {
      const img = new Image()
      const url = URL.createObjectURL(file)

      img.onload = () => {
        URL.revokeObjectURL(url)
        resolve({ width: img.width, height: img.height })
      }

      img.onerror = () => {
        URL.revokeObjectURL(url)
        reject(new Error('无法读取图片尺寸'))
      }

      img.src = url
    })
  }

  // 上传到Imgur (示例实现)
  private async uploadToImgur(
    file: File,
    onProgress?: (progress: UploadProgress) => void
  ): Promise<UploadResult> {
    const formData = new FormData()
    formData.append('image', file)

    try {
      const response = await fetch(this.config.apiUrl, {
        method: 'POST',
        headers: {
          Authorization: 'Client-ID YOUR_IMGUR_CLIENT_ID' // 需要替换
        },
        body: formData
      })

      if (!response.ok) {
        throw new Error(`上传失败: ${response.statusText}`)
      }

      const data = await response.json()

      if (data.success) {
        const dimensions = await this.getImageDimensions(file)

        return {
          success: true,
          url: data.data.link,
          thumbnailUrl: data.data.link.replace('.jpg', 'm.jpg'), // Imgur缩略图
          fileInfo: {
            size: file.size,
            type: file.type,
            dimensions
          }
        }
      } else {
        return {
          success: false,
          error: data.data?.error || '上传失败'
        }
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : '网络错误'
      }
    }
  }

  // 通用上传方法 - 可以扩展支持其他CDN
  async uploadPhoto(
    file: File,
    metadata?: { title?: string; description?: string; tags?: string[] },
    onProgress?: (progress: UploadProgress) => void
  ): Promise<UploadResult> {
    // 验证文件
    const validation = this.validateFile(file)
    if (!validation.valid) {
      return {
        success: false,
        error: validation.error
      }
    }

    try {
      // 这里可以根据配置选择不同的上传方式
      const result = await this.uploadToImgur(file, onProgress)

      if (result.success && result.url) {
        // 创建PhotoItem并保存到本地存储
        const photoItem: PhotoItem = {
          id: this.generateId(),
          url: result.url,
          thumbnailUrl: result.thumbnailUrl,
          title: metadata?.title || file.name,
          description: metadata?.description,
          uploadTime: new Date(),
          fileSize: result.fileInfo?.size,
          dimensions: result.fileInfo?.dimensions,
          tags: metadata?.tags || []
        }

        this.photos.unshift(photoItem) // 添加到开头
        this.savePhotosToStorage()
      }

      return result
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : '上传失败'
      }
    }
  }

  // 批量上传
  async uploadMultiplePhotos(
    files: File[],
    onProgress?: (index: number, progress: UploadProgress) => void,
    onComplete?: (index: number, result: UploadResult) => void
  ): Promise<UploadResult[]> {
    const results: UploadResult[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const result = await this.uploadPhoto(
        file,
        { title: file.name },
        (progress) => onProgress?.(i, progress)
      )

      results.push(result)
      onComplete?.(i, result)
    }

    return results
  }

  // 删除照片
  deletePhoto(photoId: string): boolean {
    const index = this.photos.findIndex((p) => p.id === photoId)
    if (index > -1) {
      this.photos.splice(index, 1)
      this.savePhotosToStorage()
      return true
    }
    return false
  }

  // 获取所有照片
  getPhotos(): PhotoItem[] {
    return [...this.photos]
  }

  // 根据ID获取照片
  getPhotoById(id: string): PhotoItem | undefined {
    return this.photos.find((p) => p.id === id)
  }

  // 更新照片信息
  updatePhoto(id: string, updates: Partial<PhotoItem>): boolean {
    const index = this.photos.findIndex((p) => p.id === id)
    if (index > -1) {
      this.photos[index] = { ...this.photos[index], ...updates }
      this.savePhotosToStorage()
      return true
    }
    return false
  }

  // 搜索和过滤
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

  // 排序
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

  // 本地存储管理
  private savePhotosToStorage(): void {
    try {
      localStorage.setItem('photoAlbum', JSON.stringify(this.photos))
    } catch (error) {
      console.error('保存照片到本地存储失败:', error)
    }
  }

  private loadPhotosFromStorage(): void {
    try {
      const stored = localStorage.getItem('photoAlbum')
      if (stored) {
        const parsed = JSON.parse(stored)
        this.photos = parsed.map((p: any) => ({
          ...p,
          uploadTime: new Date(p.uploadTime)
        }))
      }
    } catch (error) {
      console.error('从本地存储加载照片失败:', error)
      this.photos = []
    }
  }

  // 生成唯一ID
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }

  // 获取统计信息
  getStats() {
    const totalSize = this.photos.reduce(
      (sum, photo) => sum + (photo.fileSize || 0),
      0
    )
    const totalPhotos = this.photos.length

    return {
      totalPhotos,
      totalSize,
      formattedSize: this.formatFileSize(totalSize),
      lastUpload: this.photos.length > 0 ? this.photos[0].uploadTime : null
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
export const photoService = new PhotoService()

// 导出配置用于组件使用
export { defaultConfig }
