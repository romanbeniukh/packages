<template>
  <div class="home-view">
    <h1 class="home-view__title">Home page</h1>
    <search-field
      :query="query"
      :is-loading="isLoadingPackages"
      @input="handleSearch"
      class="home-view__search"
    />
    <PackagesWrap />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { debounce } from '@/helpers/debounce'

import SearchField from '@/components/search/SearchField'
import PackagesWrap from '@/components/packages/PackagesWrap'

export default {
  name: 'HomeView',
  components: {
    PackagesWrap,
    SearchField
  },
  computed: {
    ...mapGetters('packagesModule', ['totalPages']),
    ...mapState('packagesModule', {
      query: (state) => state.query,
      isLoadingPackages: (state) => state.isLoading
    })
  },
  methods: {
    ...mapActions('packagesModule', [
      'GET_PACKAGES',
      'SET_DEFAULT_STATE_ACTION',
      'SET_QUERY_ACTION'
    ]),
    getDebouncedPackages: debounce(function () {
      this.GET_PACKAGES()
    }, 300),
    handleSearch(value) {
      this.SET_QUERY_ACTION(value)
      if (!value) return this.SET_DEFAULT_STATE_ACTION()
      this.getDebouncedPackages()
    }
  }
}
</script>

<style scoped lang="sass">
.home-view__title
  font-size: 24px
  font-weight: 500
  margin: 10px 0

.home-view__search
  margin-top: 25px
</style>
