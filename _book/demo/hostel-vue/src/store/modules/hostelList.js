import * as types from '../mutation-types'
import * as hostelApi from '../../api/hostels'

// initial state
const state = {
  hostels: [],
  userSearch: '',
  onlyShowLiked: false,
  likedHostels: []
}

// getters
const getters = {
  hostelsShown: (state) => {
    const likeFilter = (hostel) => {
      if (state.onlyShowLiked) {
        return state.likedHostels.indexOf(hostel) !== -1
      }
      return true
    }

    return state.hostels
      .filter(likeFilter)
      .filter(hostel => hostel.name.toLowerCase().includes(state.userSearch.toLowerCase()))
  },
  isLikedHostel: (state) => (hostel) => {
    return state.likedHostels.indexOf(hostel) !== -1
  }
}

// actions
const actions = {
  loadHostels ({ commit }) {
    hostelApi.getAll().then(data => {
      commit(types.RECEIVE_HOSTELS, { data })
    })
  }
}

// mutations
const mutations = {
  [types.RECEIVE_HOSTELS] (state, { data }) {
    state.hostels = data
  },
  [types.TOGGLE_LIKE_HOSTEL] (state, hostel) {
    if (state.likedHostels.indexOf(hostel) === -1) {
      state.likedHostels.push(hostel)
    } else {
      state.likedHostels.splice(state.likedHostels.indexOf(hostel), 1)
    }
  },
  [types.LIKE_FILTER_CHANGE] (state) {
    if (state.onlyShowLiked === false) {
      state.onlyShowLiked = true
    } else {
      state.onlyShowLiked = false
    }
  },
  [types.TEXT_FILTER_CHANGE] (state, newSearch) {
    state.userSearch = newSearch
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
