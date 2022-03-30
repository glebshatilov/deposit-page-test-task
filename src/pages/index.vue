<template>
  <div class="index-page">
    <h1>Index Page</h1>

    <UiButton class="index-page__button" tag="nuxt-link" to="/deposit/account/">
      Deposit
    </UiButton>
  </div>
</template>

<script>
import UiButton from '~/components/ui/Button/UiButton'

export default {
  name: 'IndexPage',

  components: {
    UiButton
  }
}
</script>

<style lang="scss">
.index-page {
  &__button {
    margin-top: var(--l-margin);
  }
}
</style>
