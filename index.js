require(["esri/config", "esri/Map", "esri/views/MapView"], function (
  esriConfig,
  Map,
  MapView
) {
  esriConfig.apiKey =
    "AAPK778ec86934b24728b5bd8cc71f498c14Fu0clJXq8GxgPaq7qs3RbIkZW-sjP92-xqScGRf7okwNdkdpwQPYRcFhKBaS_lPr";

  const map = new Map({
    basemap: "arcgis-topographic", // Basemap layer service
  });

  const view = new MapView({
    map: map,
    center: [-111.7851365091591, 43.821007174079504], // Longitude, latitude
    zoom: 5, // Zoom level
    container: "viewDiv", // Div element
  });
});
