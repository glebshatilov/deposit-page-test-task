<template>
  <div class="summary-info-notices">
    <div v-for="(item, index) in list" :key="index" class="summary-info-notices__item summary-info-notices-item">
      <div class="summary-info-notices-item__title">
        {{ item.title }}
      </div>
      <div class="summary-info-notices-item__text">
        {{ item.text }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SummaryInfoNotices',

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
.summary-info-notices {
  padding: 0 var(--inner-padding);
}

.summary-info-notices-item {
  &__title {
    font-weight: 700;
  }

  &__text {
    margin-top: 6px;
  }

  &:not(:first-child) {
    margin-top: var(--m-margin);
  }
}
</style>
