import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex, { ActionTree, Store, GetterTree } from 'vuex'

import SeeLocationModal from '../../../../src/components/modals/SeeLocationModal.vue'
import OfficesModule from '../../../../src/store/modules/offices'
import { OfficeState } from '../../../../src/store/modules/offices.types'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('SeeLocationModal.vue', () => {
  let actions: ActionTree<OfficeState, {}>
  let state: OfficeState
  let store: Store<{}>

  beforeEach(() => {
    state = {
      offices: [
        {
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
      ]
    }

    actions = {
      fetchLocationMapUrl: jest.fn(),
      fetchWeather: jest.fn()
    }

    store = new Vuex.Store({
      modules: {
        OfficesModule: {
          state,
          actions,
          getters: OfficesModule.getters
        }
      }
    })
  })

  it.skip('executed the actions on startup', () => {
    const wrapper = shallowMount(SeeLocationModal, {
      store,
      localVue,
      propsData: { city: 'Amsterdam' }
    })
    expect(actions.fetchLocationMapUrl).toHaveBeenCalled()
    expect(actions.fetchWeather).toHaveBeenCalled()
  })

  it.skip('gets the office based on the props', () => {
    const wrapper = shallowMount(SeeLocationModal, {
      store,
      localVue,
      propsData: {
        city: 'Amsterdam'
      }
    })

    // expect(getters.getOfficeByCity).toBeCalledWith('Amsterdam')
  })
})
