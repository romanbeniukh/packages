import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Notifications from '@kyvg/vue3-notification'
import { loadFonts } from './plugins/webfontloader'

loadFonts()

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .use(Notifications)
  .mount('#app')
