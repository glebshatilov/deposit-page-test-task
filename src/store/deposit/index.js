const state = () => ({
  level: null,
  goal: null,
  progress: null,
  remains: null,
  levels: null,
  nextLevel: null
})

const getters = {}

const actions = {
  init ({ commit }, payload) {
    commit('setData', payload)
  }
}

const mutations = {
  setData (state, payload) {
    // очередной костыль (спасибо ТБ)
    if (payload.level?.name === 'Ручной vip') {
      payload.level.name = 'elite'
    }
    state.level = payload.level?.name
    state.goal = payload.level?.goal
    state.progress = payload.level?.progress
    state.remains = payload.level?.goal - payload.level?.progress
    state.levels = payload.levels

    const currentIndex = payload.levels.findIndex(level => level.name === state.level)
    state.nextLevel = state.level === 'elite' ? null : payload.levels[currentIndex + 1] || null
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
