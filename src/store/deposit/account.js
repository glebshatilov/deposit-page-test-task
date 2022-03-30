const state = () => ({
  selected: null
})

const getters = {}

const actions = {
  select ({ commit }, accountData) {
    commit('setSelected', accountData)
  }
}

const mutations = {
  setSelected (state, data) {
    state.selected = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
