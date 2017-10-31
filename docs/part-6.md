# Part 6: State management with Vuex

## Step 1: Setting up Vuex

1. First let's install the required dependency
  ```bash
  npm i vuex
  ```

2. Create an emtpy store
  ```js
// src/store/index.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  strict: debug
})

export default store
  ```

3. Rely the main Vue App with the store
  ```js
// src/main.js
import store from './store'
// ...

new Vue({
  // ...
  store,
})
  ```

Restart your application (`npm run dev`) and open the DevTools > Vuex tab. The message *No Vuex store detected.* should desapear. You should now see an empty state.

## Step 2: Define your first module

The very first step is to create an empty module dedicated to the hostel listing.

```js
import * as types from '../mutation-types'

// initial state
const state = {
}

// getters
const getters = {
}

// actions
const actions = {
}

// mutations
const mutations = {
}

export default {
  state,
  getters,
  actions,
  mutations
}
```

also create an empty file `mutation-types.js`. Then add this module in the global state:

```js
const store = new Vuex.Store({
  strict: debug,
  modules: {
    hostelList
  }
})
```

### Vuex: initial state

The first question you need to ask to yourself is: "Which data need to be shared accross multiples components".

* `hostels`? Well, HostelList and HostelMap components only use **hostelsShown**. But hostelsShown is a computed property based on hostels. That's why we need it. For the same reason `userSearch`, `onlyShowLiked` and `likedHostels` are also needed.
* `map`/`markers`? No. Theses data are only for HostelMap component. As it stand, HostelList or whatever else compoenent doesn't need this data.

```js
const state = {
  hostels: [],
  userSearch: '',
  onlyShowLiked: false,
  likedHostels: []
}
```

### Vuex: getters

The first obvious getter is `hostelsShown`. Cut&Paste this function into the getter part.
We can also create an `isLikedHostel()` getter for `HostelListItem` component.

```js
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
```

### Vuex: mutations

First of all, we need to guess every operation that can change our components.
Once we got them, put everything in the `mutation-type.js`.

> It is a commonly seen pattern to use constants for mutation types in various Flux implementations. This allows the code to take advantage of tooling like linters, and putting all constants in a single file allows your collaborators to get an at-a-glance view of what mutations are possible in the entire application.

```js
export const RECEIVE_HOSTELS = 'RECEIVE_HOSTELS'
export const TOGGLE_LIKE_HOSTEL = 'TOGGLE_LIKE_HOSTEL'
export const TEXT_FILTER_CHANGE = 'TEXT_FILTER_CHANGE'
export const LIKE_FILTER_CHANGE = 'LIKE_FILTER_CHANGE'
```

```js
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
```

...what bout load hostel method?
This operation is asynchronous. That why, it should be on the actions part!

### Vuex: actions

```js
const actions = {
  loadHostels ({ commit }) {
    hostelApi.getAll().then(data => {
      commit(types.RECEIVE_HOSTELS, { data })
    })
  }
}
```

## Step 3: Map the store to the components

Now component should only focus on the view part. Let's map Vue components with the Vuex store using the `mapState`, `mapGetters`, `mapMutations` and `mapActions` methods.

