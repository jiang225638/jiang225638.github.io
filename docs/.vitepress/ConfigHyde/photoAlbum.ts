// 相册配置 - 只需要填写基本信息，其他信息会自动生成
// id: 自动排序（不需要填写）
// uploadTime: 自动设置为当前时间
// fileSize: 使用 fetch 自动获取
// dimensions: 使用 new Image() 自动获取
// thumbnailUrl: 自动等于 url

import type { SimplePhotoConfig } from '../theme/components/PhotoAlbum/autoPhotoUtils'

export const photoConfigs: SimplePhotoConfig[] = [
  {
    url: '/img/photo/1.webp',
    title: '宁静海滩',
    description:
      '蔚蓝大海与金色沙滩的完美邂逅，温柔的海浪轻抚着岸边，带来内心的宁静与平和。',
    tags: ['海滩', '自然', '宁静', '蓝色']
  },
  {
    url: '/img/photo/2.webp',
    title: '森林深处',
    description:
      '阳光透过茂密的树叶洒向大地，形成斑驳的光影，仿佛走进了童话世界的秘境。',
    tags: ['森林', '绿色', '阳光', '自然']
  },
  {
    url: '/img/photo/3.webp',
    title: '星空夜景',
    description:
      '璀璨的星河横跨夜空，远山如黛，在这静谧的夜晚里，感受宇宙的浩瀚与神秘。',
    tags: ['星空', '夜景', '山脉', '神秘']
  },
  {
    url: '/img/photo/4.webp',
    title: '春日樱花',
    description:
      '粉色的樱花漫天飞舞，春风轻拂，花瓣如雪花般飘落，诗意盎然的浪漫时刻。',
    tags: ['樱花', '春天', '粉色', '浪漫']
  },
  {
    url: '/img/photo/5.webp',
    title: '高山云海',
    description:
      '云雾缭绕的高山之巅，云海翻腾如波涛，站在峰顶俯瞰，感受大自然的壮阔。',
    tags: ['高山', '云海', '壮阔', '白色']
  },
  {
    url: '/img/photo/6.webp',
    title: '秋叶飞舞',
    description:
      '金秋时节，枫叶正红，微风吹过，片片红叶翩翩起舞，编织着秋天的诗篇。',
    tags: ['秋天', '枫叶', '红色', '金黄']
  },
  {
    url: '/img/photo/7.webp',
    title: '湖光山色',
    description:
      '碧绿的湖水如镜面般平静，倒映着远山和蓝天白云，构成一幅天然的水墨画。',
    tags: ['湖泊', '倒影', '山景', '绿色']
  },
  {
    url: '/img/photo/8.webp',
    title: '夕阳西下',
    description:
      '橙红色的夕阳缓缓沉入地平线，天空被染成绚烂的暖色调，美不胜收的黄昏时光。',
    tags: ['夕阳', '黄昏', '橙色', '温暖']
  },
  {
    url: '/img/photo/9.webp',
    title: '雪山雄姿',
    description:
      '皑皑白雪覆盖的山峰直插云霄，雪山在阳光下闪闪发光，展现着大自然的纯净与庄严。',
    tags: ['雪山', '白色', '纯净', '雄伟']
  },
  {
    url: '/img/photo/10.webp',
    title: '田园风光',
    description:
      '金黄的麦田随风摆动，远处的农舍炊烟袅袅，勾勒出宁静美好的田园生活画卷。',
    tags: ['田园', '麦田', '金黄', '乡村']
  }
]
