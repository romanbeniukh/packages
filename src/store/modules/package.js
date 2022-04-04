import api from '@/api'

export default {
  namespaced: true,
  state: {
    packageInfo: null,
    isOpenedModal: false,
    isLoading: false
  },
  getters: {},
  mutations: {
    SET_PACKAGE_INFO(state, data) {
      state.packageInfo = data
    },
    SET_IS_OPENED_MODAL(state, bool) {
      state.isOpenedModal = bool
    },
    SET_IS_LOADING(state, bool) {
      state.isLoading = bool
    }
  },
  actions: {
    GET_PACKAGE_INFO({ commit }, item) {
      commit('SET_IS_LOADING', true)
      const { name, version } = item
      console.log(item)

      api.packageModule
        .getFullPackageInfo({ name, version })
        .then((res) => {
          commit('SET_PACKAGE_INFO', { ...res, item })
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          commit('SET_IS_LOADING', false)
        })
    },
    SET_IS_OPENED_MODAL_ACTION({ commit }, bool) {
      commit('SET_IS_OPENED_MODAL', bool)
    }
  }
}
