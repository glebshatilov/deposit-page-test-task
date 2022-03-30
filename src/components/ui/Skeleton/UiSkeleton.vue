<script>
/**
 * Skeleton Loader
 */
export default {
  name: 'UiSkeleton',

  functional: true,

  props: {
    /**
     * Ширина
     */
    width: {
      type: String,
      default: undefined
    },
    /**
     * Высота
     */
    height: {
      type: String,
      default: undefined
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
     * Включение анимации
     */
    animated: {
      type: Boolean,
      default: true
    }
  },

  render (createElement, context) {
    return createElement(
      'div',
      {
        ...context.data,
        class: [
          'ui-skeleton',
          `ui-skeleton--${context.props.theme}`,
          {
            'ui-skeleton--animated': context.props.animated
          },
          context.data.staticClass,
          context.data.class
        ],
        style: [
          {
            width: context.props.width,
            height: context.props.height
          },
          context.data.staticStyle,
          context.data.style
        ]
      }
    )
  }
}
</script>

<style lang="scss">

.ui-skeleton {
  height: 21px;
  background-color: var(--gray-87-color);
  border-radius: var(--border-radius);
  -webkit-mask-image:
    linear-gradient(
        to right,
        transparent 0%,
        black 25%,
        black 75%,
        transparent 100%
    );
  mask-image:
    linear-gradient(
        to right,
        transparent 0%,
        black 25%,
        black 75%,
        transparent 100%
    );
  -webkit-mask-size: 200% 100%;
  mask-size: 200% 100%;
  -webkit-mask-repeat: repeat;
  mask-repeat: repeat;
  -webkit-mask-position: 50% top;
  mask-position: 50% top;

  &--animated {
    animation-name: wave;
    animation-duration: 1.5s;
    animation-iteration-count: infinite;
  }

  &--dark {
    background-color: rgba(0, 0, 0, 0.3);
  }

  @keyframes wave {
    0% {
      -webkit-mask-position: 50% top;
      mask-position: 50% top;
    }

    100% {
      -webkit-mask-position: -150% top;
      mask-position: -150% top;
    }
  }
}
</style>
