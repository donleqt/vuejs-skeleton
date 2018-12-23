<script>
export default {
  name: 'BodyClass',
  props: ['className'],
  data() {
    return {
      attachedClass: [],
    };
  },
  render(h) {
    return null;
  },
  mounted() {
    this.attachClass();
  },
  beforeDestroy() {
    $(document.body).removeClass(this.attachedClass);
  },
  watch: {
    className(newVal, oldVal) { // watch it
      this.attachClass();
    },
  },
  methods: {
    attachClass() {
      const $body = $(document.body);
      $body.removeClass(this.attachedClass);
      this.attachedClass = [];
      if (typeof this.className === 'string') {
        this.attachedClass = [this.className];
      } else {
        Object.entries(this.className).forEach(([key, val]) => {
          if (val) {
            this.attachedClass.push(key);
          }
        });
      }
      $body.addClass(this.attachedClass);
    },
  },
};
</script>
