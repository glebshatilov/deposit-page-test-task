<template>
  <div class="deposit-summary-page">
    <SummaryInfo />
  </div>
</template>

<script>
import SummaryInfo from '~/components/pages/deposit/summary/SummaryInfo'

export default {
  name: 'DepositSummaryPage',

  components: {
    SummaryInfo
  },

  middleware: 'depositData'
}
</script>
