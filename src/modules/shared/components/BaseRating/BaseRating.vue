<template lang="pug" src="./BaseRating.pug"></template>
<script>

const max = 5;

export default {
  name: 'BaseRating',
  props: {
    value: {
      type: [Number, String],
      validator(value) {
        return value >= 0 && value <= max;
      },
    },
    count: {
      type: Number,
      default: 0,
    },
    votable: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      heartIcon: this.$icons.heart,
      max,
      starArray: new Array(max).fill(1),
      hovering: -1,
    };
  },
  methods: {
    isActive(index) {
      if (this.hovering !== -1 && this.votable) {
        return (index + 1) <= this.hovering;
      }
      return (index + 1) <= this.value;
    },
    onStarClick(value) {
      this.$emit('rate', parseInt(value));
    },
  },
};
</script>
<style lang="scss">
  @import "~@/scss/base/base.scss";
  .base-rating {
    display: inline-flex;
    margin-right: -5px;
    margin-left: -5px;
    align-items: center;
    &:not(.votable) {
      a.rating-star {
        cursor: initial;
      }
    }

    .rating-count {
      margin-left: 5px;
      align-self: center;
    }

    .rating-star {
      padding: 5px;
      polygon {
        transition: all 0.5s;
      }
      svg {
        height: 2.5rem;
        polygon {
          fill: #d8d8d8;
        }
      }
      &:hover,
      &.active {
        svg {
          polygon {
            fill: #ffd055 !important;
          }
        }
      }
    }
  }
</style>
