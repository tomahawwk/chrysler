export default {
  state: {
    isMenuActive: false
  },
  getters: {
    isMenuActive: state => state.isMenuActive
  },
  mutations: {
    setMenuActive: (state, payload) => {
      state.isMenuActive = payload
    },
    toggleMenu: state => {
      state.isMenuActive = !state.isMenuActive
    }
  },
  actions: {
    openMenu: ({ commit }) => {
      commit('setMenuActive', true)
    },
    closeMenu: ({ commit }) => {
      commit('setMenuActive', false)
    },
    toggleMenu: ({ commit }) => {
      commit('toggleMenu')
    }
  }
}
