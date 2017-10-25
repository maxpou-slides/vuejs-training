# Part 5: Routing

Our final goal is to create something like this:

![](../resources/workshop-5.png)

## Step 1: setup routing

You can install vue-router like the following:

  ```bash
  npm install vue-router
  ```

Then let's configure our first route:

```js
// router/index.js
import Vue from 'vue'
import Router from 'vue-router'
import HostelList from '@/components/HostelList'

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
    }
  ]
})
```

In the main.js, add the router to the Vue instance:

```js
// main.js
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
```


## Step 2: create a new representation of hostels

We now want to see where the hostels are on the map.

The global overview should look like this:

![](../resources/workshop-5-1.png)

We're going to use Google Map API.

1. Add this script at the end of index.html
  ```html
  <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCtvfPKi-BxCcfl6drliPs-grwK2CSa_iU"></script>
  ```
2. Create a new component : `HostelMap.vue`
  ```html
<template>
  <div id="map" class="map ui container">
  </div>
</template>

<script>
/* global google */
/* eslint no-new: "off" */
export default {
  props: ['hostels'],
  data () {
    return {
      map: {},
      markers: []
    }
  },
  methods: {
    createMarker (hostel) {
      return new google.maps.Marker({
        position: {
          lat: hostel.coords.lat,
          lng: hostel.coords.lon
        },
        map: this.map,
        label: hostel.name,
        data: hostel
      })
    }
  },
  watch: {
    hostels () {
      this.markers.forEach(marker => {
        marker.setMap(null)
      })
      this.hostels.forEach(hostel => {
        const marker = this.markers.find(m => m.data === hostel)
        if (typeof marker === 'undefined') {
          this.markers.push(this.createMarker(hostel))
        } else {
          marker.setMap(this.map)
        }
      })
    }
  },
  mounted () {
    const DUBLIN = {
      lat: 53.34,
      lng: -6.26
    }
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: DUBLIN
    })
    this.hostels.forEach((hostel) => {
      this.markers.push(this.createMarker(hostel))
    })
  }
}
</script>
<style scoped>
.map {
  height: 600px;
}
</style>
  ```
3. Add one new route
4. Adapt the templates
  ```html
  <!-- how to render the menu -->
  <div class="ui two item menu">
    <router-link to="/list" class="item" active-class="active"><i class="grid layout icon"></i> List</router-link>
    <router-link to="/map" class="item" active-class="active"><i class="map icon"></i> Map</router-link>
  </div>
  <!-- don't forget to pass a property hostel to subcomponents -->
  <router-view :hostels="hostels">
  ```



## Step 3: move filters on top

We now want to move the filter from `HostelList.vue` to his parent (`App.vue`). 
So, `HostelMap.vue` can share the user filter (there is nothing to do on this file!).

The global overview should look like this:

![](../resources/workshop-5-2.png)


==> todo give template of the menu


## Did you see?

More intermediate components we add, more it's complicated to pass properties/events. 

![](../resources/workshop-5-3.png)

> we should better manage the **global state**