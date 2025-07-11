// 音乐播放器状态管理

import { ref, reactive, computed } from 'vue'
import { getSongUrl, getLyrics, getSongDetail } from '../api/musicApi'

interface Song {
  id: string | number
  name: string
  artist: string
  album?: string
  albumCover?: string
  duration?: number
  url?: string
}

interface LyricLine {
  time: number
  text: string
  translation?: string
}

type PlayMode = 'order' | 'random' | 'single' | 'loop'

// 全局状态
const state = reactive({
  // 播放列表
  playlist: [] as Song[],
  currentIndex: -1,

  // 播放状态
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 0.8,

  // 播放模式
  playMode: 'order' as PlayMode,

  // 歌词
  currentLyrics: [] as LyricLine[],

  // 历史记录
  playHistory: [] as Song[],

  // 加载状态
  isLoading: false,

  // 随机播放的原始索引映射
  randomIndexMap: [] as number[]
})

// 当前歌曲
const currentSong = computed(() => {
  if (state.currentIndex >= 0 && state.currentIndex < state.playlist.length) {
    return state.playlist[state.currentIndex]
  }
  return {
    id: '',
    name: '',
    artist: '',
    albumCover: '/img/music-default.png'
  }
})

// 是否有上一首
const hasPrevious = computed(() => {
  return state.playlist.length > 1
})

// 是否有下一首
const hasNext = computed(() => {
  return state.playlist.length > 1
})

export function useMusicStore() {
  // 播放指定索引的歌曲
  const playByIndex = async (index: number) => {
    if (index < 0 || index >= state.playlist.length) return false

    const song = state.playlist[index]
    if (!song) return false

    state.isLoading = true
    state.currentIndex = index

    try {
      // 获取播放地址
      if (!song.url) {
        const url = await getSongUrl(song.id)
        if (url) {
          song.url = url
        } else {
          console.error('无法获取歌曲播放地址:', song.name)
          state.isLoading = false
          return false
        }
      }

      // 获取歌词
      loadLyrics(song.id)

      // 添加到播放历史
      addToHistory(song)

      state.isLoading = false
      return true
    } catch (error) {
      console.error('播放歌曲失败:', error)
      state.isLoading = false
      return false
    }
  }

  // 播放上一首
  const playPrevious = async () => {
    if (!hasPrevious.value) return

    let newIndex: number

    switch (state.playMode) {
      case 'random':
        // 随机模式：随机选择一首
        newIndex = Math.floor(Math.random() * state.playlist.length)
        break
      case 'single':
        // 单曲模式：重新播放当前歌曲
        newIndex = state.currentIndex
        break
      default:
        // 顺序和循环模式：播放上一首
        newIndex = state.currentIndex - 1
        if (newIndex < 0) {
          newIndex = state.playlist.length - 1
        }
        break
    }

    await playByIndex(newIndex)
  }

  // 播放下一首
  const playNext = async () => {
    if (!hasNext.value) return

    let newIndex: number

    switch (state.playMode) {
      case 'random':
        // 随机模式：随机选择一首
        newIndex = Math.floor(Math.random() * state.playlist.length)
        break
      case 'single':
        // 单曲模式：重新播放当前歌曲
        newIndex = state.currentIndex
        break
      default:
        // 顺序和循环模式：播放下一首
        newIndex = state.currentIndex + 1
        if (newIndex >= state.playlist.length) {
          newIndex = state.playMode === 'loop' ? 0 : state.playlist.length - 1
        }
        break
    }

    await playByIndex(newIndex)
  }

  // 添加歌曲到播放列表
  const addToPlaylist = (song: Song | Song[]) => {
    const songs = Array.isArray(song) ? song : [song]

    songs.forEach((s) => {
      // 检查是否已存在
      const existIndex = state.playlist.findIndex((item) => item.id === s.id)
      if (existIndex === -1) {
        state.playlist.push({ ...s })
      }
    })
  }

  // 立即播放歌曲
  const playNow = async (song: Song) => {
    // 检查歌曲是否在播放列表中
    const existIndex = state.playlist.findIndex((item) => item.id === song.id)

    if (existIndex !== -1) {
      // 如果已存在，直接播放
      await playByIndex(existIndex)
    } else {
      // 如果不存在，添加到当前位置并播放
      const insertIndex = state.currentIndex + 1
      state.playlist.splice(insertIndex, 0, { ...song })
      await playByIndex(insertIndex)
    }
  }

  // 移除歌曲
  const removeSong = (index: number) => {
    if (index < 0 || index >= state.playlist.length) return

    // 如果移除的是当前播放的歌曲
    if (index === state.currentIndex) {
      if (state.playlist.length === 1) {
        // 如果只有一首歌，清空播放列表
        state.playlist = []
        state.currentIndex = -1
        state.currentLyrics = []
      } else {
        // 播放下一首或上一首
        if (index === state.playlist.length - 1) {
          // 如果是最后一首，播放上一首
          state.currentIndex = index - 1
        }
        state.playlist.splice(index, 1)
        if (state.currentIndex >= state.playlist.length) {
          state.currentIndex = state.playlist.length - 1
        }
      }
    } else {
      // 移除其他歌曲
      state.playlist.splice(index, 1)
      if (index < state.currentIndex) {
        state.currentIndex--
      }
    }
  }

  // 清空播放列表
  const clearPlaylist = () => {
    state.playlist = []
    state.currentIndex = -1
    state.currentLyrics = []
    state.isPlaying = false
  }

  // 切换播放模式
  const togglePlayMode = () => {
    const modes: PlayMode[] = ['order', 'loop', 'random', 'single']
    const currentModeIndex = modes.indexOf(state.playMode)
    const nextModeIndex = (currentModeIndex + 1) % modes.length
    state.playMode = modes[nextModeIndex]
  }

  // 获取播放模式名称
  const getPlayModeName = () => {
    switch (state.playMode) {
      case 'order':
        return '顺序播放'
      case 'loop':
        return '列表循环'
      case 'random':
        return '随机播放'
      case 'single':
        return '单曲循环'
      default:
        return '顺序播放'
    }
  }

  // 加载歌词
  const loadLyrics = async (songId: string | number) => {
    try {
      const lyrics = await getLyrics(songId)
      state.currentLyrics = lyrics
    } catch (error) {
      console.error('加载歌词失败:', error)
      state.currentLyrics = []
    }
  }

  // 添加到播放历史
  const addToHistory = (song: Song) => {
    // 移除重复项
    const existIndex = state.playHistory.findIndex(
      (item) => item.id === song.id
    )
    if (existIndex !== -1) {
      state.playHistory.splice(existIndex, 1)
    }

    // 添加到开头
    state.playHistory.unshift({ ...song })

    // 限制历史记录数量
    if (state.playHistory.length > 100) {
      state.playHistory = state.playHistory.slice(0, 100)
    }

    // 保存到本地存储
    try {
      localStorage.setItem(
        'music-play-history',
        JSON.stringify(state.playHistory)
      )
    } catch (error) {
      console.error('保存播放历史失败:', error)
    }
  }

  // 加载播放历史
  const loadPlayHistory = () => {
    try {
      const history = localStorage.getItem('music-play-history')
      if (history) {
        state.playHistory = JSON.parse(history)
      }
    } catch (error) {
      console.error('加载播放历史失败:', error)
    }
  }

  // 保存播放状态
  const savePlayState = () => {
    try {
      const playState = {
        playlist: state.playlist,
        currentIndex: state.currentIndex,
        playMode: state.playMode,
        volume: state.volume
      }
      localStorage.setItem('music-play-state', JSON.stringify(playState))
    } catch (error) {
      console.error('保存播放状态失败:', error)
    }
  }

  // 恢复播放状态
  const restorePlayState = () => {
    try {
      const playState = localStorage.getItem('music-play-state')
      if (playState) {
        const data = JSON.parse(playState)
        state.playlist = data.playlist || []
        state.currentIndex = data.currentIndex || -1
        state.playMode = data.playMode || 'order'
        state.volume = data.volume || 0.8
      }
    } catch (error) {
      console.error('恢复播放状态失败:', error)
    }
  }

  // 搜索播放列表
  const searchInPlaylist = (keyword: string) => {
    if (!keyword.trim()) return state.playlist

    return state.playlist.filter(
      (song) =>
        song.name.toLowerCase().includes(keyword.toLowerCase()) ||
        song.artist.toLowerCase().includes(keyword.toLowerCase()) ||
        (song.album && song.album.toLowerCase().includes(keyword.toLowerCase()))
    )
  }

  // 初始化
  const init = () => {
    loadPlayHistory()
    restorePlayState()
  }

  return {
    // 状态
    state,
    currentSong,
    hasPrevious,
    hasNext,

    // 方法
    playByIndex,
    playPrevious,
    playNext,
    addToPlaylist,
    playNow,
    removeSong,
    clearPlaylist,
    togglePlayMode,
    getPlayModeName,
    loadLyrics,
    addToHistory,
    savePlayState,
    restorePlayState,
    searchInPlaylist,
    init
  }
}
