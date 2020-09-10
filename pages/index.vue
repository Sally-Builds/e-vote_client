<template>
  <div>
    <v-row>
      <v-carousel height="550" hide-delimiters :show-arrows="false">
        <v-carousel-item
          src="/images/auction.jpg"
          gradient="to top right, rgba(120, 115, 201, .39), rgba(15, 12, 72, .9)"
        >
          <v-row class="fill-height pa-4" align="center" justify="center">
            <v-row>
              <v-col cols="12">
                <div class="text-h4 font-weight-light">
                  You are One click away from winning!
                </div>
              </v-col>
              <v-col cols="12">
                <div class="pl-9">
                  <v-btn large class="primary"> Start Bid</v-btn>
                </div>
              </v-col>
            </v-row>
          </v-row>
        </v-carousel-item>
      </v-carousel>
    </v-row>
    <v-row>
      <v-col v-for="(election, i) in elections" :key="i" cols="4">
        <v-card class="mx-auto my-12" max-width="374" height="auto">
          <v-img height="250" contain :src="`images/products/we.jpg`"></v-img>

          <v-card-title class="text-caption">
            {{ election.name }}
          </v-card-title>

          <v-divider class="mx-4"></v-divider>

          <v-card-title>Election Starts</v-card-title>

          <v-card-text>
            <Counter
              :end="{
                year: new Date(election.startTime).getFullYear(),
                month: new Date(election.startTime).getMonth(),
                date: new Date(election.startTime).getDate(),
                hour: new Date(election.startTime).getHours(),
                minute: new Date(election.startTime).getMinutes(),
                second: new Date(election.startTime).getSeconds(),
                millisecond: new Date(election.startTime).getMilliseconds(),
              }"
              :start="time"
            />
            <!-- 00d: 12hr: 23mm: 32sec -->
          </v-card-text>

          <v-card-actions>
            <v-btn color="deep-purple lighten-2" text> vote </v-btn>
            <v-btn
              color="deep-purple lighten-2"
              text
              @click="goTo(election.slug, election.id)"
            >
              View Details
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Counter from '@/components/counter'
export default {
  components: {
    Counter,
  },
  data() {
    return {
      time: new Date(),
      status: false,
    }
  },
  computed: {
    elections() {
      return this.$store.getters.getAllElections
    },
  },
  created() {
    this.timer()
  },
  methods: {
    timer() {
      setInterval(() => {
        this.time = new Date()
      }, 1000)
    },
    goTo(slug, id) {
      this.$store.dispatch('singleElection', id)
      this.$router.push(`/election/${slug}`)
    },
  },
}
</script>
