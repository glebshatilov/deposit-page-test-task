<template>
  <div class="ui-input" :class="classes">
    <label v-if="label" class="ui-input__label">{{ label }}</label>
    <input
      ref="input"
      v-imask="maskOptions"
      class="ui-input__input"
      :value="value"
      :type="type"
      :disabled="disabled"
      :placeholder="isFocused && placeholder"
      v-bind="$attrs"
      @blur="onBlur"
      @focus="onFocus"
    >
  </div>
</template>

<script>
/**
 * Инпут
 * @example <UiInput v-model="someValue" label="Введите данные" />
 */
export default {
  inheritAttrs: false,

  props: {
    /**
     * Входной параметр для v-model
     */
    value: {
      type: [String, Number],
      default: ''
    },
    /**
     * Label
     */
    label: {
      type: String,
      default: ''
    },
    /**
     * Цветовая тема
     * @values light, dark
     */
    theme: {
      type: String,
      default: 'light',
      validator: value => ['light', 'dark'].includes(value)
    },
    /**
     * Состояние недоступности
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * Состояние ошибки
     */
    error: {
      type: Boolean,
      default: false
    },
    /**
     * Состояние валидности. К элементу добавляется класс, который используется в UiInputWithButton
     */
    valid: {
      type: Boolean,
      default: false
    },
    /**
     * Убрать border у инпута
     */
    noBorder: {
      type: Boolean,
      default: false
    },
    /**
     * Объект параметров Vue IMask
     */
    mask: {
      type: Object,
      default: () => null
    },
    /**
     * HTML атрибут type
     */
    type: {
      type: String,
      default: 'text'
    },
    /**
     * Устанавливает фокус программно
     */
    forceFocus: Boolean,
    /**
     * Прячет нижний border. Используется в UiSelect
     */
    collapseBottom: Boolean,
    /**
     * placeholder
     */
    placeholder: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      isFocused: false,
      isPhoneValid: false
    }
  },

  computed: {
    classes () {
      return [
        this.theme ? 'ui-input--' + this.theme : '',
        {
          'ui-input--disabled': this.disabled,
          'ui-input--active': this.value || this.value === 0 || this.isFocused,
          'ui-input--focused': this.isFocused,
          'ui-input--valid': (this.valid || this.isPhoneValid) && !this.error,
          'ui-input--has-error': this.error,
          'ui-input--no-border': this.noBorder,
          'ui-input--collapsed-bottom': this.collapseBottom,
          'ui-input--with-icon': this.icon
        }
      ]
    },
    maskOptions () {
      return this.mask ? this.mask : null
    }
  },

  watch: {
    forceFocus (val) {
      this.isFocused = val
    }
  },

  mounted () {
    this.$refs.input.addEventListener('input', (e) => {
      this.$emit('input', e.target.value)
    })
  },

  methods: {
    onFocus () {
      this.isFocused = true
      /**
       * HTML событие focus
       */
      this.$emit('focus')
    },
    onBlur () {
      this.isFocused = false
      /**
       * HTML событие blur
       */
      this.$emit('blur')
    },
    /**
     * Активирует focus
     * @public
     */
    focus () {
      this.$refs.input.focus()
    },
    /**
     * Снимает focus
     * @public
     */
    blur () {
      this.$refs.input.blur()
    },
    /**
     * Выделяет введенный текст
     * @public
     */
    select () {
      this.$refs.input.select()
    }
  }
}
</script>

<style lang="scss">

.ui-input {
  display: flex;
  min-width: 100px;
  height: 50px;
  width: 100%;
  position: relative;

  &__input {
    -webkit-appearance: none;

    /* Chrome, Safari, Edge, Opera */
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Firefox */
    &[type=number] {
      -moz-appearance: textfield;
    }

    /* iOS */
    input[type="search"] {
      -webkit-appearance: none;
    }

    width: 100%;
    padding: 18px 12px 6px;
    background-color: var(--white);
    border: 1px solid var(--gray-73-color);
    border-radius: 3px;
    font-size: 16px;
    line-height: 21px;
    font-weight: 500;
    color: var(--black);
    outline: none;
    transition: border-color .2s, box-shadow .2s;
  }

  &__label {
    max-width: 90%;
    position: absolute;
    top: 6px;
    left: 13px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    pointer-events: none;
    color: var(--gray-53-color);
    font-size: 16px;
    line-height: 36px;
    text-transform: uppercase;
    transition: font-size .2s, line-height .2s;
    display: block;
    width: 100%;
    text-align: left;
  }

  &__icon {
    color: var(--gray-53-color);
    width: 24px;
    height: 24px;
    position: absolute;
    top: 13px;
    right: 12px;
  }

  &--no-border {
    .ui-input__input {
      border-color: var(--white);
    }
  }

  &--with-icon {
    .ui-input__input {
      padding-right: 40px;
    }
  }

  &--dark {

    &:not(.ui-input--active):not(.ui-input--focused) {
      .ui-input__input {
        border-color: hsla(0, 0%, 34%, 0.5);
        background-color: rgba(0, 0, 0, 0.5);
      }

      .ui-input__label {
        color: var(--gray-53-color);
      }
    }
  }

  &--collapsed-bottom {
    .ui-input__input {
      border-radius: 3px 3px 0 0;
      border-bottom: none;
    }
  }

  &--active {
    .ui-input__label {
      font-size: 10px;
      line-height: 13.3px;
    }
  }

  &--focused {
    .ui-input__input {
      border-color: var(--primary-color);
      box-shadow: 0 0 6px rgba(0, 147, 196, 0.5);
    }
  }

  &--disabled {
    opacity: .5;
    pointer-events: none;
  }

  &--has-error {
    .ui-input__input {
      border-color: var(--error-color) !important;
      box-shadow: 0 0 6px rgba(194, 46, 46, 0.5);
    }
  }
}
</style>
