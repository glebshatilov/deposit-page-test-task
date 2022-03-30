<template functional>
  <div class="ui-roller"
       :class="[
         `ui-roller--${props.color}`,
         data.staticClass,
         data.class,
       ]"
       :style="[
         data.style,
         data.staticStyle,
         {
           '--size': props.size,
           '--scale' : props.size.slice(0, -2) / 64
         }
       ]"
       v-bind="data.attrs">
    <div class="ui-roller__wrapper">
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
 * Роллер
 */
export default {
  name: 'TpRoller',

  props: {
    /**
     * Цветовая тема роллера
     */
    color: {
      type: String,
      validator: val => ['current', 'white', 'blue'].includes(val),
      default: 'current'
    },

    /**
     * Размер  сторон контейнера
     */
    size: {
      type: String,
      default: '25.6px'
    }
  }
}
</script>

<style lang="scss">
.ui-roller {
  width: var(--size);
  height: var(--size);

  $animationDelay: -.036s;
  $animationTime: 1.2s;
  $animationFunction: cubic-bezier(.5, 0, .5, 1);

  &__wrapper {
    width: 64px;
    height: 64px;
    transform: scale(var(--scale));
    transform-origin: left top;

    div {
      animation: ui-roller-rotate $animationTime $animationFunction  infinite;
      transform-origin: 32px 32px;

      &::after {
        content: " ";
        display: block;
        position: absolute;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: var(--color);
        margin: -3px 0 0 -3px;
      }

      &:nth-child(1) {
        animation-delay: $animationDelay;
      }

      &:nth-child(1)::after {
        top: 50px;
        left: 50px;
      }

      &:nth-child(2) {
        animation-delay: $animationDelay * 2;
      }

      &:nth-child(2)::after {
        top: 54px;
        left: 45px;
      }

      &:nth-child(3) {
        animation-delay: $animationDelay * 3;
      }

      &:nth-child(3)::after {
        top: 57px;
        left: 39px;
      }

      &:nth-child(4) {
        animation-delay: $animationDelay * 4;
      }

      &:nth-child(4)::after {
        top: 58px;
        left: 32px;
      }

      &:nth-child(5) {
        animation-delay: $animationDelay * 5;
      }

      &:nth-child(5)::after {
        top: 57px;
        left: 25px;
      }

      &:nth-child(6) {
        animation-delay: $animationDelay * 6;
      }

      &:nth-child(6)::after {
        top: 54px;
        left: 19px;
      }

      &:nth-child(7) {
        animation-delay: $animationDelay * 7;
      }

      &:nth-child(7)::after {
        top: 50px;
        left: 14px;
      }

      &:nth-child(8) {
        animation-delay: $animationDelay * 8;
      }

      &:nth-child(8)::after {
        top: 45px;
        left: 10px;
      }
    }
  }

  // Цвета
  &--current {
    --color: currentColor;
  }

  &--blue {
    --color: #{var(--primary-color)};
  }

  &--white {
    --color: #{var(--white)};
  }

  @keyframes ui-roller-rotate {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
