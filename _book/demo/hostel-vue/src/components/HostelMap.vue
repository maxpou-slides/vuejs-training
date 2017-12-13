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
