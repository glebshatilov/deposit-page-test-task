<template>
  <div class="default-layout">
    <nuxt />

    <portal-target name="modals" multiple />
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout'
}
</script>

<style lang="scss">
.default-layout {
  width: 100%;
  max-width: 768px;
  padding: 40px 24px;
  margin: auto;
}
</style>
