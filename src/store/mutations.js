const mutations = {
  AUTH: (state, bl) => {
    state.authentificated = bl
  },
  USERNAME: (state, username) => {
    state.username = username
  }
}

export default mutations
