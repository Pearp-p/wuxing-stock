/**
 * 东方财富行情API封装
 * 获取申万行业指数的实时行情数据
 */

import { INDUSTRIES } from '../data/industries.js'

/**
 * 从东方财富获取行业板块行情数据
 * 使用 push2.eastmoney.com 公开接口
 * @returns {Promise<Array>} 行业行情数据列表
 */
export async function fetchIndustryQuotes() {
  try {
    // 东方财富行业板块API
    // m:90+t2 = 行业板块, m:90+t3 = 概念板块
    // 生产环境直连东方财富API（已允许跨域），开发环境走Vite代理
    const baseUrl = import.meta.env.PROD
      ? 'https://push2.eastmoney.com/api/qt/clist/get'
      : '/api/eastmoney/api/qt/clist/get'
    const url = baseUrl + '?' + new URLSearchParams({
      pn: '1',       // 页码
      pz: '100',     // 每页条数
      po: '1',       // 排序方向
      np: '1',
      fltt: '2',
      invt: '2',
      fid: 'f3',     // 按涨跌幅排序
      fs: 'm:90+t2', // 行业板块过滤
      fields: 'f2,f3,f4,f12,f14,f15,f16,f17,f18,f20' // f2=最新价,f3=涨跌幅,f4=涨跌额,f12=代码,f14=名称,f15=最高,f16=最低,f17=今开,f18=昨收,f20=总市值
    })

    const resp = await fetch(url)
    const json = await resp.json()

    if (!json.data || !json.data.diff) {
      console.warn('东方财富API返回数据为空')
      return []
    }

    return json.data.diff.map(item => ({
      code: item.f12,
      name: item.f14,
      price: item.f2,
      changePct: item.f3,   // 涨跌幅%
      changeAmt: item.f4,   // 涨跌额
      high: item.f15,
      low: item.f16,
      open: item.f17,
      preClose: item.f18,
      marketCap: item.f20
    }))
  } catch (err) {
    console.error('获取行情数据失败:', err)
    return []
  }
}

/**
 * 将东方财富行业行情匹配到申万行业
 * 使用关键词模糊匹配
 * @param {Array} quotes - fetchIndustryQuotes() 的返回结果
 * @returns {Map} 申万行业名称 → 行情数据
 */
export function matchQuotesToIndustries(quotes) {
  const map = new Map()

  for (const ind of INDUSTRIES) {
    let bestMatch = null
    let bestScore = 0

    for (const q of quotes) {
      // 计算匹配度：关键词命中数
      let score = 0
      const qName = q.name
      for (const kw of ind.emKeywords) {
        if (qName.includes(kw)) score++
      }
      // 同时检查申万名称是否包含板块名称
      if (ind.name.includes(qName) || qName.includes(ind.name.substring(0, 2))) {
        score += 2
      }

      if (score > bestScore) {
        bestScore = score
        bestMatch = q
      }
    }

    if (bestMatch && bestScore >= 1) {
      map.set(ind.name, bestMatch)
    }
  }

  return map
}

/**
 * 获取申万行业指数的实时行情（匹配后）
 * @returns {Promise<Map>} 申万行业名称 → 行情数据
 */
export async function getIndustryStockData() {
  const quotes = await fetchIndustryQuotes()
  return matchQuotesToIndustries(quotes)
}
