<template>
  <div id="app">
    <h1 class="ui center aligned header">HostelVue</h1>

    <div class="ui container">
      <div class="ui fluid menu">
        <router-link to="/list" class="item" active-class="active"><i class="grid layout icon"></i> List</router-link>
        <router-link to="/map" class="item" active-class="active"><i class="map icon"></i> Map</router-link>
        <div class="item">
          <i :class="onlyShowLiked ? 'red' : 'grey'" class="heart icon" @click="LIKE_FILTER_CHANGE" title="Only show liked hostels"></i>
        </div>
        <div class="item">
          <div class="ui transparent icon input">
            <input type="text" placeholder="Filter..." :value="userSearch" @input="updateSearchFilter">
            <i class="search link icon"></i>
          </div>
        </div>
      </div>
    </div>
    <br>

    <router-view/>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'app',
  computed: {
    ...mapState({
      userSearch: state => state.hostelList.userSearch,
      onlyShowLiked: state => state.hostelList.onlyShowLiked
    })
  },
  methods: {
    ...mapMutations([
      'LIKE_FILTER_CHANGE',
      'TEXT_FILTER_CHANGE'
    ]),
    ...mapActions([
      'loadHostels'
    ]),
    updateSearchFilter (e) {
      this.TEXT_FILTER_CHANGE(e.target.value)
    }
  },
  mounted () {
    this.loadHostels()
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
