import Vue from 'vue';
import { Input } from 'ant-design-vue';

import './assets/main.scss';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.component('aInput', Input);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
