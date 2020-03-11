import Vue from 'vue'
import VueAnalytics from 'vue-analytics'
import App from './App.vue'

import './assets/css/style.css'

Vue.config.productionTip = false

Vue.use(VueAnalytics, {
    id: 'UA-149909276-1'
})

new Vue({
    render: h => h(App),
}).$mount('#app')