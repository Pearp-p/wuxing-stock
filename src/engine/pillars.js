/**
 * 四柱（年柱·月柱·日柱·时柱）完整计算
 */
import {
  getYearPillar, getMonthPillar, getDayPillar, getHourPillar,
  getDayGanzhiIndex, getHourZhiIndex, getTGWuxing, getDZWuxing,
  TIAN_GAN, DI_ZHI, SIXTY_JIAZI
} from './ganzhi.js'
import {
  getMonthZhiIndex, isBeforeLiChun, getCurrentMonthStartTerm,
  SOLAR_TERMS
} from './solarterms.js'

/**
 * 计算指定日期时间的完整四柱
 * @param {Date} date
 * @returns {{
 *   year: { ganzhi, gan, zhi, ganWuxing, zhiWuxing },
 *   month: { ganzhi, gan, zhi, ganWuxing, zhiWuxing, monthZhiIndex, termName },
 *   day: { ganzhi, gan, zhi, ganWuxing, zhiWuxing, index },
 *   hour: { ganzhi, gan, zhi, ganWuxing, zhiWuxing, hourZhiIndex }
 * }}
 */
export function computePillars(date) {
  const year = date.getFullYear()
  const hour = date.getHours()

  // ── 年柱 ──
  const beforeLC = isBeforeLiChun(date)
  const yearPillar = getYearPillar(year, beforeLC)

  // ── 月柱 ──
  const monthZhiIndex = getMonthZhiIndex(date)
  const monthPillar = getMonthPillar(yearPillar.gan, monthZhiIndex)
  const monthStart = getCurrentMonthStartTerm(date)

  // ── 日柱 ──
  const dayPillar = getDayPillar(date)

  // ── 时柱 ──
  const hourZhiIndex = getHourZhiIndex(hour)
  const hourPillar = getHourPillar(dayPillar.gan, hourZhiIndex)

  return {
    year: {
      ganzhi: yearPillar.ganzhi,
      gan: yearPillar.gan,
      zhi: yearPillar.zhi,
      ganWuxing: getTGWuxing(yearPillar.gan),
      zhiWuxing: getDZWuxing(yearPillar.zhi)
    },
    month: {
      ganzhi: monthPillar.ganzhi,
      gan: monthPillar.gan,
      zhi: monthPillar.zhi,
      ganWuxing: getTGWuxing(monthPillar.gan),
      zhiWuxing: getDZWuxing(monthPillar.zhi),
      monthZhiIndex,
      termName: monthStart.termName
    },
    day: {
      ganzhi: dayPillar.ganzhi,
      gan: dayPillar.gan,
      zhi: dayPillar.zhi,
      ganWuxing: getTGWuxing(dayPillar.gan),
      zhiWuxing: getDZWuxing(dayPillar.zhi),
      index: dayPillar.index
    },
    hour: {
      ganzhi: hourPillar.ganzhi,
      gan: hourPillar.gan,
      zhi: hourPillar.zhi,
      ganWuxing: getTGWuxing(hourPillar.gan),
      zhiWuxing: getDZWuxing(hourPillar.zhi),
      hourZhiIndex
    }
  }
}

/**
 * 60甲子纳音五行（简化版——用于展示）
 * 来源：《协纪辨方书》
 */
const NA_YIN = [
  '海中金','海中金','炉中火','炉中火','大林木','大林木','路旁土','路旁土','剑锋金','剑锋金',
  '山头火','山头火','涧下水','涧下水','城头土','城头土','白蜡金','白蜡金','杨柳木','杨柳木',
  '泉中水','泉中水','屋上土','屋上土','霹雳火','霹雳火','松柏木','松柏木','流年水','流年水',
  '沙中金','沙中金','山下火','山下火','平地木','平地木','壁上土','壁上土','金箔金','金箔金',
  '覆灯火','覆灯火','天河水','天河水','大驿土','大驿土','钗钏金','钗钏金','桑柘木','桑柘木',
  '大溪水','大溪水','沙中土','沙中土','天上火','天上火','石榴木','石榴木','大海水','大海水'
]

/**
 * 获取指定干支的纳音
 * @param {number} ganzhiIndex - 60甲子索引
 * @returns {string}
 */
export function getNaYin(ganzhiIndex) {
  return NA_YIN[((ganzhiIndex % 60) + 60) % 60]
}

/**
 * 格式化四柱为展示文本
 * @param {object} pillars - computePillars() 的返回值
 * @returns {{ year: string, month: string, day: string, hour: string }}
 */
export function formatPillars(pillars) {
  const ny = getNaYin(getDayGanzhiIndex(new Date()) /* 近似，仅用于展示 */)
  return {
    year: `${pillars.year.ganzhi}【${pillars.year.ganWuxing}·${pillars.year.zhiWuxing}】`,
    month: `${pillars.month.ganzhi}【${pillars.month.ganWuxing}·${pillars.month.zhiWuxing}】${pillars.month.termName || ''}`,
    day: `${pillars.day.ganzhi}【${pillars.day.ganWuxing}·${pillars.day.zhiWuxing}】`,
    hour: `${pillars.hour.ganzhi}【${pillars.hour.ganWuxing}·${pillars.hour.zhiWuxing}】`
  }
}
