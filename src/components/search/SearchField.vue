<template>
  <v-text-field
    v-model="computedQuery"
    :loading="isLoading"
    label="search all of npm"
    variant="outlined"
    prepend-inner-icon="mdi-magnify"
    clear-icon="mdi-delete-outline"
    clearable
  ></v-text-field>
</template>

<script>
export default {
  name: 'SearchField',
  props: {
    query: {
      type: String,
      default: ''
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['input', 'clear'],
  computed: {
    computedQuery: {
      get() {
        return this.query
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  },
  created() {
    // For first load
    this.unwatchComputedQuery = this.$watch('computedQuery', (value) => {
      if (value) {
        this.$emit('input', value)
        this.unwatchComputedQuery()
      }
    })
  }
}
</script>
