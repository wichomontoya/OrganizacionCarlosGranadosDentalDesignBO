// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './vue/router'
import store from './vue/store/index'
import './vue/mixins'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import './vue/resource/index'
import './vue/components'
import i18n from './vue/i18n/index'
import './vue/filters'
import XLSX from 'xlsx';
import VueHighcharts from 'vue-highcharts';
import VueApexCharts from 'vue-apexcharts'
import VuePlotly from '@statnett/vue-plotly'



Vue.use(Vuetify)
Vue.use(VueApexCharts)
Vue.use(VueHighcharts);
Vue.use(VuePlotly);

Vue.component('apexchart', VueApexCharts)
Vue.component('vue-plotly', VuePlotly)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  i18n: i18n,
  components: { App },
  template: '<App/>',
  store: store
})
