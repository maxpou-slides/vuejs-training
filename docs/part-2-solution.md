# Part 2: components - SOLUTION

## Step 1

```js
Vue.component('hostel-list-detail', {
  template: `
    <div class="card" v-show="hostel.isActive">
      <div class="content">
        <div class="right floated meta">{{ hostel.price.amount }}{{ hostel.price.currency }}</div>
        <div class="header">{{ hostel.name }}</div>
      </div>
      <div class="content">
        <div class="meta">
          {{ hostel.location }}
          <i v-if="hostel.bonus.hasFreeWifi" class="wifi icon"></i>
          <i v-if="hostel.bonus.hasFreeBreakfast" class="coffee icon"></i>
          <i v-if="hostel.bonus.hasTv" class="desktop icon"></i>
          <i v-if="hostel.bonus.hasBar" class="bar icon"></i>
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
  `,
  props: ['hostel']
})
```

```html
<div id="app" class="ui container">
  <h1 class="ui center aligned header">HostelVue</h1>
  
  <form class="ui form">
    <div class="field">
      <input type="text" placeholder="filter by name" v-model="userSearch">
    </div>
  </form>
  <br>

  <div class="ui cards">
    <hostel-list-detail 
      v-for="hostel in hostelsShown" 
      :hostel="hostel"
    ></hostel-list-detail>
  </div>

</div>
```

## Step 2

```html
<div id="app" class="ui container">
  <h1 class="ui center aligned header">HostelVue</h1>
  
  <form class="ui form">
    <div class="field">
      <input type="text" placeholder="filter by name" v-model="userSearch">
    </div>
  </form>
  <br>

  <div class="ui cards">
    <hostel-list-detail 
      v-for="hostelShown in hostelsShown"
      v-if="hostelShown.isActive"
      :hostel="hostelShown"
      :like="likedHostels.indexOf(hostelShown) !== -1"
      v-on:like="likeHostel"
    ></hostel-list-detail>
  </div>

</div>
<script>
Vue.component('hostel-list-detail', {
  template: `
    <div class="card">
      <div class="content">
        <div class="right floated meta">
          <i v-bind:class="{ red: like }" class="heart icon" @click="$emit('like', hostel)"></i>
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
  `,
  props: ['hostel', 'like'],
})

  var app = new Vue({
    el: '#app',
    data: {
      userSearch: '',
      likedHostels: [],
      hostels: [ /*... ...*/ ]
    },
    computed: {
      hostelsShown () {
        return this.hostels
          .filter(hostel => hostel.name.toLowerCase().includes(this.userSearch))
      }
    },
    methods: {
      likeHostel (hostel) {
        if (this.likedHostels.indexOf(hostel) === -1) {
          this.likedHostels.push(hostel)
        } else {
          this.likedHostels.splice(this.likedHostels.indexOf(hostel), 1)
        }
      }
    }
  })
  </script>
```

## Step 3

```html
<form class="ui form">
  <div class="inline fields">
    <div class="one wide field">
      <i :class="onlyShowLiked ? 'red' : 'grey'" class="heart icon" @click="toogleLikeFilter" title="Only show liked hostels"></i>
    </div>
    <div class="fifteen wide field">
      <input type="text" placeholder="filter by name" v-model="userSearch">
    </div>
  </div>
</form>
```


```js
  var app = new Vue({
    el: '#app',
    data: {
      onlyShowLiked: false,
      // ...
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
          .filter(hostel => hostel.name.toLowerCase().includes(this.userSearch))
      }
    },
    methods: {
      // ...
      toogleLikeFilter () {
        if (this.onlyShowLiked === false) {
          this.onlyShowLiked = true
        } else {
          this.onlyShowLiked = false
        }
      }
    }
  })
```