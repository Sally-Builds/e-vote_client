<template>
  <div>
    <v-container v-if="election">
      <v-row>
        <v-col class="text-center" cols="12">
          <h3>Welcome to the {{ election.name }}</h3>
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
        <v-col cols="6">
          <v-col class="text-center" cols="12">
            <h3>Cast your votes</h3>
          </v-col>
          <v-col cols="6">
            <v-form>
              <v-radio-group v-model="votedCandidate">
                <v-radio
                  v-for="(candidate, i) in election.candidates"
                  :key="i"
                  :value="`${candidate.id}`"
                  :label="`${i + 1}) ${candidate.name}`"
                ></v-radio>
              </v-radio-group>
              <v-btn
                v-if="_hasVoted === 'success'"
                color="primary"
                outlined
                @click="vote"
                >submit vote</v-btn
              >
              <v-btn v-if="_hasVoted === 'fail'" color="primary" text disabled
                >Thanks for voting</v-btn
              >
            </v-form>
          </v-col>
        </v-col>
        <v-col cols="6">
          <v-col class="text-center" cols="12">
            <h3>Election poll</h3>
          </v-col>
          <v-col cols="12">
            <v-simple-table fixed-header height="200px">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">s/n</th>
                    <th class="text-left">Candidate</th>
                    <th class="text-left">Votes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(can, i) in _candidates" :key="i">
                    <td>{{ i + 1 }}</td>
                    <td>{{ can.name }}</td>
                    <td>{{ can.vote }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
          <v-col cols="12"> Winner name: Onyia clover votes: 342 </v-col>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import io from 'socket.io-client'
export default {
  data() {
    return {
      socket: io('http://localhost:4000'),
      votedCandidate: '',
      candidates: [],
      hasVoted: null,
    }
  },
  computed: {
    election() {
      return this.$store.getters.getElection
    },
    voted() {
      return this.votedCandidate
    },
    _candidates() {
      return this.candidates
    },
    _hasVoted() {
      return this.$store.getters.getButton
    },
  },
  mounted() {
    this.$store.dispatch('loadSingleElection', this.$route.params.id)
    this.socket.on('electionResult', (data) => {
      this.candidates = data.can
    })
    this.checkVoted()
    this.socket.on('testing', (data) => {
      console.log(data)
    })
    this.socket.on('userVoted', async (data) => {
      const dt = await data
      console.log(dt.hasVoted)
      this.$store.dispatch('hasVoted', dt.hasVoted)
    })
    this.joinRoom()
  },
  methods: {
    checkVoted() {
      console.log('data')
      // this.socket.on('userVoted', (data) => {
      //   console.log(data.hasVoted)
      // })
    },
    joinRoom() {
      this.socket.emit('joinRoom', {
        electionId: this.election.id,
        userId: this.$auth.user._id,
      })
    },
    vote() {
      this.socket.emit('vote', {
        userId: this.$auth.user._id,
        electionId: this.election.id,
        candidateId: this.voted,
      })
      console.log(this.votedCandidate)
    },
    getResult() {
      this.socket.on('updatedElectionResult', (data) => {
        console.log(data)
      })
    },
  },
}
</script>
