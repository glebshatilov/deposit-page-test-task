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
  },
  updateAmount ({ commit }, amount) {
    const numberValue = Number(amount.replace(/ /g, '')) // convert our string value to number

    commit('setAmount', numberValue)
  },
  updateCurrency ({ commit }, currency) {
    commit('setCurrency', currency)
  }
}

const mutations = {
  setSelectedMethod (state, data) {
    state.selectedMethod = data
  },
  setValidPhone (state, phoneNumber) {
    state.validPhone = phoneNumber
  },
  setAmount (state, amount) {
    state.amount = amount
  },
  setCurrency (state, currency) {
    state.currency = currency
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
