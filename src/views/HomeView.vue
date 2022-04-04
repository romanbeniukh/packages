<template>
  <search-field
    :query="query"
    :is-loading="isLoadingPackages"
    @input="handleSearch"
  />
  <packages-list
    :packages="packages"
    :total-packages="totalPackages"
    @item-click="getPackageInfo"
  />
  <base-paginator :page="page" :total-pages="totalPages" @change="handlePage" />
  <package-modal
    :data="packageInfo"
    @close="handleCloseModal"
    :is-opened-modal="isOpenedModal"
    :is-loading="isLoadingPackage"
  />
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { debounce } from '@/helpers/debounce'

import SearchField from '@/components/search/SearchField'
import PackagesList from '@/components/packages/PackagesList'
import BasePaginator from '@/components/pagination/BasePaginator'
import PackageModal from '@/components/packages/PackageModal'

export default {
  name: 'HomeView',
  components: { PackageModal, BasePaginator, PackagesList, SearchField },
  computed: {
    ...mapGetters('packagesModule', ['totalPages']),
    ...mapState('packagesModule', {
      query: (state) => state.query,
      packages: (state) => state.packages,
      totalPackages: (state) => state.totalPackages,
      isLoadingPackages: (state) => state.isLoading,
      page: (state) => state.page
    }),
    ...mapState('packageModule', {
      packageInfo: (state) => state.packageInfo,
      isOpenedModal: (state) => state.isOpenedModal,
      isLoadingPackage: (state) => state.isLoading
    })
  },
  methods: {
    ...mapActions('packagesModule', [
      'GET_PACKAGES',
      'SET_DEFAULT_STATE_ACTION',
      'SET_QUERY_ACTION',
      'SET_PAGE_ACTION'
    ]),
    ...mapActions('packageModule', [
      'GET_PACKAGE_INFO',
      'SET_IS_OPENED_MODAL_ACTION'
    ]),
    getDebouncedPackages: debounce(function () {
      this.GET_PACKAGES()
    }, 300),
    handleSearch(value) {
      this.SET_QUERY_ACTION(value)
      if (!value) return this.SET_DEFAULT_STATE_ACTION()
      this.getDebouncedPackages()
    },
    handlePage(value) {
      this.SET_PAGE_ACTION(value)
      this.GET_PACKAGES()
    },
    getPackageInfo(e) {
      this.SET_IS_OPENED_MODAL_ACTION(true)
      this.GET_PACKAGE_INFO(e)
    },
    handleCloseModal() {
      this.SET_IS_OPENED_MODAL_ACTION(false)
    }
  },
  mounted() {
    // simple
    this.$notify({
      group: 'error',
      type: 'error',
      title: 'Authorization',
      text: 'You have been logged in!'
    })
  }
}
</script>
