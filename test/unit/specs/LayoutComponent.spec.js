import Vuex from 'vuex'
import LayoutComponent from '@/components/LayoutComponent'
import ElementUI from 'element-ui'
import { mount, createLocalVue } from '@vue/test-utils'
const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(ElementUI)

const headerComponent = {
  name: 'header-component',
  template: '<div id="header"></div>'
}
const tableComponent = {
  name: 'table-component',
  template: '<table id="table"></table>'
}

describe('When users is logged out', () => {
  let getters = {
    GET_AUTH: (state) => false
  }
  let store = new Vuex.Store({
    getters
  })

  const wrapper = mount(LayoutComponent, {
    stubs: {'header-component': headerComponent},
    store,
    localVue
  })
  console.log(wrapper.html())
  const msg = wrapper.find('#message')
  const header = wrapper.find('#header')
  it('The header is present', () => {
    expect(header.exists())
  })
  it('A message is displayed', () => {
    expect(msg.exists())
  })
  it('The message displays the correct text', () => {
    expect(msg.text()).toEqual('Welcome to this projects editor, you can log in on the top-right corner')
  })
})

describe('When user is logged in', () => {
  let getters = {
    GET_AUTH: (state) => true
  }
  let store = new Vuex.Store({
    getters
  })

  const wrapper = mount(LayoutComponent, {
    stubs: { 'header-component': headerComponent, 'table-component': tableComponent },
    store,
    localVue
  })
  console.log(wrapper.html())
  const table = wrapper.find('table')
  const header = wrapper.find('#header')
  const main = wrapper.find('.el-main')
  it('The header is present', () => {
    expect(header.exists())
  })
  it('A table component is displayed', () => {
    expect(table.exists())
  })

  it('el-main has class all_screen', () => {
    expect(main.classes()).toContain('all_screen')
  })
})
