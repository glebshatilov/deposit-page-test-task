<template>
  <div class="payment-picker">
    <PaymentMethods v-if="step === 'method'" />
  </div>
</template>

<script>
import PaymentMethods from './PaymentMethods'

export default {
  name: 'PaymentPicker',
  components: {
    PaymentMethods
  },
  data () {
    return {
      step: 'method'
    }
  },

  methods: {
    submit () {
      this.$router.push('/deposit/payment-method/')
    }
  }
}
</script>

<style lang="scss">
.payment-picker {
}
</style>
