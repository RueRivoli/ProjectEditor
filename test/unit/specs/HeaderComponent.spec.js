import Vuex from 'vuex'
import HeaderComponent from '@/components/HeaderComponent'
import ElementUI from 'element-ui'
import { mount, createLocalVue } from '@vue/test-utils'
const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(ElementUI)

let wrapper
let getters = {
  GET_AUTH: (state) => false
}
let store = new Vuex.Store({
  getters
})




describe('When user is logged out', () => {
    beforeEach(() => {
        wrapper = mount(HeaderComponent, {
          store,
          localVue })
      })
      
      afterEach(() => {
        wrapper.destroy()
      })
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
  
  it('Login part exists', () => {
    const login = wrapper.find('#login')
    expect(login.exists())
  })

  it('Login button exists', () => {
    const button = wrapper.find('button')
    expect(button.exists())
  })
  
  it('When clicking on login button, a dialog pops out', async () => {
    const dialog = wrapper.find('.el-dialog')
    const button = wrapper.find('button')
    await button.trigger('click')
    expect(dialog.exists())
  })

//   const submitButton = wrapper.find('#submit')

 
//   console.log(wrapper.html())
  
//   it('Param dialogFormVisible is then set to true', () => {
//     expect(loginInput.exists())
//   })

})





  
// describe('If user enters wrong username/password', () => {
//     beforeEach(() => {
//         wrapper = mount(HeaderComponent, {
//           store,
//           localVue })
          
        
          
//       })
//       afterEach(() => {
//         wrapper.destroy()
//       })
//       it('If entering empty values an error occures', async () => {
//         const button = wrapper.find('button')
//         await button.trigger('click')
//         await wrapper.find('input[type=text]').setValue('')
//         await wrapper.find('input[type=password]').setValue('')
//         await wrapper.find('#submit').trigger('click')
//         // const usernameError = wrapper.find('el-form-item__error').at(0)
//         // const pswdError = wrapper.find('el-form-item__error').at(1)
//         // console.log(usernameError)
//         // console.log(pswdError)
//         console.log(wrapper.html())
//       })

// })