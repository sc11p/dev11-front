import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    auth: {},
    user: null
  },
  getters: {
    auth: state => state.auth,
    user: state => state.user
  },
  mutations: {
    setAuth: (state, payload) => state.auth = payload,
    setUser: (state, payload) => state.user = payload
  },
  actions: {
    logoutUser: (state) => {
      state.commit('setAuth', {});
      state.commit('setUser', null);
    }
  }
});
