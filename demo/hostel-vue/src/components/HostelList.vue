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
