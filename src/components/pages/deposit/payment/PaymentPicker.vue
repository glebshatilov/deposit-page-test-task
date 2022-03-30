<template>
  <div class="payment-picker">
    <PaymentMethods v-if="step === 'method'" @go-to-next-step="goToNextStep" />
    <PaymentAmount v-if="step === 'amount'" @go-to-next-step="goToSummary" />
    <PaymentCurrency v-if="step === 'currency'" @go-to-next-step="goToSummary" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import PaymentMethods from './PaymentMethods'
import PaymentAmount from './PaymentAmount'
import PaymentCurrency from './PaymentCurrency'

export default {
  name: 'PaymentPicker',

  components: {
    PaymentMethods,
    PaymentAmount,
    PaymentCurrency
  },

  data () {
    return {
      step: 'method'
    }
  },

  computed: {
    ...mapState({
      selectedMethod: state => state.deposit.payment.selectedMethod
    })
  },

  methods: {
    goToNextStep () {
      if (this.selectedMethod.type === 'BANK_TRANSFER') {
        this.step = 'currency'
      } else {
        this.step = 'amount'
      }
    },
    goToSummary () {
      this.$router.push('/deposit/summary/')
    }
  }
}
</script>

<style lang="scss">
.payment-picker {
}
</style>
