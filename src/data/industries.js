/**
 * 申万31个一级行业 × 五行属性映射表
 * 基于传统命理学行业五行分类 + 中信里昂2026风水指南校准
 *
 * 每个行业包含：
 *   - name: 申万一级行业名称
 *   - wuxing: 主五行
 *   - wuxing2: 次五行（null = 无）
 *   - swCode: 申万指数代码（2021版，部分为近似值）
 *   - emKeywords: 东方财富行业板块匹配关键词
 */
export const INDUSTRIES = [
  { name: '石油石化',   wuxing: '火', wuxing2: '水', swCode: '801960', emKeywords: ['石油', '石化'] },
  { name: '煤炭',       wuxing: '火', wuxing2: '土', swCode: '801950', emKeywords: ['煤炭'] },
  { name: '有色金属',   wuxing: '金', wuxing2: null, swCode: '801050', emKeywords: ['有色', '金属'] },
  { name: '基础化工',   wuxing: '火', wuxing2: null, swCode: '801030', emKeywords: ['化工'] },
  { name: '钢铁',       wuxing: '金', wuxing2: null, swCode: '801040', emKeywords: ['钢铁'] },
  { name: '建筑材料',   wuxing: '土', wuxing2: null, swCode: '801710', emKeywords: ['建材', '水泥'] },
  { name: '建筑装饰',   wuxing: '土', wuxing2: null, swCode: '801720', emKeywords: ['建筑', '工程'] },
  { name: '机械设备',   wuxing: '金', wuxing2: null, swCode: '801890', emKeywords: ['机械'] },
  { name: '电力设备',   wuxing: '火', wuxing2: '金', swCode: '801730', emKeywords: ['电力', '电气', '新能源'] },
  { name: '国防军工',   wuxing: '金', wuxing2: '火', swCode: '801740', emKeywords: ['军工', '航天', '国防'] },
  { name: '环保',       wuxing: '水', wuxing2: '木', swCode: '801970', emKeywords: ['环保'] },
  { name: '公用事业',   wuxing: '水', wuxing2: '火', swCode: '801160', emKeywords: ['公用'] },
  { name: '汽车',       wuxing: '金', wuxing2: '火', swCode: '801880', emKeywords: ['汽车'] },
  { name: '家用电器',   wuxing: '火', wuxing2: '金', swCode: '801110', emKeywords: ['家电'] },
  { name: '轻工制造',   wuxing: '木', wuxing2: null, swCode: '801140', emKeywords: ['轻工', '造纸', '包装'] },
  { name: '农林牧渔',   wuxing: '木', wuxing2: '水', swCode: '801010', emKeywords: ['农牧', '农业', '林业', '渔业'] },
  { name: '食品饮料',   wuxing: '水', wuxing2: '土', swCode: '801120', emKeywords: ['食品', '饮料', '酿酒'] },
  { name: '纺织服饰',   wuxing: '木', wuxing2: null, swCode: '801130', emKeywords: ['纺织', '服装'] },
  { name: '医药生物',   wuxing: '木', wuxing2: '火', swCode: '801150', emKeywords: ['医药', '医疗', '生物'] },
  { name: '商贸零售',   wuxing: '水', wuxing2: null, swCode: '801200', emKeywords: ['商业', '零售', '贸易'] },
  { name: '社会服务',   wuxing: '水', wuxing2: '土', swCode: '801210', emKeywords: ['旅游', '酒店', '餐饮', '教育'] },
  { name: '美容护理',   wuxing: '木', wuxing2: '水', swCode: '801980', emKeywords: ['美容', '化妆', '护理'] },
  { name: '电子',       wuxing: '火', wuxing2: '金', swCode: '801080', emKeywords: ['电子', '半导体', '元件'] },
  { name: '计算机',     wuxing: '火', wuxing2: null, swCode: '801750', emKeywords: ['计算机', '软件', 'IT'] },
  { name: '传媒',       wuxing: '火', wuxing2: '木', swCode: '801760', emKeywords: ['传媒', '影视', '游戏'] },
  { name: '通信',       wuxing: '火', wuxing2: null, swCode: '801770', emKeywords: ['通信', '5G', '电信'] },
  { name: '房地产',     wuxing: '土', wuxing2: null, swCode: '801180', emKeywords: ['房地产', '房产', '开发'] },
  { name: '交通运输',   wuxing: '水', wuxing2: null, swCode: '801170', emKeywords: ['交通', '运输', '航运', '港口', '物流'] },
  { name: '银行',       wuxing: '金', wuxing2: null, swCode: '801780', emKeywords: ['银行'] },
  { name: '非银金融',   wuxing: '金', wuxing2: null, swCode: '801790', emKeywords: ['证券', '保险', '金融'] },
  { name: '综合',       wuxing: '水', wuxing2: null, swCode: '801230', emKeywords: ['综合'] },
]

/**
 * 按五行分组
 */
export function groupByWuxing() {
  const groups = { '金': [], '木': [], '水': [], '火': [], '土': [] }
  for (const ind of INDUSTRIES) {
    groups[ind.wuxing].push(ind)
  }
  return groups
}
