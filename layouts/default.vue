<template>
  <v-app dark>
    <Navigation />
    <v-main>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import Navigation from '@/components/Navigation'
export default {
  components: {
    Navigation,
  },
  data() {
    return {}
  },
}
</script>
