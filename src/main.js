// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Router from './route.config'
import {
  Button,
  Row,
  Col,
  Alert,
  Message,
  Notification
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './common/common.css'
import dzInput from './dz/dz-input.vue'
Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(Alert)
Vue.component('dz-input', dzInput)
Vue.prototype.$message = Message
Vue.prototype.$notify = Notification

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: {
    App
  },
  router: Router
})
