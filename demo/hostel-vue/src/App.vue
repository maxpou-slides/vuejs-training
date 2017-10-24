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
