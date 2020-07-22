import { Module, MutationTree, ActionTree } from 'vuex'
import { ModalState, TypeModalState, SizeModalState } from './modals.types'

const state: ModalState = {
  city: '',
  title: '',
  type: 'DETAILS',
  visible: false,
  size: 'MEDIUM'
}

const mutations: MutationTree<ModalState> = {
  patchModal(state: ModalState, patch: Partial<ModalState>) {
    state.city = patch.city ?? state.city
    state.size = patch.size ?? state.size
    state.title = patch.title ?? state.title
    state.type = patch.type ?? state.type
    state.visible = patch.visible ?? state.visible
  },
  setType(state: ModalState, type: TypeModalState) {
    state.type = type
  },

  setCity(state: ModalState, city: string) {
    state.city = city
  },

  setSize(state: ModalState, size: SizeModalState) {
    state.size = size
  },

  setTitle(state: ModalState, title: string) {
    state.title = title
  },
  showModal(state: ModalState) {
    state.visible = true
  },
  hideModal(state: ModalState) {
    state.visible = false
  }
}

const actions: ActionTree<ModalState, {}> = {
  patchModal({ commit }, patch: Partial<ModalState>) {
    if (patch.city) commit('setCity', patch.city)
    if (patch.size) commit('setSize', patch.size)
    if (patch.title) commit('setTitle', patch.title)
    if (patch.type) commit('setType', patch.type)
    if (patch.visible) commit('showModal')
    else commit('hideModal')
  }
}

const module: Module<ModalState, {}> = {
  namespaced: true,
  state,
  mutations,
  actions
}

export default module
