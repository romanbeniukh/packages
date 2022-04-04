<template>
  <v-list v-if="packages" lines="2" class="packages-list">
    <v-list-subheader class="packages-list__subheader">
      {{ totalPackages }} packages found
    </v-list-subheader>
    <package-list-item
      v-for="(item, idx) of packages"
      :key="idx"
      :data="item"
      @click="handleClick(item)"
      class="packages-list__item"
    ></package-list-item>
  </v-list>
</template>

<script>
import PackageListItem from '@/components/packages/PackageListItem'

export default {
  name: 'PackagesList',
  components: { PackageListItem },
  props: {
    packages: {
      type: [Array, null],
      required: true
    },
    totalPackages: {
      type: Number,
      default: 0
    }
  },
  emits: ['item-click'],
  methods: {
    handleClick(item) {
      this.$emit('item-click', item)
    }
  }
}
</script>

<style scoped lang="sass">
.packages-list__item
  padding-top: 20px
  padding-bottom: 20px
  border-top: 1px solid #e7e7e7
</style>
