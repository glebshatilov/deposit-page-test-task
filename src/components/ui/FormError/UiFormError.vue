<template>
  <div class="ui-form-error">
    <!-- @slot Текст -->
    <slot />
  </div>
</template>

<script>
/**
 * Текст ошибки
 * @example <UiFormError>Текст ошибки</UiFormError>
 */
export default {
  name: 'UiFormError'
}
</script>

<style lang="scss">

.ui-form-error {
  color: var(--red-color);
  padding-left: 20px;
  position: relative;
  text-align: left;
  font-size: 14px;

  &::before {
    content: '';
    width: 7px;
    height: 7px;
    position: absolute;
    left: 5px;
    top: 6px;
    border-radius: 50%;
    background: var(--red-color);
  }
}
</style>
