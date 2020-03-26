<template lang="pug" src="./NotFound.pug"></template>
<script>

export default {
  name: 'NotFound',
  metaInfo() {
    return {
      title: this.code === 404 ? 'Page Not Found' : 'Unexpected Error',
    };
  },
  computed: {
    routeError() {
      const routerError = this.$store.modules.global.state().routerError;
      return routerError;
    },
    errorMessage() {
      return this.routerError && this.routerError.message;
    },
    code() {
      return this.$router.code;
    },
  },
  watch: {
    $route() {
      const router = this.$router;
      if (global.location) {
        global.location.reload();
      }
    },
  },
};
</script>

<style scoped>
  code {
    width: 100%;
    display: block;
    margin: 20px 0;
    padding: 20px;
    text-align: center;
  }
  .btn {
    color: #fff !important;
  }
</style>