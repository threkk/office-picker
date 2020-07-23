import { shallowMount } from '@vue/test-utils'
import SendMeThereModal from '@/components/modals/SendMeThereModal.vue'

describe('SendMeThereModal.vue', () => {
  it('renders when mounted', () => {
    const wrapper = shallowMount(SendMeThereModal)
    const modal = wrapper.findComponent(SendMeThereModal)
    expect(modal.exists()).toBe(true)
  })
})
