<template>
  <div class="account-list">
    <template v-if="loading === 0">
      <AccountCard
        v-for="account in accountList"
        :key="account.id"
        :selected="checkSelectedById(account.id)"
        class="account-list__item"
        :data="account"
        @select="selectAccount"
      />
    </template>
    <template v-else>
      <UiSkeleton
        v-for="n in 3"
        :key="n"
        class="account-list__item"
        theme="dark"
        height="94px"
      />
    </template>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import AccountCard from './AccountCard'
import UiSkeleton from '~/components/ui/Skeleton/UiSkeleton'
import { getAvailableAccountsForDeposit } from '~/services/api/mockRequests'

export default {
  name: 'AccountList',

  components: {
    AccountCard,
    UiSkeleton
  },

  data () {
    return {
      accountList: [],
      loading: 1
    }
  },

  computed: {
    ...mapState({
      selectedAccount: state => state.deposit.account.selected
    })
  },

  mounted () {
    this.fetchAvailableAccounts()
  },

  methods: {
    ...mapActions({
      selectAccount: 'deposit/account/select'
    }),
    checkSelectedById (id) {
      return this.selectedAccount ? this.selectedAccount.id === id : false
    },
    async fetchAvailableAccounts () {
      const availableAccounts = await getAvailableAccountsForDeposit()

      this.accountList = availableAccounts
      this.loading = 0
    }
  }
}
</script>

<style lang="scss">
.account-list {
  &__item {
    &:not(:first-child) {
      margin-top: var(--m-margin);
    }
  }
}
</style>
