<template>
  <component
    :is="tag"
    class="ui-button"
    :class="classes"
    :disabled="disabled"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <span v-if="$slots.default" class="ui-button__content">
      <!-- @slot text -->
      <slot />
      <!-- subtext -->
      <span v-if="subtext" class="ui-button__subtext">{{ subtext }}</span>
    </span>
    <!-- loader -->
    <UiRoller
      v-if="loading"
      class="ui-button__roller"
    />
  </component>
</template>

<script>
import UiRoller from '../Roller/UiRoller'

/**
 * Button component
 * @example <UiButton>Button</UiButton>
 */
export default {
  name: 'UiButton',

  components: {
    UiRoller
  },

  props: {
    /**
     * Вариант внешнего вида
     * @values primary, accent, white, secondary, secondary-overlay, ghost
     */
    variant: {
      type: String,
      default: 'primary',
      validator: value => ['primary', 'accent', 'white', 'secondary', 'secondary-overlay', 'ghost'].includes(value)
    },
    /**
     * Размер
     * @values small, medium
     */
    size: {
      type: String,
      default: 'medium',
      validator: value => ['small', 'medium'].includes(value)
    },
    /**
     * Второстепенный текст
     */
    subtext: {
      type: String,
      default: ''
    },

    /**
     * Состояние ожидания
     */
    loading: {
      type: Boolean,
      default: false
    },

    /**
     * Состояние недоступности
     */
    disabled: {
      type: Boolean,
      default: false
    },

    /**
     * Блочное поведение кнопки (расстягивается на всю ширину)
     */
    block: {
      type: Boolean,
      default: false
    },

    /**
     * HTML тег
     */
    tag: {
      type: String,
      default: 'button'
    }
  },

  computed: {
    classes () {
      return [
        `ui-button--${this.variant}`,
        `ui-button--${this.size}`,
        {
          'ui-button--disabled': this.disabled,
          'ui-button--loading': this.loading,
          'ui-button--block': this.block,
          'ui-button--with-subtext': this.subtext
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.ui-button {
  flex-shrink: 0;
  background-color: transparent;
  font-family: inherit;
  text-decoration: none;
  padding: 0 24px;
  text-align: center;
  height: 50px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: var(--black);
  border-width: 1px;
  border-style: solid;
  transition: .2s;
  border-radius: 3px;
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  text-transform: uppercase;
  white-space: nowrap;
  outline: none;
  user-select: none;
  position: relative;
  cursor: pointer;

  // Элементы
  &__content {
    display: flex;
    align-items: center;
  }

  &__roller {
    position: absolute;
  }

  // Модификаторы оформления
  &--primary {
    background-color: var(--primary-color);
    border-color: var(--primary-color);
    color: var(--white);

    &:hover {
      background-color: var(--primary-hover-color);
      border-color: var(--primary-hover-color);
    }
  }

  &--accent {
    background-color: var(--accent-color);
    border-color: var(--accent-color);
    color: var(--white);

    &:hover {
      background-color: var(--accent-hover-color);
      border-color: var(--accent-hover-color);
    }
  }

  // Размеры и формы
  &--small {
    padding: 0 12px;
    height: 36px;
    font-size: 12px;
    font-weight: 400;
  }

  &--block {
    width: 100%;
    flex-grow: 1;
  }

  &--icon-button {
    width: 50px;
    font-size: 18px;
    padding: 0;

    &.ui-button--small {
      width: 36px;
    }
  }

  &--with-subtext {
    font-size: 12px;
    font-weight: 400;

    .ui-button__content {
      flex-direction: column;
      line-height: 15px;
    }

    .ui-button__subtext {
      opacity: .7;
    }
  }

  // Состояния
  &:active {
    opacity: .8;
  }

  &:disabled,
  &--disabled {
    opacity: .5;
    pointer-events: none;
    cursor: default;
  }

  &--loading {
    pointer-events: none;
    cursor: default;

    .ui-button__content {
      color: transparent;
    }
  }
}
</style>
