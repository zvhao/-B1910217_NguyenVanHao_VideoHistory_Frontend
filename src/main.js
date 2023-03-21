import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "@fortawesome/fontawesome-free/css/all.min.css";
import VueSweetalert2 from 'vue-sweetalert2';
import VueCookies from 'vue-cookies'
import './assets/main.css'

import router from "./router";
import $ from 'jquery'
window.jQuery = window.$ = $
const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(VueSweetalert2)
app.use(VueCookies)
window.Swal = app.config.globalProperties.$swal
app.mount("#app");

