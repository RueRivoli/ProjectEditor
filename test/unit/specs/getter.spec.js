import getters from '@/store/getters'

describe('Test getters of store', () => {

    test('"GET_AUTH" returns true if "state.authenticated" is true', () => {
      const state = {
        authenticated: true
      }
      expect(getters.GET_AUTH(state)).toBe(true)
    })

    test('"GET_AUTH" returns false if "state.authenticated" is false', () => {
      const state = {
        authenticated: false
      }
      expect(getters.GET_AUTH(state)).toBe(false)
    })
})
