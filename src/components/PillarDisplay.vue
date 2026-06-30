<template>
  <div class="pillar-display">
    <div
      v-for="p in pillars"
      :key="p.key"
      class="pillar-card"
      :style="{ borderTopColor: p.color }"
    >
      <div class="pillar-label">{{ p.label }}</div>
      <div class="pillar-ganzhi">{{ p.data.ganzhi }}</div>
      <div class="pillar-wuxing">
        <span class="wuxing-tag" :style="{ background: wxColor(p.data.ganWuxing) }">
          {{ p.data.ganWuxing }}
        </span>
        <span class="wuxing-tag" :style="{ background: wxColor(p.data.zhiWuxing) }">
          {{ p.data.zhiWuxing }}
        </span>
      </div>
      <div class="pillar-detail">{{ p.data.gan }}·{{ p.data.zhi }}</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { getWuxingColor } from '../engine/wuxing.js'

const props = defineProps({
  pillars: { type: Object, required: true }
})

const wxColor = getWuxingColor

const pillars = computed(() => [
  { key: 'year',  label: '年柱', data: props.pillars.year,  color: wxColor(props.pillars.year.ganWuxing) },
  { key: 'month', label: '月柱', data: props.pillars.month, color: wxColor(props.pillars.month.ganWuxing) },
  { key: 'day',   label: '日柱', data: props.pillars.day,   color: wxColor(props.pillars.day.ganWuxing) },
  { key: 'hour',  label: '时柱', data: props.pillars.hour,  color: wxColor(props.pillars.hour.ganWuxing) },
])
</script>

<style scoped>
.pillar-display {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}
.pillar-card {
  text-align: center;
  padding: 16px 8px;
  border-radius: 10px;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-top: 3px solid;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
}
.pillar-label {
  font-size: 12px;
  color: #64748b;
  letter-spacing: 1px;
  margin-bottom: 6px;
}
.pillar-ganzhi {
  font-size: 28px;
  font-weight: 700;
  color: #1e293b;
  font-family: 'KaiTi', 'STKaiti', '楷体', serif;
  letter-spacing: 2px;
}
.pillar-wuxing {
  display: flex;
  gap: 6px;
  justify-content: center;
  margin-top: 8px;
}
.wuxing-tag {
  display: inline-block;
  width: 24px;
  height: 24px;
  line-height: 24px;
  border-radius: 50%;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
}
.pillar-detail {
  font-size: 12px;
  color: #94a3b8;
  margin-top: 6px;
}
@media (max-width: 640px) {
  .pillar-display { grid-template-columns: repeat(2, 1fr); }
}
</style>
