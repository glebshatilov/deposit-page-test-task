<template>
  <div class="deposit-account-page">
    <h1>Please select your account</h1>
    <AccountList />
  </div>
</template>

<script>
import AccountList from '~/components/pages/deposit/account/AccountList'

export default {
  name: 'DepositAccountPage',
  components: { AccountList }
}
</script>
