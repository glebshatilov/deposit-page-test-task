<template>
  <portal v-if="isPortalRendered" to="modals">
    <transition name="fade" appear>
      <div v-if="isOpen" class="ui-modal-backdrop" />
    </transition>
    <transition
      :name="computedTransition"
      appear
      @before-enter="onBeforeEnter"
      @after-leave="onAfterLeave"
    >
      <div
        v-if="isOpen"
        ref="modal"
        class="ui-modal"
        :class="classes"
        @mousedown="onClickOutside"
      >
        <!-- @slot Контент -->
        <slot />
      </div>
    </transition>
  </portal>
</template>

<script>
import { lockBodyScroll, unlockBodyScroll } from '~/helpers/scroll'
/**
 * Модальное окно
 * @example <TpModal :is-open="isOpen" @close="isOpen = false">Контент</TpModal>
 */
export default {
  model: {
    prop: 'is-open',
    event: 'close'
  },

  props: {
    /**
     * Отобразить модалку
     */
    isOpen: {
      type: Boolean,
      default: false
    },
    /**
     * Анимация slide-up на мобиле
     */
    slideOnMobile: {
      type: Boolean,
      default: true
    },
    /**
     * Закрытие модалки по клику на фон
     */
    clickOutsideClose: {
      type: Boolean,
      default: true
    },
    /**
     * Закрытие модалки по на Escape
     */
    clickEscapeClose: {
      type: Boolean,
      default: true
    },
    /**
     * Название Vue transition
     */
    transition: {
      type: String,
      default: 'slide'
    },
    /**
     * Класс для элемента модального окна
     */
    modalClass: {
      type: String,
      default: ''
    },
    /**
     * Позиция модального окна на мобиле
     * @values bottom, center
     */
    placementMobile: {
      type: String,
      default: 'bottom',
      validator: value => ['bottom', 'center'].includes(value)
    },
    /**
     * Полное заполнение экрана контентом на мобиле
     */
    fullscreenMobile: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      isPortalRendered: false
    }
  },

  computed: {
    computedTransition () {
      return this.slideOnMobile ? this.transition : 'slide-on-desktop'
    },

    classes () {
      return [
        `ui-modal--mobile-${this.placementMobile}`,
        {
          'ui-modal--fullscreen-mobile': this.fullscreenMobile
        },
        this.modalClass
      ]
    }
  },

  watch: {
    isOpen (val) {
      if (val) {
        this.isPortalRendered = true
      }
    }
  },

  mounted () {
    this.initCloseOnEscape()
  },

  methods: {
    initCloseOnEscape () {
      const escapeHandler = (e) => {
        if (this.clickEscapeClose && e.key === 'Escape' && this.isOpen) {
          this.close()
        }
      }

      document.addEventListener('keydown', escapeHandler)
      this.$once('hook:destroyed', () => {
        document.removeEventListener('keydown', escapeHandler)
      })
    },
    close () {
      /**
       * Закрытие модалки
       */
      this.$emit('close')
    },
    onClickOutside (e) {
      if (!this.clickOutsideClose) {
        return
      }
      // проверяем что пользователь начал и закончил клик на модалке, а не контенте
      if (e.target === this.$refs.modal) {
        e.target.addEventListener('mouseup', () => {
          this.close()
        }, { once: true })
      }
    },
    onBeforeEnter () {
      lockBodyScroll()
    },
    onAfterLeave () {
      this.isPortalRendered = false
      unlockBodyScroll()
    },
    lockBodyScroll,
    unlockBodyScroll
  }
}
</script>

<style lang="scss">
.ui-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  z-index: 100;

  &--mobile-bottom {
    @media (max-width: 767px) {
      align-items: flex-end;

      &:not(.ui-modal--fullscreen-mobile) {
        padding-top: 30px;
      }
    }
  }

  &--mobile-center {
    @media (max-width: 767px) {
      padding: 30px 12px;
      align-items: center;
    }
  }

  @media (min-width: 768px) {
    align-items: center;
  }
}

.ui-modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 100;
}
</style>

<style lang="scss" scoped>

.fade-enter-active,
.fade-leave-active {
  transition: opacity .2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform .3s;

  @media (min-width: 768px) {
    transition: transform .2s, opacity .2s;
  }
}

.slide-enter,
.slide-leave-to {
  transform: translateY(100%);

  @media (min-width: 768px) {
    transform: translateY(-20px);
    opacity: 0;
  }
}

.slide-on-desktop-enter-active,
.slide-on-desktop-leave-active {
  transition: opacity .2s;

  @media (min-width: 768px) {
    transition: transform .2s, opacity .2s;
  }
}

.slide-on-desktop-enter,
.slide-on-desktop-leave-to {
  opacity: 0;

  @media (min-width: 768px) {
    transform: translateY(-20px);
  }
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity .3s ease, transform .3s ease;
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
</style>
