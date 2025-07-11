#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

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

// 配置文件路径
const CONFIG_PATH = path.join(__dirname, '../docs/public/music-config.json')
const MUSIC_DIR = path.join(__dirname, '../docs/public/music')

class MusicManager {
  constructor() {
    this.musicLibrary = []
    this.loadConfig()
  }

  // 加载现有配置
  loadConfig() {
    try {
      if (fs.existsSync(CONFIG_PATH)) {
        const configData = fs.readFileSync(CONFIG_PATH, 'utf-8')
        const config = JSON.parse(configData)
        this.musicLibrary = config.musicLibrary || []
      }
    } catch (error) {
      console.error('加载配置文件失败:', error.message)
      this.musicLibrary = []
    }
  }

  // 保存配置
  saveConfig() {
    const config = {
      musicLibrary: this.musicLibrary,
      settings: {
        autoScanEnabled: false,
        supportedFormats: SUPPORTED_FORMATS,
        defaultCover: '', // 空封面，将显示天蓝色背景
        musicDirectory: '/music/'
      }
    }

    try {
      // 确保目录存在
      const configDir = path.dirname(CONFIG_PATH)
      if (!fs.existsSync(configDir)) {
        fs.mkdirSync(configDir, { recursive: true })
      }

      fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2), 'utf-8')
      console.log('✅ 配置文件已保存到:', CONFIG_PATH)
    } catch (error) {
      console.error('❌ 保存配置文件失败:', error.message)
    }
  }

  // 扫描音乐文件夹
  scanMusicDirectory() {
    if (!fs.existsSync(MUSIC_DIR)) {
      console.log('📁 音乐文件夹不存在，正在创建:', MUSIC_DIR)
      fs.mkdirSync(MUSIC_DIR, { recursive: true })
      return []
    }

    const files = []
    const scanDir = (dir) => {
      const items = fs.readdirSync(dir)

      for (const item of items) {
        const fullPath = path.join(dir, item)
        const stat = fs.statSync(fullPath)

        if (stat.isDirectory()) {
          scanDir(fullPath)
        } else if (stat.isFile()) {
          const ext = path.extname(item).toLowerCase()
          if (SUPPORTED_FORMATS.includes(ext)) {
            const relativePath = path.relative(MUSIC_DIR, fullPath)
            files.push({
              name: item,
              path: relativePath,
              fullPath: fullPath,
              size: stat.size,
              modified: stat.mtime
            })
          }
        }
      }
    }

    scanDir(MUSIC_DIR)
    return files
  }

  // 从文件名提取歌曲信息
  extractSongInfo(filename) {
    const nameWithoutExt = filename.replace(/\.[^/.]+$/, '')

    // 处理 "艺术家 - 歌曲名" 格式
    if (nameWithoutExt.includes(' - ')) {
      const parts = nameWithoutExt.split(' - ')
      return {
        title: parts.slice(1).join(' - '),
        artist: parts[0]
      }
    }

    // 处理 "艺术家-歌曲名" 格式
    if (nameWithoutExt.includes('-')) {
      const parts = nameWithoutExt.split('-')
      if (parts.length > 1) {
        return {
          title: parts.slice(1).join('-').trim(),
          artist: parts[0].trim()
        }
      }
    }

    return {
      title: nameWithoutExt,
      artist: '未知艺术家'
    }
  }

  // 生成唯一ID
  generateId(filename, path) {
    return crypto
      .createHash('md5')
      .update(filename + path)
      .digest('hex')
      .substring(0, 8)
  }

  // 更新音乐库
  updateLibrary() {
    console.log('🔍 正在扫描音乐文件...')
    const files = this.scanMusicDirectory()

    if (files.length === 0) {
      console.log('📁 没有找到音乐文件，请将音乐文件放到:', MUSIC_DIR)
      return
    }

    console.log(`📁 找到 ${files.length} 个音乐文件`)

    // 创建现有文件的映射
    const existingFiles = new Map()
    this.musicLibrary.forEach((song) => {
      existingFiles.set(song.name, song)
    })

    // 更新音乐库
    const newLibrary = []
    let addedCount = 0
    let updatedCount = 0

    files.forEach((file, index) => {
      const songInfo = this.extractSongInfo(file.name)
      const id = this.generateId(file.name, file.path)

      let song
      if (existingFiles.has(file.name)) {
        // 更新现有歌曲
        song = existingFiles.get(file.name)
        song.size = file.size
        song.url = `/music/${file.path.replace(/\\/g, '/')}`
        updatedCount++
      } else {
        // 添加新歌曲
        song = {
          id: id,
          name: file.name,
          title: songInfo.title,
          artist: songInfo.artist,
          album: '未知专辑',
          duration: 0, // 需要音频解析库来获取真实时长
          size: file.size,
          format: path.extname(file.name).substring(1).toUpperCase(),
          cover: '', // 空封面，将显示天蓝色背景
          url: `/music/${file.path.replace(/\\/g, '/')}`
        }
        addedCount++
      }

      newLibrary.push(song)
    })

    this.musicLibrary = newLibrary
    console.log(`✅ 更新完成: 新增 ${addedCount} 首，更新 ${updatedCount} 首`)
  }

  // 添加单个音乐文件
  addSong(songData) {
    const id = this.generateId(songData.name, Date.now().toString())
    const song = {
      id: id,
      name: songData.name,
      title: songData.title || songData.name,
      artist: songData.artist || '未知艺术家',
      album: songData.album || '未知专辑',
      duration: songData.duration || 0,
      size: songData.size || 0,
      format: songData.format || 'MP3',
      cover: songData.cover || '', // 空封面，将显示天蓝色背景
      url: songData.url || `/music/${songData.name}`
    }

    this.musicLibrary.push(song)
    console.log(`✅ 已添加歌曲: ${song.title} - ${song.artist}`)
  }

  // 删除歌曲
  removeSong(id) {
    const index = this.musicLibrary.findIndex((song) => song.id === id)
    if (index > -1) {
      const song = this.musicLibrary[index]
      this.musicLibrary.splice(index, 1)
      console.log(`✅ 已删除歌曲: ${song.title} - ${song.artist}`)
      return true
    }
    console.log(`❌ 找不到ID为 ${id} 的歌曲`)
    return false
  }

  // 列出所有歌曲
  listSongs() {
    if (this.musicLibrary.length === 0) {
      console.log('📁 音乐库为空')
      return
    }

    console.log(`\n📚 音乐库 (共 ${this.musicLibrary.length} 首)`)
    console.log('─'.repeat(80))
    this.musicLibrary.forEach((song, index) => {
      console.log(
        `${(index + 1).toString().padStart(3)}. ${song.title} - ${song.artist}`
      )
      console.log(
        `     专辑: ${song.album} | 格式: ${
          song.format
        } | 大小: ${this.formatSize(song.size)}`
      )
      console.log(`     文件: ${song.name}`)
      console.log('')
    })
  }

  // 格式化文件大小
  formatSize(bytes) {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  // 显示帮助信息
  showHelp() {
    console.log(`
🎵 音乐库管理工具

用法:
  node music-manager.js [命令]

命令:
  scan          扫描音乐文件夹并更新音乐库
  list          列出所有歌曲
  add           交互式添加歌曲
  help          显示帮助信息

示例:
  node music-manager.js scan
  node music-manager.js list

注意:
  - 请将音乐文件放在 docs/public/music/ 文件夹中
  - 支持的格式: ${SUPPORTED_FORMATS.join(', ')}
  - 建议使用 "艺术家 - 歌曲名.格式" 的文件命名格式
`)
  }
}

// 主程序
function main() {
  const manager = new MusicManager()
  const command = process.argv[2] || 'help'

  switch (command) {
    case 'scan':
      manager.updateLibrary()
      manager.saveConfig()
      break

    case 'list':
      manager.listSongs()
      break

    case 'add':
      console.log(
        '💡 交互式添加功能待实现，请直接将音乐文件放到 docs/public/music/ 文件夹后运行 scan 命令'
      )
      break

    case 'help':
    default:
      manager.showHelp()
      break
  }
}

// 如果直接运行此脚本
if (process.argv[1] === __filename) {
  main()
}

export default MusicManager
