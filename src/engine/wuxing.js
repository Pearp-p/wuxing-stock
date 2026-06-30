/**
 * 五行生克关系与能量评分引擎
 *
 * 核心概念：
 *   生：木→火→土→金→水→木  （能量注入链）
 *   克：木→土→水→火→金→木  （能量制约链）
 *
 * 每个时间柱（年/月/日/时）的干支五行与行业五行交互：
 *   - 生我（柱生行业）→ +2  吉，柱的能量注入行业
 *   - 比和（同五行） → +1  平吉，共振
 *   - 我生（行业生柱）→ -1  泄气
 *   - 我克（行业克柱）→ -1  耗力
 *   - 克我（柱克行业）→ -2  凶，压制
 */

// ── 五行基础关系 ─────────────────────────
const WUXING = ['木', '火', '土', '金', '水']

// 相生关系：wuxing[x] 生 wuxing[ShengMap[x]]
const SHENG_MAP = { '木': '火', '火': '土', '土': '金', '金': '水', '水': '木' }

// 相克关系：wuxing[x] 克 wuxing[KeMap[x]]
const KE_MAP = { '木': '土', '土': '水', '水': '火', '火': '金', '金': '木' }

// 生我关系：谁生我
const SHENG_WO_MAP = {}
for (const [k, v] of Object.entries(SHENG_MAP)) {
  SHENG_WO_MAP[v] = k
}

// 克我关系：谁克我
const KE_WO_MAP = {}
for (const [k, v] of Object.entries(KE_MAP)) {
  KE_WO_MAP[v] = k
}

/**
 * 判断两个五行的交互关系
 * @param {string} pillarElement - 柱的五行 (天干或地支的五行)
 * @param {string} industryElement - 行业的五行
 * @returns {{ relation: string, score: number }}
 *   '生我' | '比和' | '我生' | '我克' | '克我'
 */
export function judgeInteraction(pillarElement, industryElement) {
  if (pillarElement === industryElement) {
    return { relation: '比和', score: 1 }
  }
  if (SHENG_MAP[pillarElement] === industryElement) {
    return { relation: '生我', score: 2 }   // 柱的五行生行业五行 → 行业得生
  }
  if (SHENG_MAP[industryElement] === pillarElement) {
    return { relation: '我生', score: -1 }  // 行业五行生柱五行 → 行业泄气
  }
  if (KE_MAP[pillarElement] === industryElement) {
    return { relation: '克我', score: -2 }  // 柱的五行克行业五行 → 行业受克
  }
  if (KE_MAP[industryElement] === pillarElement) {
    return { relation: '我克', score: -1 }  // 行业五行克柱五行 → 行业耗力
  }
  return { relation: '?', score: 0 }
}

/**
 * 分析一个时间柱对行业的五行交互
 * @param {{ ganWuxing: string, zhiWuxing: string }} pillar - 单柱（含天干地支五行）
 * @param {string} industryWuxing - 行业主五行
 * @param {string} industryWuxing2 - 行业次五行（可选）
 * @returns {{
 *   gan: { relation: string, score: number },
 *   zhi: { relation: string, score: number },
 *   composite: number  // 加权合成得分 (天干0.6 + 地支0.4)
 * }}
 */
export function analyzePillarInteraction(pillar, industryWuxing, industryWuxing2 = null) {
  const ganResult = judgeInteraction(pillar.ganWuxing, industryWuxing)
  const zhiResult = judgeInteraction(pillar.zhiWuxing, industryWuxing)

  // 如果有次五行，取天干地支中较好的得分
  let ganScore = ganResult.score
  let zhiScore = zhiResult.score

  if (industryWuxing2 && industryWuxing2 !== industryWuxing) {
    const gan2 = judgeInteraction(pillar.ganWuxing, industryWuxing2)
    const zhi2 = judgeInteraction(pillar.zhiWuxing, industryWuxing2)
    ganScore = Math.max(ganScore, gan2.score)
    zhiScore = Math.max(zhiScore, zhi2.score)
  }

  const composite = ganScore * 0.6 + zhiScore * 0.4

  return {
    gan: { relation: ganResult.relation, score: ganScore },
    zhi: { relation: zhiResult.relation, score: zhiScore },
    composite: Math.round(composite * 10) / 10
  }
}

/**
 * 完整四柱 × 行业的能量评分
 * @param {object} pillars - computePillars() 返回的四柱
 * @param {string} industryWuxing - 行业主五行
 * @param {string} industryWuxing2 - 行业次五行（可选）
 * @returns {{
 *   year: { gan, zhi, composite },
 *   month: { gan, zhi, composite },
 *   day: { gan, zhi, composite },
 *   hour: { gan, zhi, composite },
 *   totalScore: number,    // 加权总分
 *   totalMax: number,      // 理论最高分
 *   totalPercent: number   // 百分比
 * }}
 */
export function computeEnergyScore(pillars, industryWuxing, industryWuxing2 = null) {
  const pillarNames = ['year', 'month', 'day', 'hour']
  // 柱权重：年×1, 月×2, 日×3, 时×2
  const pillarWeights = { year: 1, month: 2, day: 3, hour: 2 }

  const results = {}
  let totalScore = 0
  let totalMax = 0

  for (const name of pillarNames) {
    const pillar = pillars[name]
    const analysis = analyzePillarInteraction(pillar, industryWuxing, industryWuxing2)

    results[name] = analysis
    totalScore += analysis.composite * pillarWeights[name]
    totalMax += 2 * pillarWeights[name] // 理论上每个柱最高得2分（生我）
  }

  // 归一化到 [-1, 1] 或保持原始分
  const totalPercent = totalMax > 0 ? totalScore / totalMax : 0

  return {
    ...results,
    totalScore: Math.round(totalScore * 10) / 10,
    totalMax,
    totalPercent: Math.round(totalPercent * 1000) / 10
  }
}

/**
 * 根据总分判定信号
 * @param {number} totalScore
 * @param {number} totalMax
 * @returns {{ signal: string, label: string, color: string }}
 */
export function getSignal(totalPercent) {
  if (totalPercent >= 50) return { signal: 'strong_bull', label: '强吉 🟢', color: '#22c55e' }
  if (totalPercent >= 25) return { signal: 'bull', label: '偏吉 🟡', color: '#a3e635' }
  if (totalPercent >= -10) return { signal: 'neutral', label: '中性 ⚪', color: '#94a3b8' }
  if (totalPercent >= -35) return { signal: 'bear', label: '偏凶 🟠', color: '#f97316' }
  return { signal: 'strong_bear', label: '大凶 🔴', color: '#ef4444' }
}

/**
 * 获取五行对应的颜色
 */
export function getWuxingColor(wuxing) {
  const colors = {
    '木': '#22c55e',
    '火': '#ef4444',
    '土': '#eab308',
    '金': '#f59e0b',
    '水': '#3b82f6'
  }
  return colors[wuxing] || '#64748b'
}

/**
 * 获取五行对应的背景色（浅色）
 */
export function getWuxingBgColor(wuxing) {
  const colors = {
    '木': '#f0fdf4',
    '火': '#fef2f2',
    '土': '#fefce8',
    '金': '#fffbeb',
    '水': '#eff6ff'
  }
  return colors[wuxing] || '#f8fafc'
}

export { WUXING, SHENG_MAP, KE_MAP, SHENG_WO_MAP, KE_WO_MAP }
