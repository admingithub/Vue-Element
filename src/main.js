import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from "./router/index.js"
import global from './router/global.js'
import config from '../vue.config.js'
import '@/permission.js' // permission control

//加载全局变量
Vue.prototype.$global=global;
Vue.prototype.axios = axios;

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueAxios,axios)

new Vue({
	config,
	router,
  render: h => h(App),
}).$mount('#app')
