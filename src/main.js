import { createApp } from 'vue';
import App from './App.vue';
// import global_ from './global.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import axios from 'axios';
import * as d3 from 'd3';

window.d3=d3;

const app = createApp(App);
// use axios
// axios.defaults.baseURL = 'localhost:8888/'; // 请求的默认域名
app.config.globalProperties.$axios = axios;

app.use(store)
    .use(router)
    .use(ElementUI,{size:'small',zIndex:3000})
    .mount('#app');
