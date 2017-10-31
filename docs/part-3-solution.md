# Part 3: .vue file - SOLUTION

## Step 1

```bash
~/path/to/projects » vue init webpack hostel-vue

? Project name hostel-vue
? Project description A Vue.js project
? Author Maxence POUTORD <maxence.poutord@gmail.com>
? Vue build standalone (Runtime + Compiler: recommended for most users)
? Install vue-router? No
? Use ESLint to lint your code? Yes
? Pick an ESLint preset Standard
? Setup unit tests with Karma + Mocha? No
? Setup e2e tests with Nightwatch? No

   vue-cli · Generated "hostel-vue".

   To get started:

     cd hostel-vue
     npm install
     npm run dev

   Documentation can be found at https://vuejs-templates.github.io/webpack
```

Then:

```bash
cd hostel-vue
npm install
npm run dev
```

## Step 2

### src/App.vue

```html
<template>
  <div id="app">
    <HostelList/>
  </div>
</template>

<script>
import HostelList from './components/HostelList'

export default {
  name: 'app',
  components: {
    HostelList
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

### src/components/HostelList.vue

```html
<template>
  <div class="ui container">
    <h1 class="ui center aligned header">HostelVue</h1>

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
    <br>

    <div class="ui cards">
      <hostel-list-item
        v-for="(hostelShown, index) in hostelsShown" :key="index"
        v-if="hostelShown.isActive"
        :hostel="hostelShown"
        :like="likedHostels.indexOf(hostelShown) !== -1"
        v-on:like="likeHostel"
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
  data () {
    return {
      userSearch: '',
      onlyShowLiked: false,
      likedHostels: [],
      hostels: [
        {
          name: 'Happy Hostel',
          location: 'Berlin',
          price: {
            amount: 12,
            currency: '€'
          },
          description: 'Laboriosam est doloremque et sunt iure. Tenetur fugiat non ut autem repellat qui qui. Tempore pariatur exercitationem tempora. Laborum ut qui sed enim recusandae voluptas voluptas rerum accusantium.',
          bonus: {
            hasFreeWifi: false,
            hasTv: false,
            hasFreeBreakfast: false,
            hasBar: true
          },
          rating: 88,
          availability: true,
          isActive: true
        }, {
          name: 'WunderLand',
          location: 'Dublin',
          price: {
            amount: 24,
            currency: '€'
          },
          description: 'Nulla vero eveniet autem perferendis. Esse est itaque esse assumenda odit enim. Perspiciatis non omnis fugit officia omnis quia distinctio consequatur voluptatem. Necessitatibus ipsa sunt autem ducimus facilis.',
          bonus: {
            hasFreeWifi: true,
            hasTv: true,
            hasFreeBreakfast: false,
            hasBar: true
          },
          rating: 95,
          availability: true,
          isActive: true
        }, {
          name: 'Unknown Hostel',
          location: 'Dublin',
          price: {
            amount: 24,
            currency: '€'
          },
          description: 'Repellat et aliquid sit ab nemo et qui veniam dignissimos. Ducimus explicabo ut. Error expedita commodi. Nihil in est voluptatem molestiae consequatur rerum ex.',
          bonus: {
            hasFreeWifi: true,
            hasTv: false,
            hasFreeBreakfast: false,
            hasBar: true
          },
          rating: 77,
          availability: true,
          isActive: false
        }, {
          name: 'Medium Hostel',
          location: 'Berlin',
          price: {
            amount: 5,
            currency: '€'
          },
          description: 'Aliquid id ad optio dignissimos modi.',
          bonus: {
            hasFreeWifi: false,
            hasTv: true,
            hasFreeBreakfast: false,
            hasBar: false
          },
          rating: 54,
          availability: true,
          isActive: true
        }
      ]
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

```

### src/components/HostelListItem.vue

```html
<template>
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
</template>

<script>
export default {
  props: ['hostel', 'like']
}
</script>
```