<template>
  <v-app>
    <layout-main>
      <v-main>
        <router-view />
      </v-main>
    </layout-main>
  </v-app>
  <notifications group="error" position="top center" :max="3" />
</template>

<script>
import LayoutMain from '@/layouts/LayoutMain'
export default {
  name: 'App',
  components: { LayoutMain }
}
</script>
