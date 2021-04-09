import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

axios.defaults.baseURL = 'https://104.248.0.49'

createApp(App).use(store).use(router, axios).mount('#app')
