<template>
  <div>
    <v-container v-if="election">
      <v-row>
        <v-col class="text-center" cols="12">
          <h3>{{ election.name }}</h3>
        </v-col>
        <v-col cols="12">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
            maxime enim sunt nostrum, quibusdam, voluptates quod delectus
            repellendus similique omnis est, iste consequatur autem molestias!
            Quidem quisquam consequatur unde sapiente?
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          election starts in
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
          <v-btn large @click="vote()">Vote</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="text-center" cols="12">
          <h4>This are the election Candidates</h4>
        </v-col>
        <v-col
          v-for="(candidate, i) in election.candidates"
          :key="i"
          cols="12"
          md="4"
        >
          <v-card>
            <v-row align="end" class="fill-height">
              <v-col align-self="start" cols="12">
                <v-avatar class="profile" color="grey" size="164" tile>
                  <v-img src="/images/user.jpeg" contain></v-img>
                </v-avatar>
              </v-col>
              <v-col class="py-0">
                <v-list-item color="rgba(0, 0, 0, .4)">
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ candidate.name }}
                    </v-list-item-title>
                    <v-list-item-content
                      >{{ candidate.agenda }}
                    </v-list-item-content>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: new Date(),
      status: false,
    }
  },
  computed: {
    election() {
      return this.$store.getters.getElection
    },
  },
  mounted() {
    this.$store.dispatch('loadSingleElection', this.$route.params.id)
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
    enter() {
      this.$router.push(`/auction/${this.$route.params.id}`)
    },
  },
}
</script>
