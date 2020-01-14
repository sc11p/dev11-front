import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './plugins/axios'
import vuetify from './plugins/vuetify'
import VueCookie from 'vue-cookie';

require('./assets/stylesheets/toastr.css');
require('./assets/stylesheets/vuetify.sass');

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.use(VueCookie);

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app');
