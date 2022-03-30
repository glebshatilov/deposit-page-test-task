<template>
  <div class="deposit-payment-page">
    <PaymentPicker />
  </div>
</template>

<script>
import PaymentPicker from '~/components/pages/deposit/payment/PaymentPicker'

export default {
  name: 'DepositPaymentPage',

  components: {
    PaymentPicker
  },

  middleware: 'depositData'
}
</script>
