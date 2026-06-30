/**
 * 天干地支基础定义与计算
 * — 干支纪年/纪月/纪日/纪时的底层数据
 */

// ── 天干 ──────────────────────────────
export const TIAN_GAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']

// ── 地支 ──────────────────────────────
export const DI_ZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']

// ── 天干五行 ──────────────────────────
// 甲乙→木 丙丁→火 戊己→土 庚辛→金 壬癸→水
export const TG_WUXING = ['木', '木', '火', '火', '土', '土', '金', '金', '水', '水']

// ── 地支五行 ──────────────────────────
// 寅卯→木 巳午→火 申酉→金 亥子→水 辰戌丑未→土
export const DZ_WUXING = ['水', '土', '木', '木', '土', '火', '火', '土', '金', '金', '土', '水']

// ── 60甲子数组 ────────────────────────
export const SIXTY_JIAZI = []
for (let i = 0; i < 60; i++) {
  SIXTY_JIAZI.push(TIAN_GAN[i % 10] + DI_ZHI[i % 12])
}

// ── 天干索引 → 60甲子首个天干的序号 ──
const TG_INIT = { '甲': 0, '乙': 1, '丙': 2, '丁': 3, '戊': 4, '己': 5, '庚': 6, '辛': 7, '壬': 8, '癸': 9 }

/**
 * 五虎遁 — 根据年干，求寅月（正月）的月干
 * 甲己之年丙作首 → 年干甲/己 → 寅月为丙寅 → 月干索引=2
 * 乙庚之岁戊为头 → 年干乙/庚 → 寅月为戊寅 → 月干索引=4
 * 丙辛必定寻庚起 → 年干丙/辛 → 寅月为庚寅 → 月干索引=6
 * 丁壬壬位顺行流 → 年干丁/壬 → 寅月为壬寅 → 月干索引=8
 * 戊癸何方发，甲寅之上好追求 → 年干戊/癸 → 寅月为甲寅 → 月干索引=0
 */
const WU_HU = { '甲': 2, '乙': 4, '丙': 6, '丁': 8, '戊': 0, '己': 2, '庚': 4, '辛': 6, '壬': 8, '癸': 0 }

/**
 * 五鼠遁 — 根据日干，求子时的时干
 * 甲己还加甲 → 日干甲/己 → 子时天干甲 → 索引=0
 * 乙庚丙作初 → 日干乙/庚 → 子时天干丙 → 索引=2
 * 丙辛从戊起 → 日干丙/辛 → 子时天干戊 → 索引=4
 * 丁壬庚子居 → 日干丁/壬 → 子时天干庚 → 索引=6
 * 戊癸何方发，壬子是真途 → 日干戊/癸 → 子时天干壬 → 索引=8
 */
const WU_SHU = { '甲': 0, '乙': 2, '丙': 4, '丁': 6, '戊': 8, '己': 0, '庚': 2, '辛': 4, '壬': 6, '癸': 8 }

/**
 * 根据年干，求指定月份的月干支
 * @param {number} yearGanIndex - 年天干索引 (0=甲,9=癸)
 * @param {number} monthZhiIndex - 月地支索引 (0=寅,1=卯,...,11=丑)
 * @returns {{ gan: string, zhi: string, ganzhi: string }}
 */
export function getMonthPillar(yearGan, monthZhiIndex) {
  const yearGanChar = TIAN_GAN[typeof yearGan === 'number' ? yearGan : TG_INIT[yearGan]]
  const yinGanIndex = WU_HU[yearGanChar]
  const monthGanIndex = (yinGanIndex + monthZhiIndex) % 10
  // monthZhiIndex 是 0-based 月序（0=寅月, 1=卯月, ..., 11=丑月）
  // 转为绝对地支索引（寅在DI_ZHI中索引为2）
  const absZhiIndex = (2 + monthZhiIndex) % 12
  return {
    gan: TIAN_GAN[monthGanIndex],
    zhi: DI_ZHI[absZhiIndex],
    ganzhi: TIAN_GAN[monthGanIndex] + DI_ZHI[absZhiIndex]
  }
}

/**
 * 根据日干，求指定时辰的时干支
 * @param {string|number} dayGan - 日天干
 * @param {number} hourZhiIndex - 时地支索引 (0=子,1=丑,...,11=亥)
 * @returns {{ gan: string, zhi: string, ganzhi: string }}
 */
export function getHourPillar(dayGan, hourZhiIndex) {
  const dayGanChar = typeof dayGan === 'number' ? TIAN_GAN[dayGan] : dayGan
  const ziGanIndex = WU_SHU[dayGanChar]
  const hourGanIndex = (ziGanIndex + hourZhiIndex) % 10
  return {
    gan: TIAN_GAN[hourGanIndex],
    zhi: DI_ZHI[hourZhiIndex],
    ganzhi: TIAN_GAN[hourGanIndex] + DI_ZHI[hourZhiIndex]
  }
}

/**
 * 根据小时(0-23)，获取时辰地支索引
 * 子时 23-1 → 0, 丑时 1-3 → 1, 寅时 3-5 → 2, ...
 * @param {number} hour - 0-23
 * @returns {number} 地支索引 0-11
 */
export function getHourZhiIndex(hour) {
  // 23点属于子时(0), 0点也属于子时(0)
  // 1-2→丑(1), 3-4→寅(2), 5-6→卯(3), 7-8→辰(4), 9-10→巳(5)
  // 11-12→午(6), 13-14→未(7), 15-16→申(8), 17-18→酉(9), 19-20→戌(10), 21-22→亥(11)
  return Math.floor(((hour + 1) % 24) / 2)
}

/**
 * 计算日干支在60甲子中的索引 (0-based)
 * 以 1900-01-01 = 甲戌日 (60甲子索引=10) 为基准
 * @param {Date} date
 * @returns {number} 0-59
 */
export function getDayGanzhiIndex(date) {
  // 1900-01-01 的 days 基准
  const epoch = new Date(1900, 0, 1)
  const msPerDay = 86400000
  const days = Math.floor((date.getTime() - epoch.getTime()) / msPerDay)
  // 1900-01-01 为甲戌，序号 10
  return (((10 + days) % 60) + 60) % 60
}

/**
 * 获取日柱的完整干支信息
 * @param {Date} date
 * @returns {{ gan: string, zhi: string, ganzhi: string, index: number }}
 */
export function getDayPillar(date) {
  const index = getDayGanzhiIndex(date)
  return {
    gan: TIAN_GAN[index % 10],
    zhi: DI_ZHI[index % 12],
    ganzhi: SIXTY_JIAZI[index],
    index
  }
}

/**
 * 获取年柱的干支信息（以立春为界）
 * @param {number} year - 公历年份
 * @param {boolean} beforeLiChun - 是否在立春之前
 * @returns {{ gan: string, zhi: string, ganzhi: string }}
 */
export function getYearPillar(year, beforeLiChun = false) {
  const adjustedYear = beforeLiChun ? year - 1 : year
  const ganIndex = (adjustedYear - 4) % 10
  const zhiIndex = (adjustedYear - 4) % 12
  return {
    gan: TIAN_GAN[ganIndex >= 0 ? ganIndex : ganIndex + 10],
    zhi: DI_ZHI[zhiIndex >= 0 ? zhiIndex : zhiIndex + 12],
    ganzhi: TIAN_GAN[ganIndex >= 0 ? ganIndex : ganIndex + 10] + DI_ZHI[zhiIndex >= 0 ? zhiIndex : zhiIndex + 12]
  }
}

/**
 * 从天干字获取五行
 */
export function getTGWuxing(tg) {
  const idx = typeof tg === 'number' ? tg : TIAN_GAN.indexOf(tg)
  return TG_WUXING[idx]
}

/**
 * 从地支字获取五行
 */
export function getDZWuxing(dz) {
  const idx = typeof dz === 'number' ? dz : DI_ZHI.indexOf(dz)
  return DZ_WUXING[idx]
}

/**
 * 从60甲子序号获取干支字符串
 */
export function getGanzhi(index) {
  return SIXTY_JIAZI[((index % 60) + 60) % 60]
}
