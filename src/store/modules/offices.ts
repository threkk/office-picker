import { Module, ActionTree, MutationTree, GetterTree } from 'vuex'
import officesApi from '../../api/offices'
import { getCityInformation, WikipediaInfo } from '../../api/wikipedia'
import { getCoordinates, getMapUrl } from '../../api/geoapify'
import { Office, OfficeState, Coordinates, Weather } from './offices.types'
import { getWeather } from '@/api/weather'

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

  setLocationMapUrl(
    state: OfficeState,
    payload: { city: string; mapUrl: string }
  ) {
    const office = state.offices.find(office => office.city === payload.city)
    if (office) {
      office.location.mapUrl = payload.mapUrl
    }
  },

  setLocationCoordinates(
    state: OfficeState,
    payload: Coordinates & { city: string }
  ) {
    const office = state.offices.find(office => office.city === payload.city)
    if (office) {
      office.location.coordinates.lat = payload.lat
      office.location.coordinates.lon = payload.lon
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
    const res = await officesApi.getOffices()
    const offices = []
    for (const item of res) {
      const office = new Office(item.city, item.country.name, item.country.code)
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

      const res = await getCityInformation(city)

      if (res != null) {
        commit('setCityInfo', { ...res, city })
      }
    } catch (e) {
      console.log(e)
    }
  },

  async fetchLocationMapUrl({ commit, state }, city: string) {
    const office = state.offices.find(office => office.city === city)
    if (office) {
      const coords = await getCoordinates({
        city: office.city,
        address: office.location.address,
        country: office.country.name,
        postcode: office.location?.postcode ?? ''
      })
      if (coords != null) {
        commit('setLocationCoordinates', { ...coords, city })
        const mapUrl = getMapUrl(coords)
        commit('setLocationMapUrl', { city, mapUrl })
      }
    }
  },

  async fetchWeather({ commit, state }, city: string) {
    const office = state.offices.find(office => office.city === city)
    if (office) {
      const weather = await getWeather(city, office.country.code)
      if (weather) {
        commit('setWeather', { ...weather, city })
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
