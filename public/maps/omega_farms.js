

require([
      "esri/Map",
      "esri/views/MapView",
      "esri/views/SceneView",
      "esri/layers/WebTileLayer",
      "esri/widgets/LayerList",
      "esri/support/ContentElement/Text"
    ], function(Map, MapView, SceneView, WebTileLayer, LayerList, TextContentElement) {
      
      //Make a new map with a topographic basemap
      map = new Map({
        layers: []
      });
      
      //Add the map to the Mapview for 2D rendering
      view = new MapView({
        map: map,
        container: "viewDiv",
        center: [-123.071730, 44.043538 ],
        zoom: 12
      });
      
      //Load our omega raster Webtiles
      var omegaLayer = new WebTileLayer({
        urlTemplate: "https://russloewe.com/maps/data/omega_farms/{level}/{col}/{row}.png",
        tms: true,
        copyright: "me"
      });
      
      //Add a title of the layer for the Layer List
      ndviLayer.title = "NDVI";
      
      //add the Webtile layer to the map
      map.add(omegaLayer);
      
      document.getElementById('title').innerHTML = "Eugene NDVI";
});
