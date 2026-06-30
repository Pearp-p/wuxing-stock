<template>
  <div class="industry-table-wrap">
    <div class="table-header">
      <h3>📊 申万行业五行能量表</h3>
      <div class="table-legend">
        <span class="lg-it"><span class="dot g"></span> 强吉</span>
        <span class="lg-it"><span class="dot y"></span> 偏吉</span>
        <span class="lg-it"><span class="dot n"></span> 中性</span>
        <span class="lg-it"><span class="dot o"></span> 偏凶</span>
        <span class="lg-it"><span class="dot r"></span> 大凶</span>
      </div>
    </div>

    <div class="table-scroll">
      <table>
        <thead>
          <tr>
            <th class="col-rank">#</th>
            <th class="col-name">行业</th>
            <th class="col-wx">五行</th>
            <th class="col-pillar">年柱{{ yearGan }}</th>
            <th class="col-pillar">月柱{{ monthGan }}</th>
            <th class="col-pillar">日柱{{ dayGan }}</th>
            <th class="col-pillar">时柱{{ hourGan }}</th>
            <th class="col-score">总评分</th>
            <th class="col-signal">信号</th>
            <th class="col-stock" v-if="hasStockData">涨跌幅</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, idx) in sortedRows"
            :key="row.name"
            :class="row.signalClass"
          >
            <td class="col-rank">{{ idx + 1 }}</td>
            <td class="col-name">
              <span class="name-text">{{ row.name }}</span>
              <span v-if="row.wuxing2" class="sub-wx" :style="{ color: row.wx2Color }">{{ row.wuxing2 }}</span>
            </td>
            <td class="col-wx">
              <span class="wx-badge" :style="{ background: row.wxColor }">{{ row.wuxing }}</span>
            </td>
            <td class="col-pillar" v-html="row.yearCell"></td>
            <td class="col-pillar" v-html="row.monthCell"></td>
            <td class="col-pillar" v-html="row.dayCell"></td>
            <td class="col-pillar" v-html="row.hourCell"></td>
            <td class="col-score" :class="row.scoreClass">{{ row.displayScore }}</td>
            <td class="col-signal">
              <span class="signal-badge" :class="row.signal">{{ row.signalLabel }}</span>
            </td>
            <td class="col-stock" v-if="hasStockData">
              <span v-if="row.stockData" :class="row.stockData.changePct >= 0 ? 'up' : 'down'">
                {{ row.stockData.changePct >= 0 ? '+' : '' }}{{ row.stockData.changePct?.toFixed(2) }}%
              </span>
              <span v-else class="no-data">--</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { INDUSTRIES } from '../data/industries.js'
import { computeEnergyScore, getSignal, getWuxingColor } from '../engine/wuxing.js'

const props = defineProps({
  pillars: { type: Object, required: true },
  stockData: { type: Map, default: () => new Map() }
})

const hasStockData = computed(() => props.stockData.size > 0)
const yearGan = computed(() => props.pillars.year.ganzhi)
const monthGan = computed(() => props.pillars.month.ganzhi)
const dayGan = computed(() => props.pillars.day.ganzhi)
const hourGan = computed(() => props.pillars.hour.ganzhi)

// 单柱交互的HTML展示
function pillarCellHTML(pillarInteraction) {
  const g = pillarInteraction.gan
  const z = pillarInteraction.zhi
  const gColor = g.score > 0 ? '#22c55e' : g.score < 0 ? '#ef4444' : '#94a3b8'
  const zColor = z.score > 0 ? '#22c55e' : z.score < 0 ? '#ef4444' : '#94a3b8'
  return `<span style="color:${gColor};font-weight:600">${g.relation}</span> <span style="color:${zColor};font-weight:600">${z.relation}</span>`
}

const sortedRows = computed(() => {
  return INDUSTRIES.map(ind => {
    const result = computeEnergyScore(props.pillars, ind.wuxing, ind.wuxing2)
    const signal = getSignal(result.totalPercent)
    const stockData = props.stockData.get(ind.name) || null

    return {
      name: ind.name,
      wuxing: ind.wuxing,
      wuxing2: ind.wuxing2,
      wxColor: getWuxingColor(ind.wuxing),
      wx2Color: ind.wuxing2 ? getWuxingColor(ind.wuxing2) : '',
      yearCell: pillarCellHTML(result.year),
      monthCell: pillarCellHTML(result.month),
      dayCell: pillarCellHTML(result.day),
      hourCell: pillarCellHTML(result.hour),
      totalScore: result.totalScore,
      totalPercent: result.totalPercent,
      displayScore: result.totalScore > 0 ? `+${result.totalScore}` : `${result.totalScore}`,
      scoreClass: result.totalPercent >= 25 ? 'score-bull' : result.totalPercent >= -10 ? 'score-neutral' : 'score-bear',
      signal: signal.signal,
      signalLabel: signal.label,
      signalClass: signal.signal === 'strong_bull' ? 'row-bull' : signal.signal === 'bull' ? 'row-bullish' : signal.signal === 'strong_bear' ? 'row-bear' : signal.signal === 'bear' ? 'row-bearish' : '',
      stockData
    }
  }).sort((a, b) => b.totalPercent - a.totalPercent)
})
</script>

<style scoped>
.industry-table-wrap {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
}
.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #f1f5f9;
}
.table-header h3 {
  font-size: 15px;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}
.table-legend { display: flex; gap: 12px; font-size: 11px; }
.lg-it { display: flex; align-items: center; gap: 3px; color: #94a3b8; }
.dot { width: 8px; height: 8px; border-radius: 50%; }
.dot.g { background: #22c55e; }
.dot.y { background: #a3e635; }
.dot.n { background: #94a3b8; }
.dot.o { background: #f97316; }
.dot.r { background: #ef4444; }
.table-scroll { overflow-x: auto; }
table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}
thead { background: #f8fafc; }
th {
  padding: 10px 8px;
  text-align: center;
  font-weight: 600;
  color: #475569;
  font-size: 11px;
  letter-spacing: 0.5px;
  border-bottom: 2px solid #e2e8f0;
  white-space: nowrap;
}
td {
  padding: 10px 8px;
  text-align: center;
  border-bottom: 1px solid #f1f5f9;
}
.col-rank { width: 36px; color: #94a3b8; font-size: 12px; }
.col-name { text-align: left; min-width: 80px; }
.name-text { font-weight: 500; color: #1e293b; }
.sub-wx { font-size: 11px; margin-left: 4px; }
.col-wx { width: 50px; }
.wx-badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 10px;
  color: #fff;
  font-size: 11px;
  font-weight: 600;
}
.col-pillar { min-width: 70px; font-size: 11px; line-height: 1.6; }
.col-score { width: 60px; font-weight: 700; }
.score-bull { color: #22c55e; }
.score-neutral { color: #94a3b8; }
.score-bear { color: #ef4444; }
.signal-badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
}
.signal-badge.strong_bull { background: #dcfce7; color: #16a34a; }
.signal-badge.bull { background: #f7fee7; color: #65a30d; }
.signal-badge.neutral { background: #f1f5f9; color: #64748b; }
.signal-badge.bear { background: #fff7ed; color: #ea580c; }
.signal-badge.strong_bear { background: #fef2f2; color: #dc2626; }
.row-bull { background: #f0fdf4; }
.row-bullish { background: #f7fee74a; }
.row-bear { background: #fff7ed4a; }
.row-bearish { background: #fff7ed; }
.col-stock { width: 80px; font-weight: 600; }
.col-stock .up { color: #dc2626; }
.col-stock .down { color: #16a34a; }
.col-stock .no-data { color: #cbd5e1; }
@media (max-width: 768px) {
  th, td { padding: 8px 4px; font-size: 11px; }
  .col-pillar { min-width: 50px; }
}
</style>
