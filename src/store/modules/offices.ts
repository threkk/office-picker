import { Module, ActionTree, MutationTree, GetterTree } from 'vuex'
import officesApi from '../../api/offices'
import { getCityInformation, WikipediaInfo } from '../../api/wikipedia'
import { Office, OfficeState } from './offices.types'

const mutations: MutationTree<OfficeState> = {
  addOffices(state: OfficeState, offices: Office[]) {
    // TODO: Duplicate control
    offices.forEach(office => state.offices.push(office))
  },

  setCityInfo(
    state: OfficeState,
    payload: { city: string; info: WikipediaInfo }
  ) {
    const office = state.offices.find(office => office.city === payload.city)
    if (office) {
      if (!office.imageUrl) {
        office.imageUrl = payload.info.thumbnail?.source ?? null
      }
      if (!office.summary) {
        office.summary = payload.info.description
      }
    }
  }
}

const actions: ActionTree<OfficeState, {}> = {
  async fetchOffices({ commit }) {
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

    commit('addOffices', offices)
  },

  async fetchCityInformation({ commit, state }, city: string) {
    try {
      // If the city is loaded, we don't request the information again.
      const office = state.offices.find(office => office.city === city)
      if (office?.imageUrl != null && office?.summary != null) return

      const res = await getCityInformation(city)

      if (res != null) {
        commit('setCityInfo', { city, info: res })
      }
    } catch (e) {
      console.log(e)
    }
  }
}

const getters: GetterTree<OfficeState, {}> = {
  getOfficeByCity: (state: OfficeState) => (city: string) => {
    return state.offices.find(office => office.city === city)
  }
}

const module: Module<OfficeState, {}> = {
  namespaced: true,
  state: {
    offices: []
  },
  actions,
  getters,
  mutations
}

export default module
