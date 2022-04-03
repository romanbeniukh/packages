<template>
  <div v-if="isPaginatorShown" class="text-center">
    <v-container>
      <v-row justify="center">
        <v-col cols="8">
          <v-container class="max-width">
            <v-pagination
              v-model="computedPage"
              class="my-4"
              :length="totalPages"
            ></v-pagination>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'BasePaginator',
  props: {
    page: {
      type: Number,
      default: 0
    },
    totalPages: {
      type: Number,
      default: 0
    }
  },
  computed: {
    computedPage: {
      get() {
        return this.page
      },
      set(value) {
        this.$emit('change', value)
      }
    },
    isPaginatorShown() {
      return this.totalPages && this.totalPages > 1
    }
  }
}
</script>

<style scoped></style>
