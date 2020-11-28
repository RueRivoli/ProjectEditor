import mutations from '@/store/mutations'

describe('Test mutation of store', () => {
  it('"AUTH" switch "state" to true', () => {
    const state = {
      authenticated: false
    }
    mutations.AUTH(state, true)
    expect(state.authenticated).toBe(true)
  })
  it('"AUTH" switch "state" to false', () => {
    const state = {
      authenticated: true
    }
    mutations.AUTH(state, false)
    expect(state.authenticated).toBe(false)
  })
})
