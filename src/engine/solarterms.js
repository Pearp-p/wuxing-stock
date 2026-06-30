/**
 * 24节气日期计算
 * 用于确定月柱的起始边界（月柱以节为始）
 *
 * 月柱 → 节气对应：
 *   寅月←立春  卯月←惊蛰  辰月←清明  巳月←立夏
 *   午月←芒种  未月←小暑  申月←立秋  酉月←白露
 *   戌月←寒露  亥月←立冬  子月←大雪  丑月←小寒
 */

// 节气名称
export const SOLAR_TERMS = [
  '小寒', '大寒', '立春', '雨水', '惊蛰', '春分', '清明', '谷雨',
  '立夏', '小满', '芒种', '夏至', '小暑', '大暑', '立秋', '处暑',
  '白露', '秋分', '寒露', '霜降', '立冬', '小雪', '大雪', '冬至'
]

// 月份柱对应的起始节气索引
// 寅月(0)→立春(2), 卯月(1)→惊蛰(4), ..., 丑月(11)→小寒(0)
export const MONTH_START_TERM = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 0]

// ── 节气基准日期表（2020-2030） ───────────────────────────────
// 数据格式：年 → 月日字符串（MMDD）的逗号分隔列表
// 顺序：小寒…冬至（共24项）
// 来源：寿星万年历 + 天文年历校验，精度±1日
const RAW_DATA = {
  2020: '0106,0120,0204,0219,0305,0320,0404,0419,0505,0520,0605,0621,0706,0722,0807,0822,0907,0922,1008,1023,1107,1122,1207,1221',
  2021: '0105,0120,0203,0218,0305,0320,0404,0420,0505,0521,0605,0621,0707,0722,0807,0823,0907,0923,1008,1023,1107,1122,1207,1221',
  2022: '0105,0120,0204,0219,0305,0320,0405,0420,0505,0521,0606,0621,0707,0723,0807,0823,0907,0923,1008,1023,1107,1122,1207,1222',
  2023: '0105,0120,0204,0219,0306,0321,0405,0420,0506,0521,0606,0621,0707,0723,0808,0823,0908,0923,1008,1024,1108,1122,1207,1222',
  2024: '0106,0120,0204,0219,0305,0320,0404,0419,0505,0520,0605,0621,0706,0722,0807,0822,0907,0922,1008,1023,1107,1122,1206,1221',
  2025: '0105,0120,0203,0218,0305,0320,0404,0420,0505,0521,0605,0621,0707,0722,0807,0823,0907,0923,1008,1023,1107,1122,1207,1221',
  2026: '0105,0120,0204,0218,0305,0320,0405,0420,0505,0521,0605,0621,0707,0722,0807,0823,0907,0923,1008,1023,1107,1122,1207,1222',
  2027: '0105,0120,0204,0219,0306,0321,0405,0420,0506,0521,0606,0621,0707,0723,0808,0823,0908,0923,1008,1023,1107,1122,1207,1222',
  2028: '0106,0120,0204,0219,0305,0320,0404,0419,0505,0520,0605,0620,0706,0722,0807,0822,0907,0922,1008,1023,1107,1122,1206,1221',
  2029: '0105,0120,0203,0218,0305,0320,0404,0420,0505,0521,0605,0621,0707,0722,0807,0823,0907,0923,1008,1023,1107,1122,1207,1221',
  2030: '0105,0120,0204,0218,0305,0320,0405,0420,0505,0521,0605,0621,0707,0723,0807,0823,0907,0923,1008,1023,1107,1122,1207,1222',
}

// 解析为 { [year]: [[month, day], ...] }
const TERM_TABLE = {}
for (const [yearStr, dataStr] of Object.entries(RAW_DATA)) {
  TERM_TABLE[parseInt(yearStr)] = dataStr.split(',').map(s => [
    parseInt(s.substring(0, 2)),
    parseInt(s.substring(2, 4))
  ])
}

/**
 * 获取指定年份的某个节气日期
 * @param {number} year - 公历年份
 * @param {number} termIndex - 节气索引 (0=小寒, 1=大寒, ..., 23=冬至)
 * @returns {Date}
 */
export function getSolarTermDate(year, termIndex) {
  let month, day

  if (TERM_TABLE[year]) {
    // 精确查表
    ;[month, day] = TERM_TABLE[year][termIndex]
  } else {
    // 外推：找到最近的基准年，用近似公式调整
    const baseYear = year < 2020 ? 2020 : 2030
    const yearDiff = year - baseYear
    const [baseMonth, baseDay] = TERM_TABLE[baseYear][termIndex]

    // 节气每年约推迟 5h49m (≈0.2422天)，累积四年约1天（闰年调整）
    month = baseMonth
    day = baseDay + Math.round(yearDiff * 0.2422)

    // 简单的月末回绕
    const daysInMonth = new Date(year, month, 0).getDate()
    while (day > daysInMonth) {
      day -= daysInMonth
      month++
      if (month > 12) { month -= 12; /* 实际上节气不会跨年太多 */ }
    }
    while (day < 1) {
      month--
      day += new Date(year, month, 0).getDate()
    }
  }

  return new Date(year, month - 1, day)
}

/**
 * 判断给定日期在节气周期中的位置，返回当月的月柱地支索引
 * 寅月=0, 卯月=1, ..., 丑月=11
 * @param {Date} date
 * @returns {number} 月地支索引
 */
export function getMonthZhiIndex(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  // 检查12个"节"（月柱起始节气）
  for (let mi = 0; mi < 12; mi++) {
    const termIndex = MONTH_START_TERM[mi]
    const [tMonth, tDay] = getTermDate(year, termIndex)
    if (month < tMonth || (month === tMonth && day < tDay)) {
      // 当前月柱是上一个
      return (mi - 1 + 12) % 12
    }
  }

  // 在最后一个节（12月大雪，termIndex=22）之后 → 子月(4)
  // 检查是否进入次年小寒前
  const [nextXiaoHanMonth, nextXiaoHanDay] = getTermDate(year + 1, 0)
  if (month < nextXiaoHanMonth || (month === nextXiaoHanMonth && day < nextXiaoHanDay)) {
    return 4 // 子月
  }
  return 5 // 丑月
}

/**
 * 辅助：获取节气日期 [month, day]
 */
function getTermDate(year, termIndex) {
  if (termIndex >= 0 && termIndex <= 22) {
    // 当年的节
    return getTermDateInner(year, termIndex)
  } else {
    // 小寒(termIndex=0)是次年1月，这里处理为大寒(termIndex=1)后就是下一年的节气
    // 实际上调用方应该不会传termIndex<0
    return getTermDateInner(year, termIndex)
  }
}

function getTermDateInner(year, termIndex) {
  if (TERM_TABLE[year]) {
    return TERM_TABLE[year][termIndex]
  }
  // fallback: use base year
  const baseYear = year < 2020 ? 2020 : 2030
  const [bm, bd] = TERM_TABLE[baseYear][termIndex]
  const diff = year - baseYear
  // Very rough approximation
  const approxDay = bd + Math.round(diff * 0.2422)
  // Simple clamping
  const daysInMonth = new Date(year, bm, 0).getDate()
  if (approxDay > daysInMonth) {
    return [bm + 1 > 12 ? 1 : bm + 1, approxDay - daysInMonth]
  }
  if (approxDay < 1) {
    return [bm - 1 < 1 ? 12 : bm - 1, approxDay + new Date(year, bm - 1, 0).getDate()]
  }
  return [bm, approxDay]
}

/**
 * 判断给定日期是否在立春前（用于确定年柱归属）
 * @param {Date} date
 * @returns {boolean}
 */
export function isBeforeLiChun(date) {
  const year = date.getFullYear()
  const [lcMonth, lcDay] = getTermDateInner(year, 2) // 立春 = term index 2
  return (date.getMonth() + 1 < lcMonth) ||
         (date.getMonth() + 1 === lcMonth && date.getDate() < lcDay)
}

/**
 * 获取指定日期所在月柱的起始节气
 */
export function getCurrentMonthStartTerm(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  for (let mi = 0; mi < 12; mi++) {
    const termIndex = MONTH_START_TERM[mi]
    const [tMonth, tDay] = getTermDateInner(year, termIndex)
    if (month < tMonth || (month === tMonth && day < tDay)) {
      const prevMi = (mi - 1 + 12) % 12
      const prevTermIndex = MONTH_START_TERM[prevMi]
      return { monthZhiIndex: prevMi, termIndex: prevTermIndex, termName: SOLAR_TERMS[prevTermIndex] }
    }
  }

  // After last term → 子月 or 丑月
  const [xhMonth, xhDay] = getTermDateInner(year + 1, 0) // next year 小寒
  if (month < xhMonth || (month === xhMonth && day < xhDay)) {
    return { monthZhiIndex: 4, termIndex: 22, termName: '大雪' }
  }
  return { monthZhiIndex: 5, termIndex: 0, termName: '小寒' }
}
