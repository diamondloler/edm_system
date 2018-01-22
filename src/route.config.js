import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router);

/**
 * 匹配下一个路由
 */
function match_(str, array) {
  var flag = false;
  array.forEach(function (val) {
    if (new RegExp("^(" + val + ')').test(str)) {
      flag = true;
    }
    // if (str.indexOf(val) > -1) {
    //   str.indexOf(val) == 0 && (flag = true);
    // }
  })
  return flag;
}

const VueRouter = new Router({
  mode: 'hash',
  routes: [{
      path: "/",
      component: resolve => {
        require(['./page/home.vue'], resolve)
      },
      name: 'home'
    },
    {
      path: "/send/:module",
      component: resolve => {
        require(['./page/send.vue'], resolve)
      },
      name: 'send'
    }
  ],
  scrollBehavior(from, to, savePosition) {

    //所有路由跳轉 scroll回頂部
    return {
      x: 0,
      y: 0
    };
  }
})


export default VueRouter
