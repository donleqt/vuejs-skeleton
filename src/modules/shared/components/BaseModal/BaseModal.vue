<template lang="pug" src="./BaseModal.pug"></template>
<script>
import Vue from 'vue';
import lockBodyScroll from './lock-body-scroll';

export default {
  name: 'BaseModal',
  props: {
    title: {
      type: String,
    },
    width: {
      type: String,
    },
    canClose: {
      type: Boolean,
      default: true,
    },
    isShow: {
      type: [Boolean, String],
      default: () => '_',
    },
  },
  data() {
    return {
      isStateLess: this.isShow === '_',
      show: false,
    };
  },
  computed: {
    showModal() {
      let res;
      if (this.isStateLess) {
        res = this.show;
      }
      res = this.isShow;
      if (global.isClient) {
        if (res) {
          lockBodyScroll.lock();
        } else {
          lockBodyScroll.unlock();
        }
      }
      return res;
    },
  },
  methods: {
    open() {
      this.show = true;
      this.$emit('open');
    },
    close() {
      this.show = false;
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss">
  @import "~@/scss/base/_base.scss";

  $animate-time: 0.2s;

  //lock body
  body.body-locked {
    position: fixed;
    left: 0;
    right: 0;
    z-index: 0;
  }

  .modal__mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(47, 44, 42, 0.98);
    perspective: 1000;
    transition: opacity $animate-time ease-in-out,
      transform $animate-time ease-in-out;
    will-change: opacity;
  }

  .modal__wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal__container {
    width: 900px;
    max-width: 100vw;
    margin: 0px auto;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: opacity $animate-time ease-in-out,
      transform $animate-time ease-in-out;
    will-change: transform;
    position: relative;
    -webkit-overflow-scrolling: touch; /* Lets it scroll lazy */
  }

  .modal__close-btn {
    font-size: 2.5rem;
    position: absolute;
    right: 4rem;
    top: 3rem;
    color: inherit;
    cursor: pointer;
    &:hover {
      color: $color-sub;
    }
    @include breakpoint($mobile) {
      right: 2.3rem;
    }
  }

  .modal__default-button {
    float: right;
  }

  // animation
  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal__container,
  .modal-leave-active .modal__container {
    -webkit-transform: scale(1.05);
    transform: scale(1.05);
  }
</style>

