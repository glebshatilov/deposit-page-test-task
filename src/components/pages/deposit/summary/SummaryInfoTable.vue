<template>
  <div class="summary-info-table">
    <div v-for="(item, index) in list" :key="index" class="summary-info-table__item summary-info-table-item">
      <div class="summary-info-table-item__label">
        {{ item.label }}
      </div>
      <div class="summary-info-table-item__value">
        {{ item.value }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SummaryInfoTable',

  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style lang="scss">
.summary-info-table {
  background: var(--dark);
  border-radius: var(--border-radius);
  overflow: hidden;
}

.summary-info-table-item {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 12px var(--inner-padding);

  &:nth-child(even) {
    background-color: rgba(0, 0, 0, 0.3);
  }
}
</style>
