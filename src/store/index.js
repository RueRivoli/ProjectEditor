import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const state = {
  authenticated: false
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  plugins: [
    createPersistedState({
      storage: window.sessionStorage
    })
  ]
})
