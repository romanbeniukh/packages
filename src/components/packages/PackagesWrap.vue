<template>
  <div v-if="packages" class="packages-wrap">
    <header class="packages-wrap__header">
      <h2 class="packages-wrap__title">{{ totalPackages }} packages found</h2>
      <list-table-switcher
        @change="handleListTableSwitcher"
        :default-view="listView"
      />
    </header>

    <component
      :is="activeViewComponent"
      :packages="packages"
      @item-click="getPackageInfo"
    />
    <!--
    />-->
    <!--    <packages-list :packages="packages" @item-click="getPackageInfo" />-->
    <!--    <packages-table :packages="packages" @item-click="getPackageInfo" />-->
    <base-paginator
      :page="page"
      :total-pages="totalPages"
      @change="handlePage"
    />
    <package-modal
      :data="packageInfo"
      @close="handleCloseModal"
      :is-opened-modal="isOpenedModal"
      :is-loading="isLoadingPackage"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

import PackagesList from '@/components/packages/PackagesList'
import BasePaginator from '@/components/pagination/BasePaginator'
import PackagesTable from '@/components/packages/PackagesTable'
import PackageModal from '@/components/packages/PackageModal'
import ListTableSwitcher from '@/components/helpers/ListTableSwitcher'

export default {
  name: 'PackagesWrap',
  components: {
    ListTableSwitcher,
    PackagesTable,
    BasePaginator,
    PackagesList,
    PackageModal
  },
  computed: {
    ...mapGetters('packagesModule', ['totalPages']),
    ...mapState('packagesModule', {
      packages: (state) => state.packages,
      totalPackages: (state) => state.totalPackages,
      isLoadingPackages: (state) => state.isLoading,
      page: (state) => state.page,
      listView: (state) => state.listView
    }),
    ...mapState('packageModule', {
      packageInfo: (state) => state.packageInfo,
      isOpenedModal: (state) => state.isOpenedModal,
      isLoadingPackage: (state) => state.isLoading
    }),
    activeViewComponent() {
      switch (this.listView) {
        case 'table':
          return PackagesTable

        default:
          return PackagesList
      }
    }
  },
  methods: {
    ...mapActions('packagesModule', [
      'GET_PACKAGES',
      'SET_DEFAULT_STATE_ACTION',
      'SET_QUERY_ACTION',
      'SET_PAGE_ACTION',
      'SET_LIST_VIEW_ACTION'
    ]),
    ...mapActions('packageModule', [
      'GET_PACKAGE_INFO',
      'SET_IS_OPENED_MODAL_ACTION'
    ]),
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
    },
    handleListTableSwitcher(e) {
      this.SET_LIST_VIEW_ACTION(e)
    }
  }
}
</script>

<style scoped lang="sass">
.packages-wrap__header
  display: flex
  flex-flow: row nowrap
  justify-content: space-between
  align-items: center
  padding: 10px 0

.packages-wrap__title
  font-size: 18px
  font-weight: 500
</style>
