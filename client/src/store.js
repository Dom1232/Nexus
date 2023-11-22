import { createStore } from 'vuex';

export default createStore({
  state: {
    isAuthenticated: false,
  },
  mutations: {
    setAuthentication(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
  },
  actions: {
    // Add an action to update authentication status based on your logic
    updateAuthentication({ commit }, isAuthenticated) {
      commit('setAuthentication', isAuthenticated);
    },
  },
  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
  },
});