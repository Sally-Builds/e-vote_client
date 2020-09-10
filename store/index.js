import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const createStore = () => {
  return new Vuex.Store({
    state: {
      elections: [],
      username: '',
      room: '',
      singleElection: null,
      auctionProduct: null,
      button: null,
    },
    getters: {
      getAllElections(state) {
        return state.elections
      },
      getElection(state) {
        return state.singleElection
      },
      getButton(state) {
        return state.button
      },
    },
    mutations: {
      setElections(state, payload) {
        state.elections = payload
      },
      setSingleElection(state, payload) {
        const election = state.elections.find((el) => el.id === payload)
        state.singleElection = election
      },
      loadSingleElection(state, payload) {
        const election = state.elections.find((el) => el.slug === payload)
        state.singleElection = election
      },
      hasVoted(state, payload) {
        console.log('payload')
        console.log(payload)
        state.button = payload
      },
    },
    actions: {
      async nuxtServerInit({ commit }) {
        try {
          const result = await axios.get(
            'http://localhost:4000/api/v1/elections'
          )
          commit('setElections', result.data.data)
        } catch (e) {
          console.log(e)
        }
      },
      singleElection({ commit }, payload) {
        commit('setSingleElection', payload)
      },
      loadSingleElection({ commit }, payload) {
        commit('loadSingleElection', payload)
      },
      hasVoted({ commit }, payload) {
        commit('hasVoted', payload)
      },
    },
  })
}

export default createStore
