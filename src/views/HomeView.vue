<template>
  <search-field
    :query="query"
    :is-loading="isLoading"
    @input="handleSearch"
    @clear="SET_DEFAULT_STATE_ACTION"
  />
  <packages-list :packages="packages" :total-packages="totalPackages" />
  <base-paginator :page="page" :total-pages="totalPages" @change="handlePage" />
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { debounce } from '@/helpers/debounce'

import SearchField from '@/components/search/SearchField'
import PackagesList from '@/components/packages/PackagesList'
import BasePaginator from '@/components/pagination/BasePaginator'

export default {
  name: 'HomeView',
  components: { BasePaginator, PackagesList, SearchField },
  computed: {
    ...mapGetters('packagesModule', ['totalPages']),
    ...mapState('packagesModule', {
      query: (state) => state.query,
      packages: (state) => state.packages,
      totalPackages: (state) => state.totalPackages,
      isLoading: (state) => state.isLoading,
      page: (state) => state.page
    })
  },
  methods: {
    ...mapActions('packagesModule', [
      'GET_PACKAGES',
      'SET_DEFAULT_STATE_ACTION',
      'SET_QUERY_ACTION',
      'SET_PAGE_ACTION'
    ]),
    getPackages: debounce(function (value) {
      if (!value) return this.SET_DEFAULT_STATE_ACTION()
      this.GET_PACKAGES(value)
    }, 300),
    handleSearch(value) {
      this.SET_QUERY_ACTION(value)
      this.getPackages(value)
    },
    handlePage(value) {
      this.SET_PAGE_ACTION(value)
    }
  }
}
</script>

<style scoped></style>
