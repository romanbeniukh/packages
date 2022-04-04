import { createStore } from 'vuex'
import { syncUrlWithVuex } from '@/store/plugins/syncUrlWithVuex'
import router from '@/router'

import packagesModule from '@/store/modules/packages'
import packageModule from '@/store/modules/package'

const store = createStore({
  modules: {
    packagesModule,
    packageModule
  },
  plugins: [
    syncUrlWithVuex(router, [
      {
        module: 'packagesModule',
        name: 'query',
        as: 'q',
        mutation: 'SET_QUERY',
        defaultValue: ''
      }
    ])
  ]
})

export default store
