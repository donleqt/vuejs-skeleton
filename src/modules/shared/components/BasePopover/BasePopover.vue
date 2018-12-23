<template lang="pug" src="./BasePopover.pug"></template>
<script>
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

export default {
  name: 'BasePopover',
  props: {
  },
  mounted() {
    const trigger = this.$refs.trigger;
    const contentEl = this.$refs.content;
    this.tippyReference = tippy(trigger, {
      theme: 'light',
      allowHTML: true,
      content: contentEl.outerHTML,
      arrow: true,
      arrowType: 'sharp',
      size: 'large',
      animation: 'shift-away',
      placement: 'right',
      showOnInit: false,
      interactive: true,
      distance: 30,
    });
  },
  beforeDestroy() {
    delete this.tippyReference;
  },
};
</script>
<style lang="scss">
  @import "../../scss/base/_base.scss";

  .popover {
    cursor: pointer;
    > .popover__content {
      display: none;
    }
  }

  .tippy-popper {
    .light-theme {
      @extend %drop-shadow;
      text-align: left;
      background-color: #fff;
      color: $color-main;
      padding: 30px 30px;
      font-family: inherit;
      max-width: 320px;
      border-radius: 0;
    }
    p.popover-title {
      margin-bottom: 10px;
      font-weight: bold;
      font-size: 2.6rem;
    }

    p:not(.popover-title) {
      font-size: 1.6rem;
      line-height: 2.7rem;
      font-weight: normal;
    }

    a {
      font-size: 1.8rem;
      font-weight: 600;
    }
  }
  .tippy-popper[x-placement^="right"] .tippy-arrow {
    border-right: 16px solid #fff;
    border-width: 16px;
    margin-top: -5px;
    left: -15px;
  }
</style>

