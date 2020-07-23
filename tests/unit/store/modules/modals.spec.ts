import ModalModule from '../../../../src/store/modules/modals'
import { ModalState } from '../../../../src/store/modules/modals.types'
import { spy } from 'sinon'

const originalState: ModalState = {
  city: '',
  type: 'DETAILS',
  visible: false,
  size: 'MEDIUM'
}

describe('ModalStore', () => {
  describe('Mutations', () => {
    describe('setCity', () => {
      it('sets field', () => {
        const state = { ...originalState }
        ModalModule.mutations!.setCity(state, 'Amsterdam')
        expect(state).toEqual({
          ...originalState,
          city: 'Amsterdam'
        })
      })
    })

    describe('setType', () => {
      it('sets field', () => {
        const state = { ...originalState }
        ModalModule.mutations!.setType(state, 'TRAVEL')
        expect(state).toEqual({
          ...originalState,
          type: 'TRAVEL'
        })
      })
    })

    describe('setSize', () => {
      it('sets field', () => {
        const state = { ...originalState }
        ModalModule.mutations!.setSize(state, 'SMALL')
        expect(state).toEqual({
          ...originalState,
          size: 'SMALL'
        })
      })
    })

    describe('showModal', () => {
      it('sets field', () => {
        const state = { ...originalState }
        ModalModule.mutations!.showModal(state)
        expect(state).toEqual({
          ...originalState,
          visible: true
        })
      })
    })

    describe('hideModal', () => {
      it('sets field', () => {
        const state = { ...originalState, visible: true }
        ModalModule.mutations!.hideModal(state)
        expect(state).toEqual({
          ...originalState,
          visible: false
        })
      })
    })
  })

  describe('Actions', () => {
    it('Patches one value', () => {
      const commit = spy()
      const action = ModalModule.actions!.patchModal as Function
      action(
        { commit },
        {
          city: 'Amsterdam'
        }
      )
      expect(commit.callCount).toBe(2)
      expect(commit.firstCall.args).toEqual(['setCity', 'Amsterdam'])
      expect(commit.secondCall.args).toEqual(['hideModal'])
    })

    it('Patches two value', () => {
      const commit = spy()
      const action = ModalModule.actions!.patchModal as Function
      action(
        { commit },
        {
          city: 'Amsterdam',
          size: 'LARGE'
        }
      )
      expect(commit.callCount).toBe(3)
      expect(commit.firstCall.args).toEqual(['setCity', 'Amsterdam'])
      expect(commit.secondCall.args).toEqual(['setSize', 'LARGE'])
      expect(commit.thirdCall.args).toEqual(['hideModal'])
    })

    it('Patches all values', () => {
      const commit = spy()
      const action = ModalModule.actions!.patchModal as Function
      action(
        { commit },
        {
          city: 'Amsterdam',
          size: 'LARGE',
          type: 'LOCATION',
          visible: true
        }
      )
      expect(commit.callCount).toBe(4)
      expect(commit.firstCall.args).toEqual(['setCity', 'Amsterdam'])
      expect(commit.secondCall.args).toEqual(['setSize', 'LARGE'])
      expect(commit.thirdCall.args).toEqual(['setType', 'LOCATION'])
      expect(commit.lastCall.args).toEqual(['showModal'])
    })
  })
})
