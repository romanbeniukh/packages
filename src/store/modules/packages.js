import api from '@/api'

const DEFAULT_PACKAGES = null
const DEFAULT_PAGE = 1
const DEFAULT_PER_PAGE = 10
const DEFAULT_TOTAL_PACKAGES = 0

export default {
  namespaced: true,
  state: {
    query: '',
    packages: DEFAULT_PACKAGES,
    page: DEFAULT_PAGE,
    perPage: DEFAULT_PER_PAGE,
    totalPackages: DEFAULT_TOTAL_PACKAGES,
    isLoading: false
  },
  getters: {
    offset(state) {
      return state.page * state.perPage - state.perPage
    },
    totalPages(state) {
      return Math.ceil(state.totalPackages / state.perPage)
    }
  },
  mutations: {
    SET_QUERY(state, query) {
      state.query = query
    },
    SET_PACKAGES(state, data) {
      state.packages = data?.objects?.map((x) => ({
        ...x.package,
        score: x.score
      }))
      state.totalPackages = data?.total
    },
    SET_PAGE(state, page) {
      state.page = page
    },
    SET_IS_LOADING(state, bool) {
      state.isLoading = bool
    },
    SET_DEFAULT_STATE(state) {
      state.packages = DEFAULT_PACKAGES
      state.page = DEFAULT_PAGE
      state.totalPackages = DEFAULT_TOTAL_PACKAGES
    }
  },
  actions: {
    async GET_PACKAGES({ commit, state, getters }, query) {
      const params = {
        text: query,
        from: getters.offset,
        size: state.perPage
      }

      commit('SET_IS_LOADING', true)

      await api.packagesModule
        .getPackagesByQuery(params)
        .then((res) => {
          // console.log(res)
          commit('SET_PACKAGES', res)
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          commit('SET_IS_LOADING', false)
        })
    },
    SET_QUERY_ACTION({ commit }, query) {
      commit('SET_QUERY', query)
    },
    SET_PAGE_ACTION({ commit }, page) {
      commit('SET_PAGE', page)
    },
    SET_DEFAULT_STATE_ACTION({ commit }) {
      commit('SET_DEFAULT_STATE')
    }
  }
}
