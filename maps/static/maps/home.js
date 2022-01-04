let app = new Vue({
  delimiters: ["[[", "]]"],
  el: '#vue-app',
  data : {
      map : Object,
      buildLayerGroup : Object,
      copy : '© <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
      url : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      activePlans : [],
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

      L.control.layers(baseMaps, this.overlayMaps).addTo(this.map)

    },
    loadBuilding : async function () {
      let response = await fetch(`/build-api/` + this.map_data.id )
      let geojson = await response.json()
      return geojson
    },
    buildingPointToLayer : function (feature, latlng) {
      return L.marker(latlng, {icon: this.buildMarker})
    },
    onEachBuildingFeature : function (feature, layer) {
      let content = "<h5>" +
        feature.properties.title +
        "</h5><img src=\"" + feature.properties.image_path + "\"><br><small>" +
        feature.properties.intro + "</small>"
      layer.bindPopup(content, {minWidth: 300})
    },
    renderBuilding : async function () {
      this.buildLayerGroup.clearLayers()
      let buildgeo = await this.loadBuilding()
      markers = L.geoJSON(buildgeo,
        { pointToLayer: this.buildingPointToLayer,
          onEachFeature: this.onEachBuildingFeature })
      markers.addTo(this.buildLayerGroup)
      try {
        this.map.setView([buildgeo.geometry.coordinates[1],
          buildgeo.geometry.coordinates[0]],
          buildgeo.properties.zoom)
      }
      catch {
        this.map.locate()
          .on('locationfound', e => this.map.setView(e.latlng, 10))
          .on('locationerror', () => this.setCityView())
      }
    },
    setPlanCollection : function (plan) {
      this.overlayMaps[plan.title] = L.layerGroup()
      if (plan.visible) {
        this.overlayMaps[plan.title].addTo(this.map)
      }
      this.activePlans.push(plan)
      this.renderDxf(plan.id, this.overlayMaps[plan.title])
      this.renderStation(plan.id, this.overlayMaps[plan.title])
    },
    getCategories : async function () {
      let jsonset = await fetch(`/api/categories/`)
      let planset = await jsonset.json()
      let plans = planset.plans
      plans.forEach(this.setPlanCollection)
    },
  },
  mounted() {
    this.map = L.map('mapid')
    this.getCategories()
    this.setupLeafletMap()
  }
})
