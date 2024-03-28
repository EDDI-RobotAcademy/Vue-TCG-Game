import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { loadFonts } from "./plugins/webfontloader";

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import * as labsComponents from 'vuetify/labs/components'

import { createVuetify } from "vuetify/lib/framework.mjs";

loadFonts()

const vuetify = createVuetify({
    components: {
        ...components,
        ...labsComponents,
    },
    directives: {
        ...directives,
    }
})

createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app')
