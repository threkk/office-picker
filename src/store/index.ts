import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import OfficeModule from './modules/offices'
import ModalModule from './modules/modals'

Vue.use(Vuex)

const store: StoreOptions<{}> = {
  modules: {
    offices: OfficeModule,
    modals: ModalModule
  }
}

export default new Vuex.Store(store)
