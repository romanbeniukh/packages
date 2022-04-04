<template>
  <v-dialog
    @click:outside="handleClose"
    :model-value="isOpenedModal"
    width="auto"
    content-class="package-modal__content"
    class="package-modal"
  >
    <v-progress-circular
      v-if="isLoading"
      class="d-flex ma-auto"
      :size="70"
      :width="7"
      indeterminate
    ></v-progress-circular>
    <v-card v-else class="package-modal__inner modal-card">
      <v-card-header class="modal-card__header">
        <v-card-title>{{ data.item.name }}</v-card-title>
        <v-card-subtitle>version: {{ data.item.version }}</v-card-subtitle>
        <v-btn @click="handleClose" size="small" class="modal-card__close" icon>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-header>

      <div class="modal-card__body">
        <template v-if="data.badge">
          <v-card-text class="modal-card__text-title">Badge</v-card-text>
          <v-card-text class="modal-card__text" v-html="data.badge" />
        </template>

        <template v-if="data.item.description">
          <v-card-text class="modal-card__text-title">Description</v-card-text>
          <v-card-text class="modal-card__text">
            {{ data.item.description }}
          </v-card-text>
        </template>

        <template v-if="data.stats">
          <v-card-text class="modal-card__text-title">
            Top 5 files in {{ data.item.version }}
          </v-card-text>
          <v-card-text class="modal-card__text">
            <p v-for="(item, key) of sortedStats" :key="key">
              {{ key }} - {{ item.total }}
            </p>
          </v-card-text>
        </template>

        <template v-if="data.entrypoints">
          <v-card-text class="modal-card__text-title">Entrypoints</v-card-text>
          <v-card-text class="modal-card__text">
            <p v-for="(item, key) of data.entrypoints" :key="key">
              {{ key }} - {{ item.file }}
            </p>
          </v-card-text>
        </template>

        <template v-if="data.item.keywords">
          <v-card-text class="modal-card__text-title">Keywords</v-card-text>
          <v-card-text class="modal-card__text">
            <span
              v-for="(item, idx) of data.item.keywords"
              :key="idx"
              class="package-item__keyword"
              label
            >
              {{ item + ' ' }}
            </span>
          </v-card-text>
        </template>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'PackageModal',
  props: {
    data: {
      type: [Object, null],
      required: true
    },
    isOpenedModal: {
      type: Boolean,
      default: false
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    sortedStats() {
      const obj = this.data.stats?.files || {}
      const entries = Object.entries(obj)

      return Object.fromEntries(
        entries.sort(([, a], [, b]) => b.total - a.total).slice(0, 5)
      )
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="sass">

.package-modal div.package-modal__content
  width: 100%
  max-width: 800px
  max-height: initial
  padding: 15px

.modal-card__header
  position: relative
  display: flex
  flex-flow: column
  align-items: flex-start
  border-bottom: 1px solid #e7e7e7

.modal-card__body
  max-height: 600px
  overflow: auto
  padding-bottom: 20px

.modal-card__close
  position: absolute
  right: 16px

.v-dialog .v-overlay__content > .v-card > .modal-card__header
  padding: 16px 60px 0 24px

.v-dialog .v-overlay__content > .v-card > .modal-card__body > .modal-card__text-title
  font-size: 20px
  color: #000
  padding: 16px 24px 0

.v-dialog .v-overlay__content > .v-card > .modal-card__body > .modal-card__text
  padding: 5px 24px 10px
</style>
