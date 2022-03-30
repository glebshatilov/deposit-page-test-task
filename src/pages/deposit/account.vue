<template>
  <div class="deposit-account-page">
    <AccountPicker />
  </div>
</template>

<script>
import AccountPicker from '~/components/pages/deposit/account/AccountPicker'

export default {
  name: 'DepositAccountPage',
  components: {
    AccountPicker
  }
}
</script>
