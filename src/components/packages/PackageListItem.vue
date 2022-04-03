<template>
  <v-list-item class="align-start flex-column package-list-item">
    <v-list-item-header class="mb-4">
      <v-list-item-title>{{ data.name }}</v-list-item-title>
      <v-list-item-subtitle v-if="data.description" class="mt-2">{{
        data.description
      }}</v-list-item-subtitle>
    </v-list-item-header>
    <div v-if="computedKeywords" class="flex mb-3">
      <v-chip
        v-for="(item, idx) of computedKeywords"
        :key="idx"
        size="small"
        class="mr-2 mb-1"
        label
      >
        {{ item }}
      </v-chip>
    </div>
    <div>
      <a
        :href="'mailto:' + data.publisher.email"
        class="package-list-item__link"
        >{{ data.publisher.username }}</a
      >
      <span :title="computedDate" class="text-grey"
        >published {{ data.version }} • {{ computedDateString }}</span
      >
    </div>
  </v-list-item>
</template>

<script>
import { pluralize } from '@/helpers/pluralize'

export default {
  name: 'PackageListItem',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    computedKeywords() {
      return this.data.keywords?.slice(0, 10)
    },
    computedDate() {
      return new Date(this.data.date)
    },
    computedDateString() {
      const today = new Date()
      const date = this.computedDate

      const days = Math.ceil(
        Math.abs(date.getTime() - today.getTime()) / (1000 * 3600 * 24)
      )
      const years = Math.floor(days / 365)
      const months = Math.floor((days - years * 365) / 30)

      if (years > 0) return `${years} ${pluralize(years, 'year')} ago`
      if (months > 0) return `${months} ${pluralize(months, 'month')} ago`
      return `${days} ${pluralize(days, 'day')} ago`
    }
  }
}
</script>

<style scoped lang="sass">
.package-list-item__link
  text-decoration: none
  color: #000
  margin-right: 5px
  transition: .2s

  &:hover
    color: #ff2f00
</style>
