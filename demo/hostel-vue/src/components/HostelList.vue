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
