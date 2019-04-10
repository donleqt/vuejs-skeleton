export default function withReload(component) {
  if (global.isServer) {
    return component;
  }
  return {
    data() {
      return {
        toggle: false,
      };
    },
    render(h) {
      return <component key={this.toggle} reload={this.reload}/>;
    },
    watch: {
      $route() {
        this.reload();
      },
    },
    methods: {
      reload() {
        this.toggle = !this.toggle;
      },
    },
  };
}
