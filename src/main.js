// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// Import F7 Bundle
import Framework7 from 'framework7/dist/framework7.esm.bundle.js'
import Framework7Vue from 'framework7-vue/dist/framework7-vue.esm.bundle.js'
import Routes from './utils/routes'
import * as filters from './utils/filters'

Vue.use(Framework7Vue, Framework7)

Vue.config.productionTip = false

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  framework7: {
    root: '#app',
    routes: Routes,
    statusbar: {
      iosOverlaysWebView: true,
    },
  }
})
