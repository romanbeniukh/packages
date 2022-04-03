<template>
  <v-app-bar class="page-header">
    <v-row justify="center">
      <v-img height="60" src="../../assets/logo.svg" />
    </v-row>
  </v-app-bar>
</template>

<script>
export default {
  name: 'PageHeader'
}
</script>

<style scoped lang="sass">
.page-header
  background: linear-gradient(139deg, rgb(251, 136, 23), rgb(255, 75, 1), rgb(193, 33, 39), rgb(224, 42, 255))
</style>
