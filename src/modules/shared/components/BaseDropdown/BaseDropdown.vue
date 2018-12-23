<template lang="pug">
a.base-dropdown(href="javascript:void(0)",
v-click-outside="close", :class="stateClass")
  .dropdown__trigger(@click="toggle")
    slot(name="append")
    span {{name}}
    base-svg.arrow(:src="$icons.angleUp")
  .dropdown__content(ref="content", :style="contentStyle")
    slot
</template>

<script>
export default {
  name: 'BaseDropdown',
  props: {
    name: String,
  },
  data() {
    return {
      isOpen: false,
      contentStyle: {
        right: 'initial',
        left: 0,
      },
    };
  },
  computed: {
    stateClass() {
      return {
        active: !!this.isOpen,
      };
    },
  },
  watch: {
    isOpen(value) {
      if (value === true) {
        this.$nextTick(this.fixPosition);
      }
    },
  },
  methods: {
    onChange(event) {
      this.$emit('input', event);
    },
    open() {
      this.isOpen = true;
    },
    close(event) {
      this.isOpen = false;
    },
    toggle(event) {
      this.isOpen = !this.isOpen;
    },
    fixPosition() {
      const { content } = this.$refs;
      const { right } = content.getBoundingClientRect();
      if ((right - document.body.clientWidth) >= -20) {
        this.contentStyle.left = 'initial';
        this.contentStyle.right = 0;
      } else {
        this.contentStyle.left = 0;
        this.contentStyle.right = 'initial';
      }
    },
  },
};
</script>

<style lang="scss">
  @import "../../scss/base/_base.scss";

  .base-dropdown,
  .like-dropdown {
    position: relative;
    display: inline-flex;
    align-items: center;

    .arrow {
      vertical-align: baseline;
      margin-left: 10px;
      svg {
        width: 10px;
        path {
          fill: $color-sub;
        }
      }
    }
    &.active .arrow svg {
      transform: rotate(180deg);
    }

    &.active {
      .dropdown__content {
        display: block;
      }
    }

    .dropdown__content {
      display: none;
      position: absolute;
      background-color: #fff;
      z-index: 1000;
      top: calc(100% - 2px);
      left: 0;
      min-width: 100px;
      color: $color-main;
      @extend %drop-shadow;
      .option {
        display: block;
        padding: 10px;
        &:hover {
          background-color: $color-sub;
          color: $color-main;
        }
      }
    }
  }

  // global style
  .dropdown-arrow {
    vertical-align: baseline;
    margin-left: 10px;
    svg {
      width: 10px;
      path {
        fill: $color-sub;
      }
    }
  }

  .dropdown-arrow.active svg {
    transform: rotate(180deg);
  }
</style>
