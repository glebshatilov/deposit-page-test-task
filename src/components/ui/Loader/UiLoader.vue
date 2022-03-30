<template functional>
  <div
    class="ui-loader"
    :class="[
      `ui-loader--${props.color}`,
      `ui-loader--${props.type}`,
      {
        [`ui-loader--overlay-${props.overlayTheme}`]: props.overlay,
        'ui-loader--overlay': props.overlay
      },
      data.staticClass,
      data.class
    ]"
    :style="[
      data.style,
      data.staticStyle
    ]"
    v-bind="data.attrs"
  >
    <div class="ui-loader__wrapper">
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
</template>

<script>
/**
 * Лоадер
 */
export default {
  name: 'UiLoader',

  props: {
    /**
     * Цветовая тема лоадера
     */
    color: {
      type: String,
      validator: val => ['gray', 'white', 'blue', 'gray-blue'].includes(val),
      default: 'blue'
    },

    /**
     * Тип лоадера
     */
    type: {
      type: String,
      validator: val => ['short', 'long'].includes(val),
      default: 'short'
    },

    /**
     * Оверлей
     */
    overlay: Boolean,

    /**
     * Цветовая тема оверлея
     * @values light, dark
     */
    overlayTheme: {
      type: String,
      default: 'light',
      validator: value => ['light', 'dark'].includes(value)
    }
  }
}
</script>

<style lang="scss">
.ui-loader {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  &--short {
    $animationTime: .6s;
    $animationFunction: cubic-bezier(.75, 0, .75, .9);

    position: relative;
    height: 20px;

    & .ui-loader__wrapper {
      height: 10px;
      position: relative;
      width: 60px;

      & div {
        width: 10px;
        height: 10px;
        position: absolute;
        border-radius: 50%;
        left: 6px;

        &:nth-child(1) {
          animation: ui-loader-size $animationTime infinite;
        }

        &:nth-child(2) {
          animation:
            ui-loader-move $animationTime infinite,
            ui-loader-color $animationTime infinite;
        }

        &:nth-child(3) {
          animation:
            ui-loader-move $animationTime infinite,
            ui-loader-color $animationTime $animationFunction infinite reverse;
          left: 26px;
        }

        &:nth-child(4) {
          animation: ui-loader-size $animationTime linear infinite reverse;
          animation-delay: $animationTime;
          left: 45px;
        }
      }
    }
  }

  &--long {
    position: relative;
    height: 20px;
    $animationTime: 1s;
    $elementsAmount: 7;
    $animationDelay: $animationTime / $elementsAmount;

    & .ui-loader__wrapper {
      height: 10px;
      position: relative;
      width: 130px;

      & div {
        width: 10px;
        height: 10px;
        position: absolute;
        border-radius: 50%;
        left: 0;
        background-color: var(--color);

        &:nth-child(1) {
          animation: ui-loader-opacity $animationTime $animationDelay infinite;
        }

        &:nth-child(2) {
          animation: ui-loader-opacity $animationTime $animationDelay * 2 infinite;
          left: 20px;
        }

        &:nth-child(3) {
          animation: ui-loader-opacity $animationTime $animationDelay * 3 infinite;
          left: 40px;
        }

        &:nth-child(4) {
          animation: ui-loader-opacity $animationTime $animationDelay * 4 infinite;
          left: 60px;
        }

        &:nth-child(5) {
          animation: ui-loader-opacity $animationTime $animationDelay * 5 infinite;
          left: 80px;
        }

        &:nth-child(6) {
          animation: ui-loader-opacity $animationTime $animationDelay * 6 infinite;
          left: 100px;
        }

        &:nth-child(7) {
          animation: ui-loader-opacity $animationTime $animationDelay * 7 infinite;
          left: 120px;
        }

        &:nth-child(8) {
          display: none;
        }
      }
    }
  }

  // Цвета
  // переменная "color" используется для типа "long"
  // переменные startColor и endColor используются для лоадера типа "short"
  &--blue {
    --color: var(--primary-color);
    --startColor: var(--white);
    --endColor: var(--primary-color);
  }

  // Оверлей
  &--overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.9);
    height: 100%;
  }

  &--overlay-dark {
    background-color: rgba(0, 0, 0, 0.8);
  }

  // Анимации
  // Чтобы не было мерцаний, сохраняем одинаковый цвет на протяжении всей анимации
  // Используется конечный цвет(центральные точки, насыщенный цвет)
  @keyframes ui-loader-move {
    0% {
      transform: translate3d(0, 0, 0);
      background-color: var(--endColor);
    }

    100% {
      transform: translate3d(19px, 0, 0);
      background-color: var(--endColor);
    }
  }

  @keyframes ui-loader-color {
    0% {
      background-color: var(--startColor);
    }

    100% {
      background-color: var(--endColor);
    }
  }

  // Чтобы не было мерцаний, сохраняем одинаковый цвет на протяжении всей анимации
  // Используется начальный цвет (крайние точки, ненасыщенный цвет)
  @keyframes ui-loader-size {
    0% {
      background-color: var(--startColor);
      transform: scale(0);
    }

    100% {
      background-color: var(--startColor);
      transform: scale(1);
    }
  }

  @keyframes ui-loader-opacity {
    0% {
      opacity: 1;
    }

    100% {
      opacity: .2;
    }
  }
}
</style>
