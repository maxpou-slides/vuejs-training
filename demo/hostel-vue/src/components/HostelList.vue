<template>
  <div class="ui container">

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
import * as hostelApi from '../api/hostels'

export default {
  components: {
    HostelListItem
  },
  data () {
    return {
      userSearch: '',
      onlyShowLiked: false,
      likedHostels: [],
      hostels: []
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
  },
  created () {
    hostelApi.getAll().then(data => {
      this.hostels = data
    })
  }
}
</script>
