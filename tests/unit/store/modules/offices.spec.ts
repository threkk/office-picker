import OfficeModule from '../../../../src/store/modules/offices'
import { spy } from 'sinon'
import { enableFetchMocks } from 'jest-fetch-mock'
enableFetchMocks()

const office = {
  city: 'Amsterdam',
  description: '',
  imageUrl: '',
  summary: '',
  country: {
    name: 'The Netherlands',
    code: 'NL'
  },
  location: {
    address: 'Simon Carmiggeltstraat 6-50',
    postcode: '1011 DJ',
    phone: '+31 85 888 8138',
    coordinates: {
      lat: 0,
      lon: 0
    },
    mapUrl: ''
  },
  weather: {
    weatherDescription: '',
    weatherIconUrl: '',
    temperature: NaN
  }
}

const mockFetch = (res: unknown) =>
  jest.fn(() => {
    Promise.resolve({
      json: () => Promise.resolve(res)
    })
  })

describe('Mutations', () => {
  describe('addOffices', () => {
    const state = { offices: [] }

    it('adds 1, total 1', () => {
      OfficeModule.mutations!.addOffices(state, [office])
      expect(state.offices.length).toBe(1)
    })

    it('adds 1,total 2', () => {
      OfficeModule.mutations!.addOffices(state, [office])
      expect(state.offices.length).toBe(2)
    })

    it('adds 2, total 4', () => {
      OfficeModule.mutations!.addOffices(state, [office, office])
      expect(state.offices.length).toBe(4)
    })
  })

  describe('setCityInfo', () => {
    const state = { offices: [office] }

    it('not found, no changes', () => {
      OfficeModule.mutations!.setCityInfo(state, { city: 'NotAmsterdam' })
      expect(state.offices[0].imageUrl).toBe('')
      expect(state.offices[0].description).toBe('')
      expect(state.offices[0].summary).toBe('')
    })

    it('found, changes applied', () => {
      OfficeModule.mutations!.setCityInfo(state, {
        city: 'Amsterdam',
        thumbnail: {
          source: 'imageUrl'
        },
        description: 'description',
        extract: 'summary'
      })
      expect(state.offices[0].imageUrl).toBe('imageUrl')
      expect(state.offices[0].description).toBe('description')
      expect(state.offices[0].summary).toBe('summary')
    })
  })

  describe('setLocationMapUrl', () => {
    const state = { offices: [office] }

    it('not found, no changes', () => {
      OfficeModule.mutations!.setLocation(state, { city: 'NotAmsterdam' })
      expect(state.offices[0].location.mapUrl).toBe('')
    })

    it('found, changes applied', () => {
      OfficeModule.mutations!.setLocation(state, {
        city: 'Amsterdam',
        mapUrl: 'mapUrl',
        lat: 1,
        lon: 2
      })
      expect(state.offices[0].location.mapUrl).toBe('mapUrl')
      expect(state.offices[0].location.coordinates.lat).toBe(1)
      expect(state.offices[0].location.coordinates.lon).toBe(2)
    })
  })

  describe('setWeather', () => {
    const state = { offices: [office] }

    it('not found, no changes', () => {
      OfficeModule.mutations!.setWeather(state, { city: 'NotAmsterdam' })
      expect(state.offices[0].weather.temperature).toBe(NaN)
      expect(state.offices[0].weather.weatherIconUrl).toBe('')
      expect(state.offices[0].weather.weatherDescription).toBe('')
    })

    it('found, changes applied', () => {
      OfficeModule.mutations!.setLocation(state, {
        city: 'Amsterdam',
        temperature: 25,
        weatherIconUrl: 'weatherIconUrl',
        weatherDescription: 'weatherDescription'
      })
      expect(state.offices[0].weather.temperature).toBe(NaN)
      expect(state.offices[0].weather.weatherIconUrl).toBe('weatherIconUrl')
      expect(state.offices[0].weather.weatherDescription).toBe(
        'weatherDescription'
      )
    })
  })
})

describe('Actions', () => {
  describe('fetchOffices', () => {
    it('Find one office', () => {
      fetchMock.mockResponse(JSON.stringify([office]))
      const commit = spy()
      const action = OfficeModule.actions!.fetchOffices as Function
      action({ commit })
      expect(commit.called).toBe(true)
    })
  })
})
