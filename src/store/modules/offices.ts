import { Module, ActionTree, MutationTree } from 'vuex'
import officesApi from '../../api/offices'
import { Office, OfficeState } from './offices.types'

const mutations: MutationTree<OfficeState> = {
  officesLoaded(state: OfficeState, offices: Office[]) {
    offices.forEach(office => state.offices.push(office))
  }
}

const actions: ActionTree<OfficeState, {}> = {
  fetchOffices: async ({ commit }) => {
    const res = await officesApi.getOffices()
    const offices = []
    for (const item of res) {
      const office = new Office(item.city, item.country.name, item.country.code)
      const location = {
        address: item.address,
        postcode: item.postcode,
        phone: item.telephone ?? null
      }

      office.location = location

      offices.push(office)
    }

    commit('officesLoaded', offices)
  }
}

const module: Module<OfficeState, {}> = {
  namespaced: true,
  state: {
    offices: []
  },
  actions,
  mutations
}

export default module
