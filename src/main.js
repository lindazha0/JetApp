import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';


const app = createApp(App);
app.config.globalProperties.birthName = '小面包';
app.config.globalProperties.birthLottery = false;
app.use(store).use(router).use(ElementUI).mount('#app');
