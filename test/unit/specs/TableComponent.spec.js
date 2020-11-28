import Vuex from 'vuex'
import TableComponent from '@/components/TableComponent'
import ElementUI from 'element-ui'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import ProjectService from '@/Service/ProjectService'
import mockAxios from '../__mocks__/axios.js'
import axios from 'axios'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(ElementUI)

describe('When users is logged out', () => {
  const wrapper = shallowMount(TableComponent,
    {
      data () {
        return {
          projects: [{id: 1, name: 'Name', updated_at: '2020-20-11'}],
          totalProject: 1
        }
      },
      localVue
    })
  jest.mock('axios')
  axios.get.mockResolvedValue({
    data: [
      {
        userId: 1,
        id: 1,
        title: 'My First Album'
      },
      {
        userId: 1,
        id: 2,
        title: 'Album: The Sequel'
      }
    ]
  })
  it('mocking the axios call to get list should work', async () => {
    wrapper.vm.$nextTick(() => {
      console.log(wrapper.vm.projects)
      console.log(wrapper.html())
    })
  })
})
//       it('button refresh exists', () => {
//         let buttonRefresh = wrapper.find('.el-button#refresh')
//         expect(buttonRefresh.exists())
//       })
//       it('table header exists', () => {
//         let tableHeader = wrapper.find('tr#header')
//         expect(tableHeader.exists())
//       })
//       it('table exists', () => {
//         let table = wrapper.find('table')
//         expect(table.exists())
//       })
//       it('table exists', () => {
//         let table = wrapper.find('table')
//         expect(table.exists())
//       })
//       it('table exists', () => {
//         console.log(wrapper.vm.totalProjects)
//         console.log(wrapper.vm.projects)
//         console.log(wrapper.vm.projectDisplayed)
//       })
//   it('mocking the axios call to get list should work', () => {
//     wrapper.vm.$nextTick(() => {
//       console.log(wrapper.vm.projects)
//       console.log(wrapper.html())
//     })
//   })
// })