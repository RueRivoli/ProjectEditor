import Vuex from 'vuex'
import TableComponent from '@/components/TableComponent'
import ElementUI from 'element-ui'
import { mount, createLocalVue } from '@vue/test-utils'
import {projectsSample1, projectsSample3, projectsSample10} from './../data/projects'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(ElementUI)

let wrapper
beforeEach(() => {
  wrapper = mount(TableComponent, {
    localVue
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('Refresh Button calls getList', async () => {
  it('When click on refresh button, getList is triggered', async () => {
    /* Mock method getList  */
    const getListMock = jest.fn(() => Promise.resolve({}))
    wrapper.setMethods({ getList: getListMock })
    await wrapper.vm.$nextTick()

    /* Click on refresh button */
    const refreshButton = wrapper.find('#refresh')
    await refreshButton.trigger('click')
    expect(wrapper.vm.getList).toHaveBeenCalled()
  })
})

describe('Table displays correct data', () => {
  it('Renders correctly title headers names', async () => {
    const table = wrapper.find('table')
    expect(table.text().includes('Actions')).toBe(true)
    expect(table.text().includes('Project Name')).toBe(true)
    expect(table.text().includes('Update time')).toBe(true)
  })

  it('Renders projects names', async () => {
    wrapper.setData({ projects: projectsSample3, current_page: 1 })
    await wrapper.vm.$nextTick()
    const table = wrapper.find('table')

    expect(table.text().includes('Project_1')).toBe(true)
    expect(table.text().includes('Project_2')).toBe(true)
    expect(table.text().includes('Project_3')).toBe(true)
  })

  it('Display correct number of rows with 3 rows table', async () => {
    wrapper.setData({ projects: projectsSample3, current_page: 1 })
    await wrapper.vm.$nextTick()
    const table = wrapper.find('table')
    const rows = table.findAll('tr')
    expect(rows.length).toBe(4)
  })

  it('Display correct number of rows with 10 rows table ', async () => {
    wrapper.setData({ projects: projectsSample10, current_page: 1 })
    await wrapper.vm.$nextTick()
    const table = wrapper.find('table')
    const rows = table.findAll('tr')
    expect(rows.length).toBe(11)
  })
})

describe('Edition Mode works well', () => {
  it('Clicking on edit icon make appears an input', async () => {
    wrapper.setData({ projects: projectsSample1, current_page: 1 })
    await wrapper.vm.$nextTick()
    const table = wrapper.find('table')
    const secondRow = table.findAll('tr').at(1)
    const firstTd = secondRow.findAll('td').at(0)
    await firstTd.trigger('click')
    const inputName = secondRow.find('input')
    expect(inputName.exists()).toBe(true)
  })

  it('Clicking on save calls editName method', async () => {
    /* Mock changeName function and load list of projects */
    wrapper.setData({ projects: projectsSample1, current_page: 1 })
    const editNameMock = jest.fn(() => Promise.resolve({}))
    wrapper.setMethods({ editName: editNameMock })
    await wrapper.vm.$nextTick()

    const table = wrapper.find('table')
    const secondRow = table.findAll('tr').at(1)
    const firstTd = secondRow.findAll('td').at(0)

    /* Click to edit */
    await firstTd.trigger('click')
    await firstTd.trigger('click')

    /* Project Name with an unauthorized character */
    expect(wrapper.vm.editName).toHaveBeenCalled()
  })

  it('A wrong format project name is refused', async () => {
    /* Mock changeName function and load list of projects */
    wrapper.setData({ projects: projectsSample1, current_page: 1 })
    const changeNameMock = jest.fn(() => Promise.resolve({}))

    wrapper.setMethods({ changeName: changeNameMock })
    await wrapper.vm.$nextTick()

    const table = wrapper.find('table')
    const secondRow = table.findAll('tr').at(1)
    const firstTd = secondRow.findAll('td').at(0)

    /* Click to edit */
    await firstTd.trigger('click')

    /* Correct Project Name */
    wrapper.vm.newName = 'ProjectNameWithCorrectFormat'
    await firstTd.trigger('click')
    /* If new name of project matches the requirements the function changeName is called */
    expect(wrapper.vm.changeName).toHaveBeenCalled()

    /* Project Name with unauthorized characters */
    wrapper.vm.newName = 'WrongCharacter¨'
    await firstTd.trigger('click')
    expect(wrapper.vm.changeName).toHaveBeenCalledTimes(1)

    /* Project Name too short */
    wrapper.vm.newName = 'P'
    await firstTd.trigger('click')
    expect(wrapper.vm.changeName).toHaveBeenCalledTimes(1)

    /* Project Name too short */
    wrapper.vm.newName = 'ProjectNameTooLongThatContainsMoreThat40Characters'
    await firstTd.trigger('click')
    expect(wrapper.vm.changeName).toHaveBeenCalledTimes(1)
  })
})

describe('Filter format works correctly', () => {
  it('Format filter displays correctly time', async () => {
    let date10DaysAgo = new Date()
    date10DaysAgo.setDate(date10DaysAgo.getDate() - 10)
    let formatValue = wrapper.vm.$options.filters.format(date10DaysAgo)
    expect(formatValue).toBe('10 days ago')
    let date20minutesAgo = new Date()
    date20minutesAgo.setMinutes(date20minutesAgo.getMinutes() - 20)
    formatValue = wrapper.vm.$options.filters.format(date20minutesAgo)
    expect(formatValue).toBe('20 minutes ago')
  })
})
