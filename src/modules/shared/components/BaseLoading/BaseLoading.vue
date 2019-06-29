<template lang="pug">
  .loading-wrapper.base-loading(:class="{'is-loading': loading, 'is-dark': dark}")
    .loading-wrapper__overlay(v-if="overlay")
    .loading-icon
      i
    slot
</template>

<script>
export default {
  name: 'BaseLoading',
  props: {
    loading: false,
    dark: false,
    overlay: false,
  },
};
</script>


<style lang="scss">
  @import "~@/scss/base/base.scss";
  .loading-wrapper {
    padding: 0.1px;
    $this: &;
    $size: 30px;
    $over: 0px;

    min-height: 40px;

    &.is-loading {
      position: relative;
    }

    .loading-icon,
    .loading-wrapper__overlay {
      opacity: 0;
      pointer-events: none;
    }

    &.is-loading {
      .loading-icon,
      .loading-wrapper__overlay {
        opacity: 1;
        pointer-events: initial;
      }
    }

    &__overlay {
      position: absolute;
      z-index: $z-index-loading;
      border-radius: 4px;
      top: 0 + $over;
      right: 0 + $over;
      left: 0 + $over;
      bottom: 0 + $over;
      background-color: rgba(255, 255, 255, 0.4);
      transition: opacity 0.2s ease-in-out;
      cursor: wait;
      @at-root #{$this}.is-dark & {
        background-color: rgba(0, 0, 0, 0.3);
      }
    }

    .loading-icon {
      display: inline-block;
      position: absolute;
      z-index: $z-index-loading + 1;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      //background
      background-color: #000;
      padding: 10px;
      border-radius: 6px;
      box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.4);

      i {
        color: #fff; // light
        display: block;
        border: 3px solid;
        border-top: 3px solid transparent; /* transparent gap */
        border-radius: 50%;
        width: $size;
        height: $size;
        animation: spin 1.2s linear infinite;
      }
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
</style>

