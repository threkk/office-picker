import { Module, ActionTree, MutationTree, GetterTree } from 'vuex'
import {
  Office,
  OfficeState,
  Coordinates,
  Weather,
  WikipediaInfo
} from './offices.types'

const headers = {
  'Content-Type': 'application/json',
  accept: 'application/json; charset=utf-8'
}

const mutations: MutationTree<OfficeState> = {
  addOffices(state: OfficeState, offices: Office[]) {
    // TODO: Duplicate control
    offices.forEach(office => state.offices.push(office))
  },

  setCityInfo(state: OfficeState, payload: WikipediaInfo & { city: string }) {
    const office = state.offices.find(office => office.city === payload.city)
    if (office) {
      office.imageUrl = payload.thumbnail?.source ?? null
      office.description = payload.description
      office.summary = payload.extract
    }
  },

  setLocation(
    state: OfficeState,
    payload: Coordinates & { city: string; mapUrl: string }
  ) {
    const office = state.offices.find(office => office.city === payload.city)
    if (office) {
      office.location.coordinates.lat = payload.lat
      office.location.coordinates.lon = payload.lon
      office.location.mapUrl = payload.mapUrl
    }
  },

  setWeather(state: OfficeState, payload: Weather & { city: string }) {
    const office = state.offices.find(office => office.city === payload.city)
    if (office) {
      office.weather.temperature = payload.temperature
      office.weather.weatherDescription = payload.weatherDescription
      office.weather.weatherIconUrl = payload.weatherIconUrl
    }
  }
}

const actions: ActionTree<OfficeState, {}> = {
  async fetchOffices({ commit }) {
    try {
      const res = await fetch('/api/offices', { headers })
      if (res.ok) {
        const items = await res.json()
        const offices = []
        for (const item of items) {
          const office = new Office(
            item.city,
            item.country.name,
            item.country.code
          )
          const location = {
            address: item.address,
            postcode: item.postcode,
            phone: item.telephone ?? null,
            mapUrl: '',
            coordinates: { lon: 0, lat: 0 }
          }

          office.location = location
          offices.push(office)
        }
        commit('addOffices', offices)
      }
    } catch (e) {
      console.error(e)
    }
  },

  async fetchCityInformation({ commit, state }, city: string) {
    try {
      // If the city is loaded, we don't request the information again.
      const office = state.offices.find(office => office.city === city)
      if (
        office?.imageUrl != '' &&
        office?.summary != '' &&
        office?.summary != ''
      )
        return

      const res = await fetch(encodeURI(`/api/info?city=${city}`), { headers })

      if (res.ok) {
        const obj = await res.json()
        commit('setCityInfo', { ...obj, city })
      }
    } catch (e) {
      console.error(e)
    }
  },

  async fetchLocationMapUrl({ commit, state }, city: string) {
    const office = state.offices.find(office => office.city === city)
    if (office) {
      try {
        const res = await fetch(
          encodeURI(
            `/api/info/geo?city=${office.city}&address=${office.location.address}&country=${office.country.name}&postcode=${office.location.postcode}`
          ),
          { headers }
        )
        if (res.ok) {
          const obj = await res.json()
          commit('setLocation', { ...obj, city })
        }
      } catch (e) {
        console.error(e)
      }
    }
  },

  async fetchWeather({ commit, state }, city: string) {
    const office = state.offices.find(office => office.city === city)
    if (office) {
      try {
        const res = await fetch(
          encodeURI(
            `/api/info/weather?city=${city}&code=${office.country.code}`
          ),
          { headers }
        )
        if (res.ok) {
          const weather = await res.json()
          commit('setWeather', { ...weather, city })
        }
      } catch (e) {
        console.error(e)
      }
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
