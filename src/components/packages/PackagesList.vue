<template>
  <v-list lines="2" class="packages-list">
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
