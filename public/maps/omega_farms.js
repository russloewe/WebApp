

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
        basemap: "topo",
        layers: []
      });
      
      //Add the map to the Mapview for 2D rendering
      view = new MapView({
        map: map,
        container: "viewDiv",
        center: [-123.504983, 44.122751 ],
        zoom: 8
      });
      
      //Load our omega raster Webtiles
      var omegaLayer = new WebTileLayer({
        urlTemplate: "https://russloewe.com/maps/data/omega_farms/{level}/{col}/{row}.png",
        tms: true,
        copyright: "Russell Loewe"
      });
      
      //Add a title of the layer for the Layer List
      omegaLayer.title = "Drive Distance";
      
      //add the Webtile layer to the map
      map.add(omegaLayer);
      var legend = new Legend({
          view: view,
          layerInfos: [{
            layer: featureLayer,
            title: "Legend"
          }]
      });
      
      view.ui.add(legend, "bottom-right");

});
