const state = () => ({
  selectedMethod: null,
  validPhone: null,
  amount: null,
  currency: null
})

const getters = {}

const actions = {
  selectMethod ({ commit }, paymentMethodData) {
    commit('setSelectedMethod', paymentMethodData)
  },
  updatePhone ({ commit }, phoneNumber) {
    commit('setValidPhone', phoneNumber)
  }
}

const mutations = {
  setSelectedMethod (state, data) {
    state.selectedMethod = data
  },
  setValidPhone (state, phoneNumber) {
    state.validPhone = phoneNumber
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
