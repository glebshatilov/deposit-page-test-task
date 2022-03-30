<template>
  <label class="payment-methods-card" :class="classList">
    <UiRadio name="account" :value="data.id" :checked="selected" class="payment-methods-card__radio" @change="select" />
    <div class="payment-methods-card__logo">
      <img :src="require(`~/assets/images/paymentMethodsLogos/${data.logoUrl}`)">
    </div>
    <div class="payment-methods-card__name">{{ data.name }}</div>
    <div class="payment-methods-card__content">
      <PaymentMethodsCardPhoneInput v-if="showPhoneInput" :disabled="!selected" />
    </div>
  </label>
</template>

<script>
import PaymentMethodsCardPhoneInput from './PaymentMethodsCardPhoneInput'
import UiRadio from '~/components/ui/Radio/UiRadio'
import { currencyFormatter } from '~/helpers/formatters'

export default {
  name: 'PaymentMethodsCard',

  components: {
    UiRadio,
    PaymentMethodsCardPhoneInput
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
    },
    showPhoneInput () {
      return ['M_PESA'].includes(this.data.type)
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
.payment-methods-card {
  display: grid;
  cursor: pointer;
  background: var(--dark);
  border-radius: var(--border-radius);
  padding: var(--inner-padding);
  grid-template-areas: 'radio logo name' 'content content content';
  grid-template-columns: auto 100px 1fr;
  grid-template-rows: auto 75px;
  grid-gap: 12px;

  &__radio {
    grid-area: radio;
  }

  &__name {
    grid-area: name;
    font-size: 22px;
    font-weight: 700;
    align-self: center;
  }

  &__logo {
    grid-area: logo;
    height: 50px;
    display: flex;
    justify-content: center;

    img {
      height: 100%;
      display: block;
      max-width: 100%;
    }
  }

  &__content {
    grid-area: content;
  }

  &.selected {
    box-shadow: 0 0 1px white;
    cursor: default;
  }
}

.payment-methods-card-balance {
  display: flex;
  justify-content: space-between;
}
</style>
