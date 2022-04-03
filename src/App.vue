<template>
  <v-app>
    <layout-main>
      <v-main>
        <router-view />
      </v-main>
    </layout-main>
  </v-app>
</template>

<script>
import LayoutMain from '@/layouts/LayoutMain'
export default {
  name: 'App',
  components: { LayoutMain }
}
</script>
