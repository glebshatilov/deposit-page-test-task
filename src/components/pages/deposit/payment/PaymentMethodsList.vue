<template>
  <div class="payment-methods-list">
    <template v-if="loading === 0">
      <PaymentMethodsCard
        v-for="method in methodList"
        :key="method.id"
        :selected="checkSelectedById(method.id)"
        class="payment-methods-list__item"
        :data="method"
        @select="selectPaymentMethod"
      />
    </template>
    <template v-else>
      Loading...
    </template>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import PaymentMethodsCard from './PaymentMethodsCard'
import { getAvailablePaymentMethodsForDeposit } from '~/services/api/mockRequests'

export default {
  name: 'PaymentMethodsList',

  components: {
    PaymentMethodsCard
  },

  data () {
    return {
      methodList: [],
      loading: 1
    }
  },

  computed: {
    ...mapState({
      selectedMethod: state => state.deposit.payment.selectedMethod
    })
  },

  mounted () {
    this.fetchAvailableAccounts()
  },

  methods: {
    ...mapActions({
      selectPaymentMethod: 'deposit/payment/selectMethod'
    }),
    checkSelectedById (id) {
      return this.selectedMethod ? this.selectedMethod.id === id : false
    },
    async fetchAvailableAccounts () {
      const availablePaymentMethods = await getAvailablePaymentMethodsForDeposit()

      this.methodList = availablePaymentMethods
      this.loading = 0
    }
  }
}
</script>

<style lang="scss">
.payment-methods-list {
  &__item {
    &:not(:first-child) {
      margin-top: var(--m-margin);
    }
  }
}
</style>
