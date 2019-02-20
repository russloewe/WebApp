

require([
      "esri/Map",
      "esri/views/MapView",
      "esri/views/SceneView",
      "esri/layers/WebTileLayer"
    ], function(Map, MapView, SceneView, WebTileLayer) {
      
      //Make a new map with a topographic basemap
      map = new Map({
        basemap: "topo",
        layers: []
      });
      
      //Add the map to the Mapview for 2D rendering
      view = new MapView({
        map: map,
        container: "viewDiv",
        center: [-123.071730, 44.043538 ],
        zoom: 10
      });
      
      //Load our ndvi raster Webtiles
      var tiledLayer = new WebTileLayer({
        urlTemplate: "http://192.168.0.24:3000/maps/data/eug_ndvi/{level}/{col}/{row}.png",
        tms: true,
        copyright: "me"
      });
      
      //add the Webtile layer to the map
      map.add(tiledLayer);


});
