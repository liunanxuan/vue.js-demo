// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import layout from './components/layout'
import VueResource from 'vue-resource'
import store from './store'
Vue.config.productionTip = false
Vue.use(VueResource)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  VueResource,
   store,
  components: { layout },
  template: '<layout/>'
})
