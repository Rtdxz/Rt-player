import Vue from 'vue';
import ele, { Message } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router';
import store from './store';
import 'COMMON/static/flexible';
import 'ASSETS/css/normalize.css';

Vue.config.productionTip = false;
Vue.use(ele);

Vue.prototype.$message = Message;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
