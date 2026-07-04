<template>
  <div class="ref-panel">
    <div class="ref-header">
      <h2>📖 参考资料库</h2>
      <p class="ref-subtitle">本站方法论的理论来源与数据支撑</p>

      <!-- 分类导航 -->
      <div class="ref-cat-nav">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="activeCat = cat"
          :class="['cat-btn', { active: activeCat === cat }]"
        >
          {{ cat }}
        </button>
      </div>
    </div>

    <!-- 当前分类下的条目 -->
    <div v-for="cat in [activeCat]" :key="cat" class="ref-cat-section">
      <h3 class="cat-title">{{ categoryLabels[cat] || cat }}</h3>

      <div
        v-for="(ref, idx) in groupedRefs[cat]"
        :key="idx"
        class="ref-card"
      >
        <div class="ref-card-header">
          <span class="ref-num">{{ idx + 1 }}</span>
          <div class="ref-title-row">
            <span class="ref-title">{{ ref.title }}</span>
            <span class="ref-author">{{ ref.author }}</span>
          </div>
          <span class="ref-era">{{ ref.dynasty }}</span>
        </div>

        <p class="ref-why">
          <strong>📌 为什么重要：</strong>{{ ref.why }}
        </p>

        <div class="ref-links" v-if="ref.links.length > 0">
          <span class="links-label">🔗 资源：</span>
          <a
            v-for="(link, li) in ref.links"
            :key="li"
            :href="link.url"
            target="_blank"
            rel="noopener"
            class="ref-link"
            :class="'link-' + link.type"
          >
            {{ link.label }}
          </a>
        </div>

        <p class="ref-notes" v-if="ref.notes">
          <em>{{ ref.notes }}</em>
        </p>
      </div>

      <!-- 空状态 -->
      <div v-if="!groupedRefs[cat]?.length" class="ref-empty">
        暂无该分类的参考资料
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { REFERENCES, CATEGORY_ORDER, CATEGORY_LABELS } from '../data/references.js'

const activeCat = ref('择日理论')

const categories = CATEGORY_ORDER.filter(cat =>
  REFERENCES.some(r => r.category === cat)
)

const categoryLabels = CATEGORY_LABELS

const groupedRefs = computed(() => {
  const groups = {}
  for (const cat of categories) {
    groups[cat] = REFERENCES.filter(r => r.category === cat)
  }
  return groups
})
</script>

<style scoped>
.ref-panel {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
}
.ref-header {
  padding: 24px 24px 0;
}
.ref-header h2 {
  font-size: 20px;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 4px;
}
.ref-subtitle {
  font-size: 13px;
  color: #94a3b8;
  margin: 0 0 16px;
}

/* 分类导航 */
.ref-cat-nav {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  padding-bottom: 16px;
  border-bottom: 1px solid #f1f5f9;
}
.cat-btn {
  padding: 6px 14px;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  background: #fff;
  color: #64748b;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}
.cat-btn:hover { background: #f8fafc; color: #334155; }
.cat-btn.active {
  background: #1e293b;
  color: #fff;
  border-color: #1e293b;
}

/* 分类区块 */
.ref-cat-section {
  padding: 20px 24px;
}
.cat-title {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 16px;
  padding-bottom: 10px;
  border-bottom: 2px solid #f1f5f9;
}

/* 卡片 */
.ref-card {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 16px 20px;
  margin-bottom: 12px;
  transition: box-shadow 0.2s;
}
.ref-card:hover { box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
.ref-card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}
.ref-num {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #1e293b;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.ref-title-row { flex: 1; min-width: 0; }
.ref-title {
  font-size: 15px;
  font-weight: 600;
  color: #0f172a;
}
.ref-author {
  display: block;
  font-size: 12px;
  color: #94a3b8;
  margin-top: 2px;
}
.ref-era {
  font-size: 11px;
  color: #94a3b8;
  background: #f1f5f9;
  padding: 2px 8px;
  border-radius: 10px;
  flex-shrink: 0;
}

/* 为什么重要 */
.ref-why {
  font-size: 13px;
  color: #475569;
  line-height: 1.7;
  margin: 0 0 10px;
}
.ref-why strong { color: #0f172a; }

/* 资源链接 */
.ref-links {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 6px;
  margin-bottom: 10px;
}
.links-label { font-size: 12px; color: #64748b; flex-shrink: 0; }
.ref-link {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 14px;
  font-size: 11px;
  text-decoration: none;
  transition: all 0.2s;
}
.link-pdf {
  background: #fef2f2;
  color: #dc2626;
}
.link-pdf:hover { background: #fecaca; }
.link-online {
  background: #eff6ff;
  color: #2563eb;
}
.link-online:hover { background: #bfdbfe; }
.link-article {
  background: #f0fdf4;
  color: #16a34a;
}
.link-article:hover { background: #bbf7d0; }
.link-pan {
  background: #fefce8;
  color: #ca8a04;
}
.link-pan:hover { background: #fef08a; }
.link-reference {
  background: #f8fafc;
  color: #64748b;
}
.link-reference:hover { background: #e2e8f0; }
.link-database {
  background: #faf5ff;
  color: #7c3aed;
}
.link-database:hover { background: #e9d5ff; }
.link-code {
  background: #f1f5f9;
  color: #334155;
}
.link-code:hover { background: #e2e8f0; }
.link-forum {
  background: #fff7ed;
  color: #ea580c;
}
.link-forum:hover { background: #fed7aa; }

/* 备注 */
.ref-notes {
  font-size: 12px;
  color: #94a3b8;
  line-height: 1.6;
  margin: 0;
  padding-top: 8px;
  border-top: 1px dashed #e2e8f0;
}

/* 空状态 */
.ref-empty {
  text-align: center;
  padding: 40px;
  color: #cbd5e1;
  font-size: 14px;
}
</style>
