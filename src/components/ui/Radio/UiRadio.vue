<template>
  <label class="ui-radio" :class="classList">
    <input
      class="ui-radio__field"
      type="radio"
      :name="name"
      :value="newValue || value"
      :checked="isChecked"
      @change="changeListener"
    >
    <span class="ui-radio__icon">
      <span class="ui-radio__round" />
    </span>
    <span v-if="$slots.default" class="ui-radio__text">
      <slot />
    </span>
  </label>
</template>

<script>
export default {
  /**
   * Радиокнопка
   * @example <OmsRadio>Опция</OmsRadio>
   * @property {string} name - имя(для связывания группы кнопок)
   * @property {string|number} value - значение для кнопки
   * @property {string|number} newValue - значение для кнопки, если мы используем v-model
   * @property {boolean} checked - выбрана ли кнопка
   * @property {boolean} readonly - состояние недоступности
   */
  name: 'UiRadio',
  props: {
    /**
     *  @type {string}
     *  @default ''
     */
    name: {
      type: String,
      default: ''
    },
    /**
     *  @type {string|number}
     *  @default null
     */
    value: {
      type: [String, Number],
      default: null
    },
    /**
     *  если мы используем v-model, то value передавать через проп new-value, так как они конфликтуют
     *  @type {string|number}
     *  @default null
     */
    newValue: {
      type: [String, Number],
      default: null
    },
    /**
     *  @type {boolean}
     *  @default false
     */
    checked: {
      type: Boolean,
      default: false
    },
    /**
     *  @type {boolean}
     *  @default false
     */
    readonly: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    isChecked () {
      return this.checked || (this.value && this.newValue && String(this.value) === String(this.newValue))
    },
    classList () {
      return {
        'ui-radio--readonly': this.readonly
      }
    }
  },

  methods: {
    changeListener (event) {
      if (event.target.checked) {
        this.$emit('select', event.target.value)
        this.$emit('change', event.target.value)
        this.$emit('input', event.target.value)
      }
    }
  }
}
</script>

<style lang="scss">
.ui-radio {
  display: inline-flex;
  align-items: center;
  margin: 0;
  cursor: pointer;

  &__text {
    margin-left: 8px;
  }

  &__field {
    display: none;

    &:checked ~ .ui-radio__icon .ui-radio__round {
      opacity: 1;
      transition: opacity .2s;
    }

    &:not(:checked):disabled ~ .ui-radio__icon .ui-radio__round {
      opacity: 0 !important;
    }

    label:hover > label.ui-radio &:not(:checked) ~ .ui-radio__icon {
      @media all and (min-width: 960px) {
        .ui-radio__round {
          opacity: 0.3;
        }
      }
    }

    label.ui-radio:hover &:not(:checked) ~ .ui-radio__icon {
      @media all and (min-width: 960px) {
        .ui-radio__round {
          opacity: 0.3;
        }
      }
    }
  }

  &__icon {
    height: 22px;
    width: 22px;
    background-color: transparent;
    border-radius: 50%;
    border: 1px solid var(--white);
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      .ui-radio__round {
        opacity: 0.3;
        transition: opacity .2s;
      }
    }
  }

  &__round {
    width: 12px;
    height: 12px;
    background-color: var(--white);
    transition: opacity .2s;
    opacity: 0;
    border-radius: 50%;
  }
}
</style>
