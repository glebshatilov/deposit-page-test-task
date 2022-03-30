<template>
  <div
    class="ui-select"
    :class="classList"
  >
    <UiInput
      class="ui-select__input"
      :value="query"
      :label="label"
      readonly
      :theme="theme"
      :collapse-bottom="hasFocus"
      :force-focus="hasFocus"
      @click.native="hasFocus = !hasFocus; currentItemIndex = -1"
    />
    <ul
      v-if="hasFocus"
      ref="itemsContainer"
      class="ui-select__items"
      :class="{ 'ui-select__items--with-scroll': maxItemsCount }"
      :style="itemsStyles"
    >
      <li
        v-for="(item, index) in items"
        :key="index"
        class="ui-select__item"
        :class="{'ui-select__item--selected': index === currentItemIndex}"
        @click="submit(item)"
      >
        {{ item.text }}
      </li>
    </ul>
    <span class="ui-select__arrow" />
  </div>
</template>

<script>
import UiInput from '../Input/UiInput'

export default {
  name: 'UiSelect',

  components: {
    UiInput
  },
  props: {
    value: {
      type: [Boolean, String, Number],
      default: null
    },
    label: {
      type: String,
      default: ''
    },
    items: {
      type: Array,
      default () {
        return [
          {
            id: -1,
            text: 'Не выбрано',
            value: '',
            subtext: ''
          }
        ]
      }
    },
    defaultFirst: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    default: {
      type: Object,
      default: null
    },
    maxItemsCount: {
      type: [String, Number],
      default: null
    },
    theme: {
      type: String,
      default: 'light'
    }
  },
  data () {
    return {
      query: this.getDefaultQuery(),
      currentItemIndex: -1,
      overrideFocus: false,
      hasFocus: false
    }
  },
  computed: {
    classList () {
      return [
        this.theme ? 'ui-select--' + this.theme : '',
        {
          'ui-select--focus': this.hasFocus,
          'ui-select--disabled': this.disabled,
          'has-value': this.value
        }
      ]
    },
    itemsStyles () {
      const style = {}
      if (this.maxItemsCount) { style.maxHeight = this.maxItemsCount * 32 + 12 + 'px' }
      return style
    }

  },
  watch: {
    default (item) {
      if (item) { this.query = item.text }
    },
    items () { // если у нас изменился список (например, динамическая подгрузка
      if (this.query) {
        // отображаем выбранным текст, сооветсвующий value
        let newQuery = ''
        if (this.value || this.value === 0) {
          const defaultItem = this.items.find(item => item.value === this.value)
          if (defaultItem) { newQuery = defaultItem.text }
        }
        this.query = newQuery
      } else {
        // если query пустой, то пытаемся установить дефолтное значение query
        this.query = this.getDefaultQuery()
      }
    },
    value () {
      if (this.value || this.value === 0) {
        const defaultItem = this.items.find(item => item.value === this.value)
        if (defaultItem) { this.query = defaultItem.text }
      }
    }
  },
  mounted () {
    document.addEventListener('mousedown', this.mousedownListener)
    this.$el.addEventListener('keydown', this.keyControl)
  },
  methods: {
    getDefaultQuery () {
      if (this.default) {
        return this.default.text
      }
      if (this.defaultFirst) {
        return this.items[0].text
      }
      if (this.value || this.value === 0) {
        const defaultItem = this.items.find(item => item.value === this.value)
        if (defaultItem) {
          return defaultItem.text
        }
      }
      return ''
    },
    mousedownListener (event) {
      // при клике вне элемента закрываем Select
      if (!this.$el.contains(event.target)) {
        this.hasFocus = false
      }
    },
    select (item, force = false) {
      this.$emit('select', item)

      if (this.selectOnChange || force) {
        this.query = item.text
      }
    },
    submit (item) {
      this.select(item, true)
      this.$emit('submit', item)
      this.$emit('change', item)
      this.$emit('input', item.value)

      this.currentItemIndex = -1
      this.hasFocus = false
    },
    keyControl (e) {
      if (this.items.length === 0) {
        return
      }
      switch (e.key) {
        case 'ArrowUp':
        case 'Up':
          e.preventDefault()
          this.selectMoveUp()
          break
        case 'ArrowDown':
        case 'Down':
        case 'Tab':
          e.preventDefault()
          this.selectMoveDown()
          break
        case 'Enter':
          this.selectEnter()
          break
        default:
      }
    },
    selectMoveUp () {
      if (this.currentItemIndex === -1) {
        this.currentItemIndex = this.items.length - 1
        this.select(this.items[this.currentItemIndex])
        return
      }

      if (this.currentItemIndex === 0) {
        this.currentItemIndex = -1
        this.unselect()
        return
      }

      this.currentItemIndex -= 1
      this.focused = true
      this.select(this.items[this.currentItemIndex])
    },
    selectMoveDown () {
      if (this.currentItemIndex === this.items.length - 1) {
        this.currentItemIndex = -1
        this.unselect()
        return
      }

      this.currentItemIndex += 1
      this.focused = true
      this.select(this.items[this.currentItemIndex])
    },
    selectEnter () {
      if (this.currentItemIndex >= 0) {
        this.submit(this.items[this.currentItemIndex])
      } else if (this.items[0]) {
        this.submit(this.items[0])
      }
    },
    unselect () {
      this.$emit('select', null)
    }
  }
}
</script>

<style lang="scss">

.ui-select {
  cursor: pointer;
  position: relative;

  .tp-input-new__input {
    cursor: pointer;
  }

  &__arrow {
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 6px solid var(--black);
    display: block;
    position: absolute;
    right: 18px;
    top: 23px;
    // чтобы клик срабатывал на инпуте, а не на стрелке
    pointer-events: none;
  }

  &__items {
    z-index: 1;
    position: absolute;
    width: 100%;
    background-color: var(--white);
    list-style: none;
    border-radius: 0 0 3px 3px;
    padding: 0;
    border: 1px solid var(--primary-color);
    box-shadow: 0 5px 6px rgba(0, 147, 196, 0.2);
    border-top: none;
    margin: 0;

    &::before {
      content: '';
      height: 5px;
      width: 100%;
      position: absolute;
      top: -5px;
      background-color: var(--white);
    }
  }

  &__items--with-scroll {
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 7px;
      background: #E7E7E7;
      border-radius: 5px;
    }

    &::-webkit-scrollbar-track {
      border-radius: 5px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
      width: 7px;
      background-color: #C9C9C9;
    }
  }

  &__item {
    font-size: 16px;
    font-weight: 500;
    padding: 7px 12px;
    cursor: pointer;
    color: var(--black);

    &:hover {
      font-size: 16px;
      font-weight: 400;
      color: #FFF;
      background-color: rgba(0, 147, 196, .75);
    }

    &--selected {
      font-size: 16px;
      font-weight: 400;
      color: #FFF;
      background-color: rgba(0, 147, 196, 1) !important;
    }
  }

  &--focus {
    .ui-select__arrow {
      transform: rotate(180deg);
    }
  }

  &--disabled {
    opacity: .5;
    pointer-events: none;
    user-select: none;
  }

  &--light {
    .tp-input-new__input:read-only {
      color: var(--black);
    }
  }

  &--dark:not(.ui-select--focus):not(.has-value) {
    .ui-select__arrow {
      border-top-color: var(--gray-53-color);
    }
  }
}
</style>
