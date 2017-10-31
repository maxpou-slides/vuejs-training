import Vue from 'vue'
import Vuex from 'vuex'
import hostelList from './modules/hostelList'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  strict: debug,
  modules: {
    hostelList
  }
})

export default store
