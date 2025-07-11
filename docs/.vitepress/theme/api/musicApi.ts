// 本地音乐文件管理服务

interface Song {
  id: string | number
  name: string
  artist: string
  album: string
  albumCover: string
  duration: number
  url?: string
  format?: string
  size?: number
}

interface LyricLine {
  time: number
  text: string
  translation?: string
}

// 支持的音乐格式
const SUPPORTED_FORMATS = [
  '.mp3',
  '.flac',
  '.wav',
  '.ogg',
  '.m4a',
  '.aac',
  '.wma'
]

class LocalMusicService {
  private musicFiles: Song[] = []
  private isInitialized: boolean = false

  constructor() {
    this.init()
  }

  private async init() {
    if (this.isInitialized) return
    await this.loadMusicFiles()
    this.isInitialized = true
  }

  // 加载本地音乐文件
  private async loadMusicFiles() {
    try {
      // 在浏览器环境中，我们需要通过预定义的音乐列表来加载
      // 因为浏览器无法直接访问文件系统
      const musicList = await this.getMusicListFromServer()

      this.musicFiles = musicList.map((file, index) => ({
        id: index + 1,
        name: file.title || this.extractSongName(file.name),
        artist: file.artist || this.extractArtist(file.name) || '未知艺术家',
        album: file.album || this.extractAlbum(file.name) || '未知专辑',
        albumCover: file.cover || '/img/music-default.png',
        duration: file.duration || 0,
        url: file.url || `/music/${file.name}`,
        format: file.format || this.getFileFormat(file.name),
        size: file.size || 0
      }))
    } catch (error) {
      console.error('加载本地音乐文件失败:', error)
      this.musicFiles = []
    }
  }

  // 获取音乐文件列表（从配置文件读取）
  private async getMusicListFromServer(): Promise<any[]> {
    try {
      // 首先尝试从配置文件获取音乐列表
      const response = await fetch('/music-config.json')
      if (response.ok) {
        const config = await response.json()
        if (config.musicLibrary && Array.isArray(config.musicLibrary)) {
          return config.musicLibrary.map((song) => ({
            name: song.name,
            title: song.title || song.name,
            artist: song.artist,
            album: song.album,
            duration: song.duration,
            size: song.size,
            cover: song.cover,
            format: song.format,
            url: song.url
          }))
        }
      }
    } catch (error) {
      console.warn('无法从配置文件获取音乐列表，使用默认列表')
    }

    // 如果配置文件不存在，返回示例音乐列表
    return [
      {
        name: '示例歌曲1.mp3',
        title: '示例歌曲1',
        artist: '示例艺术家',
        album: '示例专辑',
        duration: 240,
        size: 3840000,
        cover: '/img/music-default.png',
        format: 'MP3',
        url: '/music/示例歌曲1.mp3'
      }
    ]
  }

  // 从文件名提取歌曲名称
  private extractSongName(filename: string): string {
    const nameWithoutExt = filename.replace(/\.[^/.]+$/, '')

    // 处理 "艺术家 - 歌曲名" 格式
    if (nameWithoutExt.includes(' - ')) {
      return nameWithoutExt.split(' - ').slice(1).join(' - ')
    }

    // 处理 "艺术家-歌曲名" 格式
    if (nameWithoutExt.includes('-')) {
      const parts = nameWithoutExt.split('-')
      if (parts.length > 1) {
        return parts.slice(1).join('-').trim()
      }
    }

    return nameWithoutExt
  }

  // 从文件名提取艺术家
  private extractArtist(filename: string): string | null {
    const nameWithoutExt = filename.replace(/\.[^/.]+$/, '')

    // 处理 "艺术家 - 歌曲名" 格式
    if (nameWithoutExt.includes(' - ')) {
      return nameWithoutExt.split(' - ')[0]
    }

    // 处理 "艺术家-歌曲名" 格式
    if (nameWithoutExt.includes('-')) {
      const parts = nameWithoutExt.split('-')
      if (parts.length > 1) {
        return parts[0].trim()
      }
    }

    return null
  }

  // 从文件名提取专辑信息
  private extractAlbum(filename: string): string | null {
    // 可以根据需要实现更复杂的专辑提取逻辑
    // 例如从文件夹名称或文件名中的特定模式提取
    return null
  }

  // 获取文件格式
  private getFileFormat(filename: string): string {
    const ext = filename.toLowerCase().match(/\.[^/.]+$/)?.[0] || ''
    return ext.replace('.', '').toUpperCase()
  }

  // 搜索歌曲
  async searchSongs(
    keywords: string,
    limit: number = 30,
    offset: number = 0
  ): Promise<Song[]> {
    await this.init()

    if (!keywords.trim()) {
      return this.musicFiles.slice(offset, offset + limit)
    }

    const searchKeywords = keywords.toLowerCase()
    const filteredSongs = this.musicFiles.filter(
      (song) =>
        song.name.toLowerCase().includes(searchKeywords) ||
        song.artist.toLowerCase().includes(searchKeywords) ||
        song.album.toLowerCase().includes(searchKeywords)
    )

    return filteredSongs.slice(offset, offset + limit)
  }

  // 获取歌曲播放地址
  async getSongUrl(id: string | number): Promise<string | null> {
    await this.init()

    const song = this.musicFiles.find((s) => s.id === id)
    return song?.url || null
  }

  // 获取歌曲详情
  async getSongDetail(
    ids: string | number | Array<string | number>
  ): Promise<Song[]> {
    await this.init()

    const idArray = Array.isArray(ids) ? ids : [ids]
    return this.musicFiles.filter((song) =>
      idArray.some((id) => song.id === id)
    )
  }

  // 获取歌词（从本地.lrc文件读取）
  async getLyrics(id: string | number): Promise<LyricLine[]> {
    await this.init()

    const song = this.musicFiles.find((s) => s.id === id)
    if (!song) return []

    try {
      // 构建歌词文件路径，支持多种命名格式
      const possiblePaths = [
        `/lyric/${song.name
          .replace('.mp3', '.lrc')
          .replace('.flac', '.lrc')
          .replace('.wav', '.lrc')}`,
        `/lyric/${song.artist}-${song.name.replace(/\.[^/.]+$/, '')}.lrc`,
        `/lyric/${song.name.replace(/\.[^/.]+$/, '')}-${song.artist}.lrc`,
        `/lyric/${song.name.replace(/\.[^/.]+$/, '')}.lrc`
      ]

      for (const lrcPath of possiblePaths) {
        try {
          const response = await fetch(lrcPath)
          if (response.ok) {
            const lrcContent = await response.text()
            return this.parseLrc(lrcContent)
          }
        } catch (error) {
          // 继续尝试下一个路径
          continue
        }
      }

      console.log(`未找到歌词文件: ${song.name}`)
      return []
    } catch (error) {
      console.error('加载歌词失败:', error)
      return []
    }
  }

  // 解析LRC歌词格式
  private parseLrc(lrcContent: string): LyricLine[] {
    const lines: LyricLine[] = []
    const lrcLines = lrcContent.split('\n')

    lrcLines.forEach((line) => {
      // 匹配时间标签格式 [mm:ss.xxx] 或 [mm:ss]
      const match = line.match(/\[(\d{2}):(\d{2})\.?(\d{0,3})\](.*)/)
      if (match) {
        const [, minutes, seconds, milliseconds = '0', text] = match
        const time =
          parseInt(minutes) * 60 +
          parseInt(seconds) +
          parseInt(milliseconds.padEnd(3, '0')) / 1000

        if (text.trim()) {
          lines.push({
            time,
            text: text.trim()
          })
        }
      }
    })

    return lines.sort((a, b) => a.time - b.time)
  }

  // 获取热门搜索关键词
  async getHotKeywords(): Promise<string[]> {
    await this.init()

    // 基于本地音乐文件生成热门搜索词
    const artists = [...new Set(this.musicFiles.map((song) => song.artist))]
    const songNames = this.musicFiles.map((song) => song.name)

    // 返回一些常见的艺术家和歌曲名
    const hotKeywords = [
      ...artists.slice(0, 5),
      ...songNames.slice(0, 3)
    ].filter((keyword) => keyword !== '未知艺术家' && keyword.trim())

    return hotKeywords.slice(0, 8)
  }

  // 获取推荐歌单（返回所有本地音乐）
  async getRecommendPlaylists(limit: number = 30): Promise<any[]> {
    await this.init()

    return [
      {
        id: 'local-music',
        name: '本地音乐库',
        coverImgUrl: '/img/music-default.png',
        playCount: this.musicFiles.length,
        description: `包含 ${this.musicFiles.length} 首本地音乐`
      }
    ]
  }

  // 获取歌单详情
  async getPlaylistDetail(
    id: string | number
  ): Promise<{ info: any; songs: Song[] }> {
    await this.init()

    return {
      info: {
        id: 'local-music',
        name: '本地音乐库',
        coverImgUrl: '/img/music-default.png',
        description: `包含 ${this.musicFiles.length} 首本地音乐`,
        trackCount: this.musicFiles.length
      },
      songs: this.musicFiles
    }
  }

  // 检查歌曲可用性
  async checkSongAvailability(id: string | number): Promise<boolean> {
    await this.init()

    const song = this.musicFiles.find((s) => s.id === id)
    return !!song
  }

  // 获取相似歌曲（返回同一艺术家的其他歌曲）
  async getSimilarSongs(id: string | number): Promise<Song[]> {
    await this.init()

    const song = this.musicFiles.find((s) => s.id === id)
    if (!song) return []

    return this.musicFiles
      .filter((s) => s.id !== id && s.artist === song.artist)
      .slice(0, 10)
  }

  // 获取所有音乐文件
  async getAllSongs(): Promise<Song[]> {
    await this.init()
    return this.musicFiles
  }

  // 按艺术家分组
  async getSongsByArtist(artist: string): Promise<Song[]> {
    await this.init()
    return this.musicFiles.filter((song) => song.artist === artist)
  }

  // 按格式筛选
  async getSongsByFormat(format: string): Promise<Song[]> {
    await this.init()
    return this.musicFiles.filter(
      (song) => song.format === format.toUpperCase()
    )
  }
}

// 创建服务实例
const localMusicService = new LocalMusicService()

// 导出API函数
export const searchSongs = (
  keywords: string,
  limit?: number,
  offset?: number
) => localMusicService.searchSongs(keywords, limit, offset)

export const getSongUrl = (id: string | number) =>
  localMusicService.getSongUrl(id)

export const getSongDetail = (ids: string | number | Array<string | number>) =>
  localMusicService.getSongDetail(ids)

export const getLyrics = (id: string | number) =>
  localMusicService.getLyrics(id)

export const getHotKeywords = () => localMusicService.getHotKeywords()

export const getRecommendPlaylists = (limit?: number) =>
  localMusicService.getRecommendPlaylists(limit)

export const getPlaylistDetail = (id: string | number) =>
  localMusicService.getPlaylistDetail(id)

export const checkSongAvailability = (id: string | number) =>
  localMusicService.checkSongAvailability(id)

export const getSimilarSongs = (id: string | number) =>
  localMusicService.getSimilarSongs(id)

// 新增的本地音乐专用API
export const getAllSongs = () => localMusicService.getAllSongs()

export const getSongsByArtist = (artist: string) =>
  localMusicService.getSongsByArtist(artist)

export const getSongsByFormat = (format: string) =>
  localMusicService.getSongsByFormat(format)

export default localMusicService
