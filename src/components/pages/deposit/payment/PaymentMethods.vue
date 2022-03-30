<template>
  <div class="account-picker">
    <h1>Choose your payment method</h1>
    <PaymentMethodsList />
    <UiButton class="account-picker__button" :disabled="!canGoToNextStep" @click="submit">
      Continue
    </UiButton>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import PaymentMethodsList from './PaymentMethodsList'
import UiButton from '~/components/ui/Button/UiButton'

export default {
  name: 'PaymentMethods',
  components: {
    PaymentMethodsList,
    UiButton
  },
  computed: {
    ...mapState({
      selectedMethod: state => state.deposit.payment.selectedMethod,
      validPhone: state => state.deposit.payment.validPhone
    }),
    canGoToNextStep () {
      return this.checkValidity()
    }
  },
  methods: {
    checkValidity () {
      if (this.selectedMethod) {
        if (this.selectedMethod.type === 'M_PESA') {
          return Boolean(this.validPhone)
        }

        return true
      }

      return false
    },
    submit () {
      this.$emit('go-to-next-step')
    }
  }
}
</script>

<style lang="scss">
.account-picker {
  &__button {
    margin-top: var(--l-margin);
  }
}
</style>
