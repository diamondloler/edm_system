<template>
  <div id="app" ref="app">
    <fucktop :show="isLogin" item="5" msg="nice brother"></fucktop>
    <router-view></router-view>
  </div>
  
</template>

<script>
import fucktop from "./components/fucktop";
import velocity from "velocity-animate";
export default {
  name: "app",
  data() {
    return {
      mycontent: null,
      asd: "美滋滋",
      isLogin: false
    };
  },
  mounted() {
    var vm = this;
    var app = vm.$refs.app;
    window.onscroll = function() {
      if (
        document.body.scrollTop >=
        Math.max(
          document.body.scrollHeight - document.body.clientHeight,
          document.documentElement.scrollHeight -
            document.documentElement.clientHeight
        )
      ) {
        vm.$notify({
          duration: 2000,
          title: "温馨提示",
          message: "点击返回头部",
          position: "bottom-right",
          onClick: function() {
            velocity(app, "scroll", {
              duration: 600,
              easing: "ease-in-out"
            });
          }
        });
      }
    };
  },
  components: {
    fucktop
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
