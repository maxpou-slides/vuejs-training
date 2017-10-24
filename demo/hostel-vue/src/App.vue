<template>
  <div id="app">
    <h1 class="ui center aligned header">HostelVue</h1>
    <div class="ui two item menu">
      <router-link to="/list" class="item" active-class="active"><i class="grid layout icon"></i> List</router-link>
      <router-link to="/map" class="item" active-class="active"><i class="map icon"></i> Map</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
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
