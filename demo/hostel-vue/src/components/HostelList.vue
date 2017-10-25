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
