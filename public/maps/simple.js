

require([
      "esri/Map",
      "esri/views/SceneView",
      "dojo/domReady!"
    ], function(Map, SceneView, Search, CSVLayer) {
      console.log("making map");
      map = new Map({
        basemap: "dark-gray"
      });
      console.log("making scene");
      view = new SceneView({
        map: map,
        container: "viewDiv",
        center: [-123.071730, 44.043538 ],
        zoom: 16
      });
     
});
