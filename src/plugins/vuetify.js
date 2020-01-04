import Vue from 'vue'
import Vuex from 'vuex'

import user from '@/store/modules/user'
import acts from '@/store/modules/acts'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    acts
  },

  state: {},

  mutations: {},

  actions: {}
})
