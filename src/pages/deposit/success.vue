<template>
  <div class="deposit-success-page">
    <h1>Success</h1>

    <UiButton class="deposit-success-page__button" tag="a" href="/">
      GO TO MAIN PAGE
    </UiButton>
  </div>
</template>

<script>
import UiButton from '~/components/ui/Button/UiButton'

export default {
  name: 'DepositSuccessPage',

  components: {
    UiButton
  }
}
</script>

<style lang="scss">
.deposit-success-page {
  &__button {
    margin-top: var(--l-margin);
  }
}
</style>
