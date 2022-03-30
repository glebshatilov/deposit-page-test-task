<template>
  <label class="account-card" :class="classList">
    <UiRadio name="account" :value="data.id" :checked="selected" class="account-card__radio" @change="select" />
    <div class="account-card__name">{{ data.name }}</div>
    <div class="account-card__balance account-card-balance">
      <div class="account-card-balance__label">Balance:</div>
      <div class="account-card-balance__value">{{ formattedBalance }}</div>
    </div>
  </label>
</template>

<script>
import UiRadio from '~/components/ui/Radio/UiRadio'
import { currencyFormatter } from '~/helpers/formatters'

export default {
  name: 'AccountCard',

  components: {
    UiRadio
  },

  props: {
    data: {
      type: Object,
      default () {
        return {}
      }
    },
    selected: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    formattedBalance () {
      return currencyFormatter(this.data.balance, this.data.currency)
    },
    classList () {
      return {
        selected: this.selected
      }
    }
  },

  methods: {
    select () {
      this.$emit('select', this.data)
    }
  }
}
</script>

<style lang="scss">
.account-card {
  display: grid;
  cursor: pointer;
  background: var(--dark);
  border-radius: var(--border-radius);
  padding: var(--inner-padding);
  grid-template-areas: 'radio name'
    'balance balance';
  grid-template-columns: auto 1fr;
  grid-gap: 12px;

  &__radio {
    grid-area: radio;
  }

  &__name {
    grid-area: name;
    font-size: 25px;
    font-weight: 700;
  }

  &__balance {
    font-size: 18px;
    grid-area: balance;
  }

  &.selected {
    box-shadow: 0 0 1px white;
  }
}

.account-card-balance {
  display: flex;
  justify-content: space-between;
}
</style>
