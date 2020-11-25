import Vuex from 'vuex'
import TableComponent from '@/components/TableComponent'
import ElementUI from 'element-ui'
import { render } from '@testing-library/vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import { getProjects } from '@/Service/ProjectService'
jest.mock('axios', () => ({
    get: Promise.resolve('value')
  }))

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(ElementUI)

describe('When users is logged out', () => {
    const wrapper = shallowMount(TableComponent,
        {localVue})
  it('mocking the axios call to get list should work', () => {
    wrapper.vm.$nextTick(() => {
     console.log(wrapper.vm.projects)
    })
  })
})