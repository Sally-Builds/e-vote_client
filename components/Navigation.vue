<template>
  <div>
    <v-app-bar elevate-on-scroll app>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>
        <!-- <v-img height="60" contain src="/images/logo2.png"></v-img> -->
        E-vote
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="$auth.loggedIn" text>{{ $auth.user.name }}</v-btn>
      <!-- <v-btn v-for="(link, i) in links" :key="i" nuxt text :to="link.to">{{
        link.text
      }}</v-btn>
      <v-btn v-if="!$auth.loggedIn" nuxt text to="/login">Login</v-btn>
      <v-btn v-if="!$auth.loggedIn" nuxt text to="/register">Register</v-btn>
      <v-btn v-if="$auth.loggedIn" nuxt text>Logout</v-btn>
      <v-btn v-if="$auth.loggedIn" nuxt text to="/account"
        ><v-avatar>
          <v-img
            v-if="$auth.loggedIn"
            :src="`http://127.0.0.1:4000/images/users/${$auth.user.photo}`"
          ></v-img> </v-avatar
      ></v-btn> -->
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      links: [
        { to: '/', text: 'Home' },
        { to: '/about', text: 'About' },
        { to: '/how-to-bid', text: 'how to bid' },
      ],
    }
  },
}
</script>
