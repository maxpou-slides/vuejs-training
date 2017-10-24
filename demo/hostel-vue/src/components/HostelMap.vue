<template>
  <div id="map" class="map ui container">
  </div>
</template>

<script>
/* global ol */
export default {
  mounted () {
    const map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([37.41, 8.82]),
        zoom: 4
      })
    })
  }
}
</script>
<style>
.map {
  height: 400px;
  width: 100%;
}
</style>
