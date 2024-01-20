import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import GuestLayout from '@/layouts/GuestLayout.vue'

describe('GuestLayout', () => {
  it('renders properly', () => {
    const wrapper = mount(GuestLayout)
    expect(wrapper)
  })
})
