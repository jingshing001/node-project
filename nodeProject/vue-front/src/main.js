import Vue from 'vue'
import ElementUI from 'element-ui';
import axios from './request'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router'
import store from './store'


Vue.use(ElementUI);
Vue.prototype.$axios=axios;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
