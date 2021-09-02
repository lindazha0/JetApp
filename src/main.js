import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import axios from 'axios'



const app = createApp(App);
// use axios
// axios.defaults.baseURL = 'localhost:8888/'; // 请求的默认域名
app.config.globalProperties.$axios = axios;

app.config.globalProperties.birthName = '老面包';
app.config.globalProperties.birthLottery = false;
app.use(store).use(router).use(ElementUI).mount('#app');
