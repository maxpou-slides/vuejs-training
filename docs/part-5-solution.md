# Part 5: Routing - SOLUTION

## Step 1

Nothing specific here. Just follow the instructions.

## Step 2

Nothing specific here. Just follow the instructions.

```js
// router/index.js
import Vue from 'vue'
import Router from 'vue-router'
import HostelList from '@/components/HostelList'
import HostelMap from '@/components/HostelMap'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/list'
    }, {
      path: '/list',
      name: 'List',
      component: HostelList
    }, {
      path: '/map',
      name: 'Map',
      component: HostelMap
    }
  ]
})
```

## Step 3

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
          <i :class="onlyShowLiked ? 'red' : 'grey'" class="heart icon" @click="toogleLikeFilter" title="Only show liked hostels"></i>
        </div>
        <div class="item">
          <div class="ui transparent icon input">
            <input type="text" placeholder="Filter..." v-model="userSearch">
            <i class="search link icon"></i>
          </div>
        </div>
      </div>
    </div>
    <br>

    <router-view :hostels="hostelsShown" :likedHostels="likedHostels" v-on:like="likeHostel"/>
  </div>
</template>

<script>
import * as hostelApi from './api/hostels'

export default {
  name: 'app',
  data () {
    return {
      hostels: [],
      userSearch: '',
      onlyShowLiked: false,
      likedHostels: []
    }
  },
  computed: {
    hostelsShown () {
      const likeFilter = (hostel) => {
        if (this.onlyShowLiked) {
          return this.likedHostels.indexOf(hostel) !== -1
        }
        return true
      }

      return this.hostels
        .filter(likeFilter)
        .filter(hostel => hostel.name.toLowerCase().includes(this.userSearch.toLowerCase()))
    }
  },
  created () {
    hostelApi.getAll().then(data => {
      this.hostels = data
    })
  },
  methods: {
    likeHostel (hostel) {
      if (this.likedHostels.indexOf(hostel) === -1) {
        this.likedHostels.push(hostel)
      } else {
        this.likedHostels.splice(this.likedHostels.indexOf(hostel), 1)
      }
    },
    toogleLikeFilter () {
      if (this.onlyShowLiked === false) {
        this.onlyShowLiked = true
      } else {
        this.onlyShowLiked = false
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 20px;
}

i.heart.icon {
  cursor: pointer;
}

i.heart.icon:hover {
  color: #E16D6D;
}
</style>
```

### HostelList.vue

```html
<template>
  <div class="ui container">

    <div class="ui centered cards">
      <hostel-list-item
        v-for="(hostelShown, index) in hostels" :key="index"
        v-if="hostelShown.isActive"
        :hostel="hostelShown"
        :like="likedHostels.indexOf(hostelShown) !== -1"
        v-on:like="$emit('like', hostelShown)"
      ></hostel-list-item>
    </div>

  </div>
</template>

<script>
import HostelListItem from './HostelListItem'

export default {
  components: {
    HostelListItem
  },
  props: ['hostels', 'likedHostels']
}
</script>
```
