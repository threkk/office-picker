import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import OfficeModule from './modules/offices'

Vue.use(Vuex)

const store: StoreOptions<{}> = {
  modules: {
    offices: OfficeModule
  }
}

export default new Vuex.Store(store)
