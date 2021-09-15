/* eslint-disable import/order */
/* eslint-disable global-require */
import Vue from 'vue';
import ele, { Message } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router';
import store from './store';
import 'ASSETS/css/normalize.css';
import 'COMMON/static/flexible';
// eslint-disable-next-line import/no-extraneous-dependencies
import VueLazyload from 'vue-lazyload';

Vue.use(VueLazyload, {
  loading: require('@assets/img/loading.gif'), // 加载中图片，一定要有，不然会一直重复加载占位图
  error: require('@assets/img/white.jpeg'), // 加载失败图片
});

Vue.config.productionTip = false;
Vue.use(ele);

Vue.prototype.$message = Message;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
