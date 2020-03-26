<script>
export default {
  name: 'BodyClass',
  props: ['className'],
  data() {
    return {
      attachedClass: null,
    };
  },
  render(h) {
    return null;
  },
  mounted() {
    this.attachClass();
  },
  beforeDestroy() {
    this.removeClass();
  },
  watch: {
    className(newVal, oldVal) { // watch it
      this.attachClass();
    },
  },
  methods: {
    removeClass() {
      if (this.attachedClass) {
        this.attachedClass.split(' ').filter(e => e).forEach((e) => {
          document.body.classList.remove(e);
        });
      }
    },
    attachClass() {
      this.removeClass();
      if (typeof this.className === 'string') {
        this.attachedClass = this.className;
        this.attachedClass.split(' ').filter(e => e).forEach(e => e && document.body.classList.add(e));
      }
    },
  },
};
</script>
