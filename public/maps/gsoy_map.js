

require([
      "esri/Map",
      "esri/views/MapView",
      "esri/views/SceneView",
      "esri/layers/CSVLayer"
    ], function(Map, MapView, SceneView, CSVLayer) {

      
       var url = "http://192.168.0.20:3000/maps/data/GSOY.csv";
       var template = {
        title: "Weather Station Info",
        content: "Yearly Change in Average Temperatuer {slope}(F/year) \n Number of data points in regression {setsize}"
       };
       
       var csvLayer = new CSVLayer({
        url: url,
        copyright: "USGS Earthquakes",
        popupTemplate: template,
        elevationInfo: {
          // drapes icons on the surface of the globe
          mode: "on-the-ground"
         }
        });
       csvLayer.renderer = {
        type: "simple", // autocasts as new SimpleRenderer()
        symbol: {
          type: "simple-marker", // autocasts as new PointSymbol3D()
          symbolLayers: [{
            type: "icon", // autocasts as new IconSymbol3DLayer()
            material: {
              color: [238, 69, 0, 0.75]
            },
            outline: {
              width: 0.5,
              color: "white"
            },
            size: "12px"
          }]
        }
      };
      
      
      map = new Map({
        basemap: "topo",
        layers: [csvLayer]
      });
      
      
      view = new MapView({
        map: map,
        container: "viewDiv",
        center: [-123.071730, 44.043538 ],
        zoom: 10
      });
     
});
