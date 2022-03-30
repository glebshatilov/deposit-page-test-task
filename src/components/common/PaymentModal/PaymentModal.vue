<template>
  <div class="payment-modal">
    <h3 class="payment-modal__title">
      Payment in progress
    </h3>
    <div class="payment-modal__text">
      Please check your M-Pesa app
    </div>
    <div class="payment-modal__loader">
      <UiLoader type="long" />
    </div>
  </div>
</template>

<script>
import UiLoader from '~/components/ui/Loader/UiLoader'

export default {
  name: 'PaymentModal',

  components: {
    UiLoader
  }
}
</script>

<style lang="scss">
.payment-modal {
  background: var(--dark);
  padding: var(--l-margin) var(--inner-padding);
  border-radius: var(--border-radius);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 512px;

  &__loader {
    margin-top: var(--l-margin);
  }
}
</style>
