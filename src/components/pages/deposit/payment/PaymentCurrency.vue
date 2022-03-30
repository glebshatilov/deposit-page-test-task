<template>
  <div class="payment-currency">
    <h1>Enter amount of your payment</h1>
    <UiInput v-model="localPaymentAmount" label="Enter amount" :mask="maskOptions" />
    <UiButton class="payment-currency__button" :disabled="!canGoToNextStep" @click="submit">
      Continue
    </UiButton>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import UiButton from '~/components/ui/Button/UiButton'
import UiInput from '~/components/ui/Input/UiInput'

export default {
  name: 'PaymentCurrency',
  components: {
    UiButton,
    UiInput
  },
  data () {
    return {
      localPaymentAmount: '',
      maskOptions: {
        mask: Number,
        radix: '.',
        thousandsSeparator: ' '
      }
    }
  },
  watch: {
    localPaymentAmount (value) {
      this.updateAmount(value)
    }
  },
  computed: {
    ...mapState({
      paymentAmount: state => state.deposit.payment.amount
    }),
    canGoToNextStep () {
      return Boolean(this.paymentAmount)
    }
  },
  methods: {
    ...mapActions({
      updateAmount: 'deposit/payment/updateAmount'
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
