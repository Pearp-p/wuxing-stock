<template>
  <div class="energy-summary">
    <div class="section-title">⚡ 今日五行能量格局</div>

    <!-- 五行能量条 -->
    <div class="energy-bars">
      <div v-for="item in energyData" :key="item.wx" class="energy-row">
        <div class="energy-label" :style="{ color: item.color }">
          {{ item.wx }}
        </div>
        <div class="energy-bar-track">
          <div
            class="energy-bar-fill"
            :style="{ width: item.barPercent + '%', background: item.color }"
          ></div>
        </div>
        <div class="energy-score" :class="item.trendClass">
          {{ item.displayScore }}
        </div>
      </div>
    </div>

    <!-- 说明 -->
    <div class="energy-legend">
      <span class="legend-item"><span class="dot" style="background:#22c55e"></span> 得生（吉）</span>
      <span class="legend-item"><span class="dot" style="background:#94a3b8"></span> 中和</span>
      <span class="legend-item"><span class="dot" style="background:#ef4444"></span> 受克（凶）</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { WUXING, getWuxingColor, computeEnergyScore } from '../engine/wuxing.js'
import { INDUSTRIES } from '../data/industries.js'

const props = defineProps({
  pillars: { type: Object, required: true }
})

const energyData = computed(() => {
  return WUXING.map(wx => {
    // 计算该五行下所有行业的平均得分
    const industries = INDUSTRIES.filter(ind => ind.wuxing === wx)
    if (industries.length === 0) return { wx, avgScore: 0, displayScore: '--' }

    const scores = industries.map(ind => {
      const result = computeEnergyScore(props.pillars, ind.wuxing, ind.wuxing2)
      return result.totalPercent
    })
    const avgPercent = scores.reduce((a, b) => a + b, 0) / scores.length
    const color = getWuxingColor(wx)

    // 转为展示分（满分100）
    const displayScore = Math.round((avgPercent + 100) * 0.5)
    // 最高理论值：归一化到0-100，50为中性
    const barPercent = Math.round((avgPercent + 100) * 0.5)

    let trendClass = ''
    if (avgPercent >= 25) trendClass = 'bull'
    else if (avgPercent >= -10) trendClass = 'neutral'
    else trendClass = 'bear'

    return { wx, barPercent, displayScore, color, trendClass, industries }
  }).sort((a, b) => b.barPercent - a.barPercent)
})
</script>

<style scoped>
.energy-summary {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
}
.section-title {
  font-size: 15px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 16px;
}
.energy-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}
.energy-label {
  width: 24px;
  font-size: 16px;
  font-weight: 700;
  flex-shrink: 0;
}
.energy-bar-track {
  flex: 1;
  height: 22px;
  background: #f1f5f9;
  border-radius: 11px;
  overflow: hidden;
}
.energy-bar-fill {
  height: 100%;
  border-radius: 11px;
  transition: width 0.5s ease;
  min-width: 4px;
}
.energy-score {
  width: 40px;
  text-align: right;
  font-size: 13px;
  font-weight: 600;
  color: #64748b;
}
.energy-score.bull { color: #22c55e; }
.energy-score.neutral { color: #94a3b8; }
.energy-score.bear { color: #ef4444; }
.energy-legend {
  display: flex;
  gap: 16px;
  margin-top: 12px;
  font-size: 12px;
  color: #94a3b8;
}
.legend-item { display: flex; align-items: center; gap: 4px; }
.dot { width: 8px; height: 8px; border-radius: 50%; }
</style>
