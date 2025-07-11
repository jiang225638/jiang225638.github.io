// 时间格式化工具函数

/**
 * 将秒数格式化为 mm:ss 格式
 * @param seconds 秒数
 * @returns 格式化后的时间字符串
 */
export function formatTime(seconds: number): string {
  if (!seconds || isNaN(seconds) || seconds < 0) {
    return '00:00'
  }

  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)

  return `${String(minutes).padStart(2, '0')}:${String(
    remainingSeconds
  ).padStart(2, '0')}`
}

/**
 * 将秒数格式化为 hh:mm:ss 格式（适用于超过1小时的时长）
 * @param seconds 秒数
 * @returns 格式化后的时间字符串
 */
export function formatLongTime(seconds: number): string {
  if (!seconds || isNaN(seconds) || seconds < 0) {
    return '00:00:00'
  }

  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = Math.floor(seconds % 60)

  if (hours > 0) {
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
      2,
      '0'
    )}:${String(remainingSeconds).padStart(2, '0')}`
  } else {
    return `${String(minutes).padStart(2, '0')}:${String(
      remainingSeconds
    ).padStart(2, '0')}`
  }
}

/**
 * 解析时间字符串为秒数
 * @param timeString 时间字符串 (mm:ss 或 hh:mm:ss)
 * @returns 秒数
 */
export function parseTime(timeString: string): number {
  if (!timeString || typeof timeString !== 'string') {
    return 0
  }

  const parts = timeString.split(':').map((part) => parseInt(part, 10))

  if (parts.length === 2) {
    // mm:ss 格式
    const [minutes, seconds] = parts
    return (minutes || 0) * 60 + (seconds || 0)
  } else if (parts.length === 3) {
    // hh:mm:ss 格式
    const [hours, minutes, seconds] = parts
    return (hours || 0) * 3600 + (minutes || 0) * 60 + (seconds || 0)
  }

  return 0
}

/**
 * 格式化播放时长为可读格式
 * @param seconds 秒数
 * @returns 格式化后的时长描述
 */
export function formatDuration(seconds: number): string {
  if (!seconds || isNaN(seconds) || seconds < 0) {
    return '未知时长'
  }

  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)

  if (hours > 0) {
    return `${hours}小时${minutes}分钟`
  } else if (minutes > 0) {
    return `${minutes}分钟`
  } else {
    return '不到1分钟'
  }
}

/**
 * 获取当前时间的格式化字符串
 * @param format 格式化模板，支持 YYYY-MM-DD HH:mm:ss
 * @returns 格式化后的时间字符串
 */
export function getCurrentTime(format: string = 'YYYY-MM-DD HH:mm:ss'): string {
  const now = new Date()

  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')

  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds)
}

/**
 * 计算时间差
 * @param startTime 开始时间（秒）
 * @param endTime 结束时间（秒）
 * @returns 时间差（秒）
 */
export function getTimeDifference(startTime: number, endTime: number): number {
  return Math.abs(endTime - startTime)
}

/**
 * 判断时间是否在指定范围内
 * @param currentTime 当前时间（秒）
 * @param targetTime 目标时间（秒）
 * @param tolerance 容差（秒）
 * @returns 是否在范围内
 */
export function isTimeInRange(
  currentTime: number,
  targetTime: number,
  tolerance: number = 0.5
): boolean {
  return Math.abs(currentTime - targetTime) <= tolerance
}

/**
 * 将毫秒转换为秒
 * @param milliseconds 毫秒
 * @returns 秒
 */
export function millisecondsToSeconds(milliseconds: number): number {
  return milliseconds / 1000
}

/**
 * 将秒转换为毫秒
 * @param seconds 秒
 * @returns 毫秒
 */
export function secondsToMilliseconds(seconds: number): number {
  return seconds * 1000
}
