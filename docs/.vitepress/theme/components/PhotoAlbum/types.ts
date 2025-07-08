// 相册组件类型定义

export interface PhotoItem {
  id: string
  url: string
  thumbnailUrl?: string
  title?: string
  description?: string
  uploadTime: Date
  fileSize?: number
  dimensions?: {
    width: number
    height: number
  }
  tags?: string[]
}

export interface Album {
  id: string
  name: string
  description?: string
  coverPhotoUrl?: string
  photos: PhotoItem[]
  createdAt: Date
  updatedAt: Date
}

export interface UploadConfig {
  apiUrl: string
  maxFileSize: number // bytes
  allowedTypes: string[]
  cdnDomain?: string
}

export interface UploadProgress {
  loaded: number
  total: number
  percentage: number
}

export interface UploadResult {
  success: boolean
  url?: string
  thumbnailUrl?: string
  error?: string
  fileInfo?: {
    size: number
    type: string
    dimensions?: {
      width: number
      height: number
    }
  }
}

export interface PhotoViewerState {
  visible: boolean
  currentIndex: number
  photos: PhotoItem[]
}

export type SortOrder =
  | 'newest'
  | 'oldest'
  | 'name-asc'
  | 'name-desc'
  | 'size-asc'
  | 'size-desc'

export interface FilterOptions {
  tags?: string[]
  dateRange?: {
    start: Date
    end: Date
  }
  searchText?: string
}
