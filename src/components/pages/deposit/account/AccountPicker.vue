<template>
  <div class="account-picker">
    <h1>Please select your account</h1>
    <AccountList />
    <UiButton class="account-picker__button" :disabled="!canGoToNextStep" @click="submit">
      Continue
    </UiButton>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AccountList from '~/components/pages/deposit/account/AccountList'
import UiButton from '~/components/ui/Button/UiButton'

export default {
  name: 'AccountPicker',
  components: {
    AccountList,
    UiButton
  },
  computed: {
    ...mapState({
      selectedAccount: state => state.deposit.account.selected
    }),
    canGoToNextStep () {
      return Boolean(this.selectedAccount)
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
.account-picker {
  &__button {
    margin-top: var(--l-margin);
  }
}
</style>
