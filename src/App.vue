<template>
  <div class="app">
    <!-- 顶栏 -->
    <header class="app-header">
      <div class="header-left">
        <h1 class="app-title">🔮 五行能量 · 申万行业</h1>
        <span class="app-subtitle">干支纪时 × 五行生克 × 行业轮动</span>
      </div>
      <DateNavigator v-model:date="selectedDate" />
    </header>

    <!-- 当前时间显示 -->
    <div class="datetime-bar" v-if="isToday">
      <span class="live-dot"></span> 实时 {{ currentTime }}
    </div>

    <!-- 四柱卡片 -->
    <section class="section">
      <PillarDisplay :pillars="pillars" />
    </section>

    <!-- 四柱说明行 -->
    <div class="pillar-info-row">
      <span>年柱以<strong>立春</strong>为界</span>
      <span>月柱以<strong>节</strong>为始（当前：{{ pillars.month.termName }}）</span>
      <span>日柱以<strong>子时</strong>（23:00）换日</span>
      <span>时柱每<strong>2小时</strong>一变</span>
    </div>

    <!-- 五行能量总览 -->
    <section class="section">
      <EnergySummary :pillars="pillars" />
    </section>

    <section class="section">
      <!-- 加载状态 -->
      <div v-if="loading" class="loading">⏳ 加载行情数据中...</div>

      <!-- 行业能量表 -->
      <IndustryTable :pillars="pillars" :stock-data="stockData" />

      <!-- 行情更新时间 -->
      <div class="update-info" v-if="lastUpdate">
        行情更新：{{ lastUpdate }} | 数据来源：东方财富
      </div>
    </section>

    <!-- 底部说明 -->
    <footer class="app-footer">
      <p>五行分类参考：中信里昂风水指南 · 《协纪辨方书》· 申万2021版行业分类</p>
      <p class="disclaimer">⚠️ 五行能量分析仅供研究参考，不构成投资建议。股市有风险，投资需谨慎。</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import PillarDisplay from './components/PillarDisplay.vue'
import EnergySummary from './components/EnergySummary.vue'
import IndustryTable from './components/IndustryTable.vue'
import DateNavigator from './components/DateNavigator.vue'
import { computePillars } from './engine/pillars.js'
import { getIndustryStockData } from './api/stock.js'

// ── 日期状态 ──
const selectedDate = ref(new Date())
const currentTime = ref('')

// ── 四柱计算（响应式） ──
const pillars = computed(() => {
  const d = new Date(selectedDate.value)
  // 如果是今天，使用实时时间；否则使用当天12:00
  const now = new Date()
  const isToday = d.toDateString() === now.toDateString()
  if (isToday) {
    d.setHours(now.getHours(), now.getMinutes(), now.getSeconds())
  } else {
    d.setHours(12, 0, 0)
  }
  return computePillars(d)
})

const isToday = computed(() => {
  const now = new Date()
  return selectedDate.value.toDateString() === now.toDateString()
})

// ── 实时时间 ──
let timeTimer = null
function updateTime() {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('zh-CN', { hour12: false })
}
onMounted(() => { updateTime(); timeTimer = setInterval(updateTime, 1000) })
onUnmounted(() => { clearInterval(timeTimer) })

// ── 行情数据 ──
const stockData = ref(new Map())
const loading = ref(false)
const lastUpdate = ref('')
let stockTimer = null

async function refreshStockData() {
  loading.value = true
  try {
    const data = await getIndustryStockData()
    stockData.value = data
    const now = new Date()
    lastUpdate.value = now.toLocaleTimeString('zh-CN', { hour12: false })
  } catch (e) {
    console.error('行情加载失败', e)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  refreshStockData()
  stockTimer = setInterval(refreshStockData, 60000) // 每60秒刷新
})
onUnmounted(() => { clearInterval(stockTimer) })

// 切换日期时，如果切到今天则刷新行情
watch(selectedDate, (newDate) => {
  const now = new Date()
  if (newDate.toDateString() === now.toDateString()) {
    refreshStockData()
  }
})
</script>

<style scoped>
.app {
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px 16px 40px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
}
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  flex-wrap: wrap;
  gap: 12px;
}
.header-left { display: flex; align-items: baseline; gap: 12px; flex-wrap: wrap; }
.app-title { font-size: 22px; font-weight: 700; color: #0f172a; margin: 0; letter-spacing: 1px; }
.app-subtitle { font-size: 13px; color: #94a3b8; }
.datetime-bar {
  text-align: center;
  font-size: 13px;
  color: #64748b;
  margin-bottom: 16px;
}
.live-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22c55e;
  margin-right: 4px;
  animation: pulse 2s infinite;
}
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
.section { margin-bottom: 20px; }
.pillar-info-row {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
  font-size: 12px;
  color: #94a3b8;
  margin: 8px 0 20px;
}
.loading { text-align: center; padding: 20px; color: #94a3b8; font-size: 14px; }
.update-info {
  text-align: right;
  font-size: 11px;
  color: #cbd5e1;
  margin-top: 8px;
}
.app-footer {
  text-align: center;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #f1f5f9;
  font-size: 12px;
  color: #94a3b8;
  line-height: 1.8;
}
.disclaimer { color: #cbd5e1; }
@media (max-width: 640px) {
  .app { padding: 12px 8px 24px; }
  .app-title { font-size: 18px; }
}
</style>
