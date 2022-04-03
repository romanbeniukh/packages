<template>
  <v-list v-if="packages" lines="2">
    <v-list-subheader>{{ totalPackages }} packages found</v-list-subheader>
    <package-list-item
      v-for="(item, idx) of packages"
      :key="idx"
      :data="item"
      class="pt-5 pb-5 border-t-sm"
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
  }
}
</script>

<style scoped></style>
