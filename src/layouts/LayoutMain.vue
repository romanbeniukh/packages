<template>
  <div class="layout-main">
    <page-header />
    <v-container>
      <slot></slot>
    </v-container>
    <page-footer />
  </div>
</template>

<script>
import PageHeader from '@/components/header/PageHeader'
import PageFooter from '@/components/footer/PageFooter'
export default {
  name: 'LayoutMain',
  components: { PageFooter, PageHeader }
}
</script>

<style scoped lang="sass">
.layout-main
  display: flex
  flex-flow: column
  width: 100%
  min-height: 100vh
</style>
