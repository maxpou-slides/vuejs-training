# Part 6: State management with Vuex - SOLUTION

Nothing specific here. Just follow the instructions.

## Step 1&2

Nothing specific here. Just follow the instructions.

```js
// src/store/modules/hostelList.js
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
```


## Step 3

### App.vue

```html
<template>
  <div id="app">
    <h1 class="ui center aligned header">HostelVue</h1>

    <div class="ui container">
      <div class="ui fluid menu">
        <router-link to="/list" class="item" active-class="active"><i class="grid layout icon"></i> List</router-link>
        <router-link to="/map" class="item" active-class="active"><i class="map icon"></i> Map</router-link>
        <div class="item">
          <i :class="onlyShowLiked ? 'red' : 'grey'" class="heart icon" @click="LIKE_FILTER_CHANGE" title="Only show liked hostels"></i>
        </div>
        <div class="item">
          <div class="ui transparent icon input">
            <input type="text" placeholder="Filter..." :value="userSearch" @input="updateSearchFilter">
            <i class="search link icon"></i>
          </div>
        </div>
      </div>
    </div>
    <br>

    <router-view/>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'app',
  computed: {
    ...mapState({
      userSearch: state => state.hostelList.userSearch,
      onlyShowLiked: state => state.hostelList.onlyShowLiked
    })
  },
  methods: {
    ...mapMutations([
      'LIKE_FILTER_CHANGE',
      'TEXT_FILTER_CHANGE'
    ]),
    ...mapActions([
      'loadHostels'
    ]),
    updateSearchFilter (e) {
      this.TEXT_FILTER_CHANGE(e.target.value)
    }
  },
  mounted () {
    this.loadHostels()
  }
}
</script>
```

### HostelList.vue

```html
<template>
  <div class="ui container">

    <div class="ui centered cards">
      <hostel-list-item
        v-for="(hostel, index) in hostels" :key="index"
        v-if="hostel.isActive"
        :hostel="hostel"
      ></hostel-list-item>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import HostelListItem from './HostelListItem'

export default {
  components: {
    HostelListItem
  },
  computed: {
    ...mapGetters({
      hostels: 'hostelsShown'
    })
  }
}
</script>
```

### HostelListItem.vue

```html
<template>
  <div class="card">
    <div class="content">
      <div class="right floated meta">
        <i v-bind:class="{ red: isLikedHostel(hostel) }" class="heart icon" @click="TOGGLE_LIKE_HOSTEL(hostel)"></i>
      </div>
      <div class="header">{{ hostel.name }}</div>
      </div>
      <div class="content">
        <div class="meta">
          {{ hostel.location }}
          <i v-if="hostel.bonus.hasFreeWifi" class="wifi icon"></i>
          <i v-if="hostel.bonus.hasFreeBreakfast" class="coffee icon"></i>
          <i v-if="hostel.bonus.hasTv" class="desktop icon"></i>
          <i v-if="hostel.bonus.hasBar" class="bar icon"></i>
          <div class="right floated meta">
              {{ hostel.price.amount }}{{ hostel.price.currency }}/night
            </div>
        </div>
        <div class="description">
            {{ hostel.description }}
        </div>
      </div>
      <div v-if="hostel.availability" class="ui orange bottom attached button">
        Book now
      </div>
      <div v-else class="ui bottom attached disabled button">
        Too late!
      </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  props: ['hostel'],
  computed: {
    ...mapGetters([
      'isLikedHostel'
    ])
  },
  methods: {
    ...mapMutations([
      'TOGGLE_LIKE_HOSTEL'
    ])
  }
}
</script>
```

### HostelMap.vue

```html
<template>
  <div id="map" class="map ui container">
  </div>
</template>

<script>
/* global google */
/* eslint no-new: "off" */
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      map: {},
      markers: []
    }
  },
  computed: {
    ...mapGetters({
      hostels: 'hostelsShown'
    })
  },
  // ...
}
</script>
```