Vue.component('l-map', window.Vue2Leaflet.LMap)

Vue.component('l-control-layers', window.Vue2Leaflet.LControlLayers)

Vue.component('l-tile-layer', window.Vue2Leaflet.LTileLayer)

Vue.component('l-layer-group', window.Vue2Leaflet.LLayerGroup)

Vue.component('l-marker', window.Vue2Leaflet.LMarker)

Vue.component('l-popup', window.Vue2Leaflet.LPopup)

let app = new Vue({
  delimiters: ["[[", "]]"],
  el: '#vue-app',
  data : {
      map : Object,
      center : [ 41.8902, 12.4923 ],
      zoom : 13,
      copy : '© <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
      url : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      overlayMaps : {},
      categories : [],
    },
  methods: {
    getCategories : async function () {
      let jsoncat = await fetch(`/api/categories/`)
      this.categories = await jsoncat.json()
    },
  },
  mounted() {
    this.getCategories()
  }
})
