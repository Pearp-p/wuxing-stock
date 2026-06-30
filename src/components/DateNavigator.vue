<template>
  <div class="date-nav">
    <button class="nav-btn" @click="goPrev" title="前一天">◀</button>
    <div class="date-display">
      <input
        type="date"
        :value="dateStr"
        @change="onDateChange"
        class="date-input"
      />
      <span class="weekday">{{ weekday }}</span>
    </div>
    <button class="nav-btn" @click="goNext" title="后一天">▶</button>
    <button
      class="nav-btn today-btn"
      @click="goToday"
      :disabled="isToday"
    >
      今天
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  date: { type: Date, required: true }
})

const emit = defineEmits(['update:date'])

const dateStr = computed(() => {
  const d = props.date
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
})

const weekday = computed(() => {
  const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  return days[props.date.getDay()]
})

const isToday = computed(() => {
  const now = new Date()
  return dateStr.value === `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`
})

function goPrev() {
  const d = new Date(props.date)
  d.setDate(d.getDate() - 1)
  emit('update:date', d)
}

function goNext() {
  const d = new Date(props.date)
  d.setDate(d.getDate() + 1)
  emit('update:date', d)
}

function goToday() {
  emit('update:date', new Date())
}

function onDateChange(e) {
  if (e.target.value) {
    emit('update:date', new Date(e.target.value + 'T00:00:00'))
  }
}
</script>

<style scoped>
.date-nav {
  display: flex;
  align-items: center;
  gap: 8px;
}
.date-display {
  display: flex;
  align-items: center;
  gap: 8px;
}
.date-input {
  padding: 6px 10px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  color: #1e293b;
  background: #fff;
  cursor: pointer;
}
.date-input:focus {
  outline: none;
  border-color: #3b82b6;
  box-shadow: 0 0 0 2px rgba(59,130,246,0.1);
}
.weekday {
  font-size: 13px;
  color: #64748b;
  min-width: 36px;
}
.nav-btn {
  padding: 6px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #fff;
  color: #475569;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}
.nav-btn:hover { background: #f1f5f9; }
.nav-btn:disabled { opacity: 0.4; cursor: default; }
.today-btn {
  color: #3b82b6;
  border-color: #bfdbfe;
  font-weight: 600;
  font-size: 12px;
}
.today-btn:hover { background: #eff6ff; }
</style>
