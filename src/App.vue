<template>
  <div id="app" v-cloak>
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true,
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
  },
};
</script>

<style>
#app {
  box-sizing: border-box;
}
[v-cloak] {
  display: none !important;
}
html,
body {
  font-size: 14px;
  background: #f2f2f2;
}

body {
  min-height: 100%;
}

/*重置*/
* {
  margin: 0;
  padding: 0;
}

ul li,
ol li {
  list-style: none;
}

a {
  text-decoration: none;
}

.fl {
  float: left;
}

.fr {
  float: right;
}

.cl:after {
  content: "";
  height: 0;
  display: block;
  overflow: hidden;
  clear: both;
}
input {
  border: none;
  outline: none;
}
img {
  display: block;
  width: 100%;
}
</style>

