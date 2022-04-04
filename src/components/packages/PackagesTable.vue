<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">Name</th>
        <th class="text-left">Version</th>
        <th class="text-left">Keywords</th>
      </tr>
    </thead>
    <tbody>
      <tr @click="handleClick(item)" v-for="(item, idx) of packages" :key="idx">
        <td>{{ item.name }}</td>
        <td>{{ item.version }}</td>
        <td>
          <span v-for="(item, idx) of computedKeywords(item)" :key="idx">
            {{ item + ' ' }}
          </span>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
export default {
  name: 'PackagesTable',
  props: {
    packages: {
      type: [Array, null],
      required: true
    }
  },
  computed: {
    computedKeywords() {
      return (item) => item.keywords?.slice(0, 5)
    }
  },
  emits: ['item-click'],
  methods: {
    handleClick(item) {
      this.$emit('item-click', item)
    }
  }
}
</script>

<style scoped></style>
