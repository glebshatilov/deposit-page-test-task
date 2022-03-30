<template>
  <div class="index-page">
    <h1>Index Page</h1>
    <nuxt-link to="/deposit/account/">
      Deposit
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'AccountPicker'
}
</script>

<style lang="scss">
.index-page h1 {
  color: blue;
}
</style>
