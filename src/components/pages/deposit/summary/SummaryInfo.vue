<template>
  <div class="summary-info">
    <h1>Summary</h1>

    <SummaryInfoTable :list="summaryData.list" />
    <SummaryInfoNotices class="summary-info__notices" :list="summaryData.notices" />

    <UiModal :is-open="isModalOpen" @close="isModalOpen = false">
      <PaymentModal />
    </UiModal>

    <UiButton v-if="selectedPaymentMethodType === 'CARD'" class="summary-info__button" tag="nuxt-link" to="/deposit/success/">
      Pay
    </UiButton>
    <UiButton v-if="selectedPaymentMethodType === 'M_PESA'" class="summary-info__button" @click="goToMPesaPayment">
      Pay via M-Pesa
    </UiButton>
    <UiButton v-if="selectedPaymentMethodType === 'BANK_TRANSFER'" class="summary-info__button">
      Download pdf
    </UiButton>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import SummaryInfoTable from './SummaryInfoTable'
import SummaryInfoNotices from './SummaryInfoNotices'
import UiButton from '~/components/ui/Button/UiButton'
import UiModal from '~/components/ui/Modal/UiModal'
import PaymentModal from '~/components/common/PaymentModal/PaymentModal'

export default {
  name: 'SummaryInfo',

  components: {
    UiButton,
    SummaryInfoTable,
    SummaryInfoNotices,
    UiModal,
    PaymentModal
  },

  data () {
    return {
      isModalOpen: false
    }
  },

  computed: {
    ...mapState({
      selectedPaymentMethodType: state => state.deposit.payment.selectedMethod?.type
    }),
    ...mapGetters({
      summaryData: 'deposit/summaryData'
    })
  },

  methods: {
    goToMPesaPayment () {
      this.isModalOpen = true
    }
  }
}
</script>

<style lang="scss">
.summary-info {
  &__notices {
    margin-top: var(--m-margin);
  }

  &__button {
    margin-top: var(--l-margin);
  }
}
</style>
