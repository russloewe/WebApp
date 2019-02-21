

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
      
      //Load our ndvi raster Webtiles
      var ndviLayer = new WebTileLayer({
        urlTemplate: "https://russloewe.com/maps/data/eug_ndvi/{level}/{col}/{row}.png",
        tms: true,
        copyright: "me"
      });
      
      //Add a title of the layer for the Layer List
      ndviLayer.title = "NDVI";
      
      //add the Webtile layer to the map
      map.add(ndviLayer);
      
        //Load our road raster Webtiles
      var roadLayer = new WebTileLayer({
        urlTemplate: "https://russloewe.com/maps/data/eug_roads/{level}/{col}/{row}.png",
        tms: true,
        copyright: "me"
      });
      roadLayer.title = "Roads";
      map.add(roadLayer);
      
            //Load our water raster Webtiles
      var waterLayer = new WebTileLayer({
        urlTemplate: "https://russloewe.com/maps/data/eug_water/{level}/{col}/{row}.png",
        tms: true,
        copyright: "me"
      });
      waterLayer.title = "Water";
      map.add(waterLayer);
      
            //Load our place raster Webtiles
      var placesLayer = new WebTileLayer({
        urlTemplate: "https://russloewe.com/maps/data/eug_places/{level}/{col}/{row}.png",
        tms: true,
        copyright: "me"
        });
        placesLayer.title = "Places";
      map.add(placesLayer);
      
      //Make a Layer List and add it to the top left of the map view
      var layerList = new LayerList({
         view: view
      });
      view.ui.add(layerList, {
         position: "bottom-left"
      });
      
      document.getElementById('title').innerHTML = "Eugene NDVI";
});
