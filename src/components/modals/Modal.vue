<template>
  <div @keydown.esc="hideModal">
    <transition name="fade">
      <div :class="this.modalSize" v-if="isVisible">
        <a
          href="#close"
          class="modal-overlay"
          aria-label="Close"
          @click="hideModal"
        ></a>
        <div class="modal-container">
          <div class="modal-header" v-if="title != null">
            <div :class="titleStyles">{{ this.title }}</div>
          </div>
          <div class="modal-body">
            <div class="content">
              <send-me-there v-if="type === 'TRAVEL'"></send-me-there>
            </div>
          </div>
          <div class="modal-footer"></div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { State, Mutation } from 'vuex-class'
import { SizeModalState, TypeModalState } from '../../store/modules/modals'
import SendMeThere from './SendMeThereModal.vue'

const namespace = 'modals'

@Component({
  components: {
    'send-me-there': SendMeThere
  }
})
export default class Modal extends Vue {
  @State('size', { namespace }) size: SizeModalState
  @State('title', { namespace }) title: string
  @State('visible', { namespace }) isVisible: boolean
  @State('city', { namespace }) city: string
  @State('type', { namespace }) type: TypeModalState
  @Mutation('hideModal', { namespace }) hideModal

  constructor() {
    super()
  }

  get modalSize(): SizeModalState {
    const style = ['modal', 'active']
    if (this.size === 'SMALL') style.push('modal-sm')
    else if (this.size === 'LARGE') style.push('modal-lg')
    return style
  }

  get titleStyles() {
    const modalTitle = 'modal-title'
    let modalSize = 'h2'
    if (this.size === 'SMALL') modalSize = 'h3'
    else if (this.size === 'LARGE') modalSize = 'h1'
    return [modalTitle, modalSize]
  }
}
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
