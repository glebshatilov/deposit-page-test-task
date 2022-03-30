<template>
  <div class="payment-currency">
    <h1>Choose currency of your payment</h1>
    <UiSelect v-model="localPaymentCurrency" label="Payment currency" :items="availableCurrencies" />
    <UiButton class="payment-currency__button" :disabled="!canGoToNextStep" @click="submit">
      Continue
    </UiButton>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import UiButton from '~/components/ui/Button/UiButton'
import UiSelect from '~/components/ui/Select/UiSelect'

export default {
  name: 'PaymentCurrency',

  components: {
    UiButton,
    UiSelect
  },

  data () {
    return {
      localPaymentCurrency: '',
      availableCurrencies: [
        {
          id: 1,
          text: 'USD',
          value: 'USD',
          subtext: 'United States Dollar'
        },
        {
          id: 2,
          text: 'AED',
          value: 'AED',
          subtext: 'United Arab Emirates Dirham'
        }
      ]
    }
  },

  computed: {
    ...mapState({
      paymentCurrency: state => state.deposit.payment.currency
    }),
    canGoToNextStep () {
      return Boolean(this.paymentCurrency)
    }
  },

  watch: {
    localPaymentCurrency (value) {
      this.updateCurrency(value)
    }
  },

  methods: {
    ...mapActions({
      updateCurrency: 'deposit/payment/updateCurrency'
    }),
    submit () {
      this.$emit('go-to-next-step')
    }
  }
}
</script>

<style lang="scss">
.payment-currency {
  &__button {
    margin-top: var(--l-margin);
  }
}
</style>
