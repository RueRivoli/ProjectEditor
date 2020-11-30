import Vuex from 'vuex'
import HeaderComponent from '@/components/HeaderComponent'
import ElementUI from 'element-ui'
import { mount, createLocalVue } from '@vue/test-utils'
const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(ElementUI)

let wrapper

beforeEach(() => {
  let getters = {
    GET_AUTH: (state) => false
  }
  let store = new Vuex.Store({
    getters
  })

  wrapper = mount(HeaderComponent, {
    store,
    localVue })
})
afterEach(() => {
  wrapper.destroy()
})

describe('When user is logged out', () => {
  it('A header exists', () => {
    const header = wrapper.find('header')
    expect(header.exists())
  })
  it('Header contains Phrase Title', () => {
    const header = wrapper.find('header')
    expect(header.text()).toContain('Phrase - Projects Editor')
  })
  it('Header contains Login Title', () => {
    const header = wrapper.find('header')
    expect(header.text()).toContain('Login')
  })

  it('Login button exists', () => {
    const login = wrapper.find('#login')
    expect(login.exists())
  })

  it('When clicking on login button, a dialog pops out', async () => {
    const dialog = wrapper.find('.el-dialog')
    const button = wrapper.find('button')
    await button.trigger('click')
    expect(dialog.exists())
  })
})

describe('Login function is called', () => {
  it('If username/password is empty, username error is displayed', async () => {
    const loginMock = jest.fn(() => Promise.resolve())
    wrapper.setMethods({ login: loginMock })
    await wrapper.vm.$nextTick()
    /* Click on login button */
    const button = wrapper.find('button#login')
    await button.trigger('click')

    await wrapper.find('#submit').trigger('click')
    expect(loginMock).toHaveBeenCalled()
  })
})

describe('Cancel button of dialog works', () => {
  it('Cancel button removes dialog', async () => {
    /* Click on login button */

    const button = wrapper.find('button')
    await button.trigger('click')
    const cancelButton = wrapper.find('#cancel')
    await cancelButton.trigger('click')
    const dialog = wrapper.find('.el-dialog')
    expect(dialog.isVisible()).toBe(false)
  })
})

describe('If user enters invalid password', () => {
  it('Errors are displayed if invalid username/password is noticed', async () => {
    /* Click on login button */
    const button = wrapper.find('button')
    await button.trigger('click')

    /* Fill with empty username and password */
    let username = wrapper.find('input[type=text]')
    await username.setValue('')
    let paswd = wrapper.find('input[type=password]')
    await paswd.setValue('')

    /*  Submit Form */
    await wrapper.find('#submit').trigger('click')

    let errors = wrapper.findAll('.el-form-item__error')
    const usernameError = errors.at(0)
    const passwordError = errors.at(1)
    expect(usernameError.exists())
    expect(usernameError.text()).toBe('Please input your username')
    expect(passwordError.exists())
    expect(passwordError.text()).toBe('Please enter a password')

    /* if password contains not any capital letter */
    await username.setValue('testusername')
    await paswd.setValue('incorrectpassword-1')
    await wrapper.find('#submit').trigger('click')
    expect(passwordError.exists())
    expect(passwordError.text()).toBe('Between 6 and 30 characters, at least one uppercase, one lowercase, one figure, a special character among -+!*$@%_')

    /* if password contains no special characters */
    await username.setValue('Username')
    await paswd.setValue('IncorrectPasswordWithNoSpecialCharacter1')
    await wrapper.find('#submit').trigger('click')
    expect(passwordError.exists())
    expect(passwordError.text()).toBe('Between 6 and 30 characters, at least one uppercase, one lowercase, one figure, a special character among -+!*$@%_')

    /* if password contains no lower case characters */
    await username.setValue('Username')
    await paswd.setValue('INCORRECTPASSWORD-1')
    await wrapper.find('#submit').trigger('click')
    expect(passwordError.exists())
    expect(passwordError.text()).toBe('Between 6 and 30 characters, at least one uppercase, one lowercase, one figure, a special character among -+!*$@%_')

    /* if password contains not a number */
    await username.setValue('Username')
    await paswd.setValue('IncorrectPassword-')
    await wrapper.find('#submit').trigger('click')
    expect(passwordError.exists())
    expect(passwordError.text()).toBe('Between 6 and 30 characters, at least one uppercase, one lowercase, one figure, a special character among -+!*$@%_')

    /* if password is too short */
    await username.setValue('Username')
    await paswd.setValue('Ip-1')
    await wrapper.find('#submit').trigger('click')
    expect(passwordError.exists())
    expect(passwordError.text()).toBe('Between 6 and 30 characters, at least one uppercase, one lowercase, one figure, a special character among -+!*$@%_')
  })
})
