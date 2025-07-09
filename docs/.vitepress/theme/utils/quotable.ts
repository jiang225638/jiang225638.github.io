// 默认的静态句子列表（作为fallback）
const defaultQuotes = [
  '生活不止眼前的苟且，还有诗和远方的田野。',
  '愿你历尽千帆，归来仍是少年。',
  '山川异域，风月同天。',
  '落红不是无情物，化作春泥更护花。',
  '路漫漫其修远兮，吾将上下而求索。',
  '海内存知己，天涯若比邻。',
  '长风破浪会有时，直挂云帆济沧海。',
  '不积跬步，无以至千里；不积小流，无以成江海。'
]

// 获取随机默认句子
function getRandomDefaultQuote(): string {
  return defaultQuotes[Math.floor(Math.random() * defaultQuotes.length)]
}

// 异步获取一言
async function fetchHitokoto(): Promise<string> {
  try {
    const response = await fetch('https://international.v1.hitokoto.cn', {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    if (data.hitokoto) {
      return data.hitokoto + ' — ' + (data.from_who || data.from || '佚名')
    } else {
      throw new Error('Invalid response format')
    }
  } catch (error) {
    console.warn('Failed to fetch hitokoto:', error)
    return getRandomDefaultQuote()
  }
}

// 导出默认句子（构建时使用）
export const hitokoto = getRandomDefaultQuote()

// 导出异步获取函数（运行时使用）
export const getHitokoto = fetchHitokoto

// 导出同步获取随机句子的函数
export const getRandomQuote = getRandomDefaultQuote
