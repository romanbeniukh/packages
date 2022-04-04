<template>
  <v-btn-toggle
    v-model="computedValue"
    divided
    size="small"
    class="list-table-switcher"
  >
    <v-btn class="list-table-switcher__btn">
      <v-icon icon="mdi-format-italic">mdi-format-list-bulleted-square</v-icon>
    </v-btn>
    <v-btn class="list-table-switcher__btn">
      <v-icon icon="mdi-format-italic">mdi-table</v-icon>
    </v-btn>
  </v-btn-toggle>
</template>

<script>
const LIST_NUMBER = 0
const TABLE_NUMBER = 1
const LIST_STRING = 'list'
const TABLE_STRING = 'table'

const MAPPED_BY_NUMBER = {
  [LIST_NUMBER]: LIST_STRING,
  [TABLE_NUMBER]: TABLE_STRING
}

const MAPPED_BY_STRING = {
  [LIST_STRING]: LIST_NUMBER,
  [TABLE_STRING]: TABLE_NUMBER
}

export default {
  name: 'ListTableSwitcher',
  props: {
    defaultView: {
      type: String,
      default: LIST_STRING
    }
  },
  computed: {
    computedValue: {
      get() {
        return MAPPED_BY_STRING[this.defaultView]
      },
      set(value) {
        this.$emit('change', MAPPED_BY_NUMBER[value])
      }
    }
  }
}
</script>

<style scoped lang="sass">
.list-table-switcher
  border: 1px solid #e7e7e7
  flex: none
  flex-shrink: 0
</style>
