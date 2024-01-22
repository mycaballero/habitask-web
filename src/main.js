import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { localYup } from '@/plugins/yup.js'
import './style.css'
import App from './App.vue'
import router from './router/index.js'
import useFetchDefault from './plugins/useFetch.js'
import {useAuthStore} from "@/stores/auth.store.js"
import Vue3EasyDataTable from 'vue3-easy-data-table'
import 'vue3-easy-data-table/dist/style.css'

const app = createApp(App)

app.component('EasyDataTable', Vue3EasyDataTable);
app.use(createPinia())
app.use(router)
app.use(localYup)
app.use(useFetchDefault,{
    authStore: useAuthStore(),
    router: router
})

app.mount('#app')
