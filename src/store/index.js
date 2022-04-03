import { createStore } from 'vuex'

import packagesModule from '@/store/modules/packages'
import packageModule from '@/store/modules/package'

export default createStore({
  modules: {
    packagesModule,
    packageModule
  }
})
