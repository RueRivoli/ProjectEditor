const mutations = {
  AUTH: (state) => {
    state.authentificated = true
  },
  USERNAME: (state, username) => {
    state.username = username
  }
}

export default mutations
