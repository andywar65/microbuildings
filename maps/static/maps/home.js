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
    },
  methods: {
    setupLeafletMap: function () {

      const base_map = L.tileLayer(this.url, {
        attribution: this.copy,
        maxZoom: 23,
      }).addTo(this.map)

      const baseMaps = {
        "Base": base_map,
      }

      const test_layer = L.layerGroup().addTo(this.map)

      this.overlayMaps["Test layer"] = test_layer

      L.control.layers(baseMaps, this.overlayMaps).addTo(this.map)

    },
    loadBuilding : async function (cat_id) {
      let response = await fetch(`/api/build-by-cat/` + cat_id)
      let geojson = await response.json()
      return geojson
    },
    BuildingPointToLayer : function (feature, latlng) {
      return L.marker(latlng, )
    },
    onEachBuildingFeature : function (feature, layer) {
      let content = "<h5>" + feature.properties.name + "</h5>"
      layer.bindPopup(content, )
    },
    renderBuilding : async function (cat_id, layergroup) {
      let buildgeo = await this.loadBuilding(cat_id)
      markers = L.geoJSON(buildgeo,
        { pointToLayer: this.BuildingPointToLayer,
          onEachFeature: this.onEachBuildingFeature })
      markers.addTo(layergroup)
    },
    setOverlayCollection : function (cat) {
      this.overlayMaps[cat.name] = L.layerGroup()
      if (cat.visible) {
        this.overlayMaps[cat.name].addTo(this.map)
      }
      this.renderBuilding(cat.id, this.overlayMaps[cat.name])
    },
    getCategories : async function () {
      let jsoncat = await fetch(`/api/categories/`)
      let categories = await jsoncat.json()
      categories.forEach(this.setOverlayCollection)
    },
  },
  mounted() {
    this.map = L.map('mapid', {center: this.center, zoom : this.zoom})
    this.getCategories()
    this.setupLeafletMap()
  }
})
