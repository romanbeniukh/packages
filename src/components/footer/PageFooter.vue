<template>
  <v-footer class="page-footer">
    <v-container>
      <v-row align="center">
        Made by
        <a
          class="page-footer__link"
          href="https://github.com/romanbeniukh"
          target="_blank"
        >
          <v-icon icon="mdi-github" size="20"></v-icon> Roman Beniukh
        </a>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: 'PageFooter'
}
</script>

<style scoped lang="sass">
.page-footer
  //background: #f8f8f8
  margin-top: auto
  max-height: 60px
  border-top: 1px solid #e7e7e7

.page-footer__link
  display: flex
  align-items: center
  width: max-content
  text-decoration: none
  color: #3e77aa
  margin-left: 5px
  border-bottom: 1px solid #3e77aa

  &:hover
    border-color: transparent
</style>
