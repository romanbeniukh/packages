<template>
  <v-list-item class="package-item">
    <v-list-item-header class="package-item__header">
      <v-list-item-title class="package-item__title">
        {{ data.name }}
      </v-list-item-title>
      <v-list-item-subtitle
        v-if="data.description"
        class="package-item__subtitle"
      >
        {{ data.description }}
      </v-list-item-subtitle>
    </v-list-item-header>
    <div v-if="computedKeywords" class="package-item__keywords">
      <v-chip
        v-for="(item, idx) of computedKeywords"
        :key="idx"
        size="small"
        class="package-item__keyword"
        label
      >
        {{ item }}
      </v-chip>
    </div>
    <div>
      <a
        @click.stop
        :href="'mailto:' + data.publisher.email"
        class="package-item__link"
        >{{ data.publisher.username }}</a
      >
      <span :title="computedDate" class="package-item__link-text"
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
.package-item
  display: flex
  flex-flow: column
  align-items: flex-start

.package-item__header
  margin-bottom: 20px

.package-item__title
  font-size: 20px
  white-space: normal

.package-item__subtitle
  margin-top: 10px

.package-item__keywords
  margin-bottom: 20px

.package-item__keyword
  margin: 0 10px 5px 0

.package-item__link
  text-decoration: none
  color: #000
  margin-right: 5px
  transition: .2s

  &:hover
    color: #ff2f00

.package-item__link-text
  color: #909090
</style>
