import type { PhotoItem } from './types'

// 简化的相册配置接口，只需要提供基本信息
export interface SimplePhotoConfig {
  url: string
  title: string
  description: string
  tags: string[]
}

/**
 * 自动获取图片文件大小
 * @param url 图片URL
 * @returns Promise<number> 文件大小（字节）
 */
export async function getImageFileSize(url: string): Promise<number> {
  try {
    const response = await fetch(url, { method: 'HEAD' })
    const contentLength = response.headers.get('Content-Length')
    return contentLength ? parseInt(contentLength, 10) : 0
  } catch (error) {
    console.warn(`无法获取图片 ${url} 的文件大小:`, error)
    return 0
  }
}

/**
 * 自动获取图片尺寸
 * @param url 图片URL
 * @returns Promise<{width: number, height: number}> 图片尺寸
 */
export function getImageDimensions(
  url: string
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image()

    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight
      })
    }

    img.onerror = (error) => {
      console.warn(`无法获取图片 ${url} 的尺寸:`, error)
      // 返回默认尺寸而不是拒绝Promise
      resolve({ width: 1920, height: 1080 })
    }

    img.src = url
  })
}

/**
 * 创建完整的相册项
 * @param config 简化的配置
 * @param index 索引（用于生成ID）
 * @returns Promise<PhotoItem> 完整的相册项
 */
export async function createPhotoItem(
  config: SimplePhotoConfig,
  index: number
): Promise<PhotoItem> {
  // 并行获取文件大小和图片尺寸
  const [fileSize, dimensions] = await Promise.all([
    getImageFileSize(config.url),
    getImageDimensions(config.url)
  ])

  return {
    id: (index + 1).toString(), // 自动排序ID
    url: config.url,
    thumbnailUrl: config.url, // 缩略图和url合并
    title: config.title,
    description: config.description,
    uploadTime: new Date(), // 自动设置为当前时间
    fileSize,
    dimensions,
    tags: config.tags
  }
}

/**
 * 批量创建相册项
 * @param configs 简化配置数组
 * @returns Promise<PhotoItem[]> 完整的相册项数组
 */
export async function createPhotoAlbum(
  configs: SimplePhotoConfig[]
): Promise<PhotoItem[]> {
  console.log('开始生成相册，正在获取图片信息...')

  const photoPromises = configs.map((config, index) =>
    createPhotoItem(config, index)
  )

  try {
    const photos = await Promise.all(photoPromises)
    console.log(`相册生成完成，共 ${photos.length} 张图片`)
    return photos
  } catch (error) {
    console.error('生成相册时出错:', error)
    return []
  }
}

/**
 * 创建单个相册项的快捷方法
 * @param url 图片URL
 * @param title 标题
 * @param description 描述
 * @param tags 标签数组
 * @param id 可选的自定义ID
 * @returns Promise<PhotoItem> 完整的相册项
 */
export async function createSinglePhoto(
  url: string,
  title: string,
  description: string,
  tags: string[] = [],
  id?: string
): Promise<PhotoItem> {
  const config: SimplePhotoConfig = { url, title, description, tags }
  const photo = await createPhotoItem(config, 0)

  if (id) {
    photo.id = id
  }

  return photo
}

/**
 * 批量生成相册配置模板
 * @param basePath 图片基础路径，如 '/img/bg/'
 * @param imageCount 图片数量
 * @param startIndex 起始索引，默认为1
 * @returns 生成的简化配置数组模板
 */
export function generateConfigTemplate(
  basePath: string,
  imageCount: number,
  startIndex: number = 1
): SimplePhotoConfig[] {
  const configs: SimplePhotoConfig[] = []

  for (let i = startIndex; i < startIndex + imageCount; i++) {
    configs.push({
      url: `${basePath}${i}.webp`,
      title: `图片 ${i}`,
      description: `请填写图片 ${i} 的描述`,
      tags: ['待分类']
    })
  }

  return configs
}

/**
 * 验证图片URL是否有效
 * @param url 图片URL
 * @returns 是否有效
 */
export function isValidImageUrl(url: string): boolean {
  const validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg']
  return validExtensions.some((ext) => url.toLowerCase().endsWith(ext))
}
