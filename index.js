require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/widgets/Expand",
], (esriConfig, Map, MapView, FeatureLayer, Expand) => {
  esriConfig.apiKey = "YOUR_API_KEY";

  const map = new Map({
    basemap: "arcgis-topographic", // Basemap layer service
  });

  const view = new MapView({
    map: map,
    center: [-98.4617186, 36.2913438], // longitude, latitude
    zoom: 4, // Zoom level
    container: "viewDiv", // Div element
  });

  // Define a popup for stadiums
  const popupStadiums = {
    title: "Stadium",
    content:
      "<b>Stadium Name:</b> {STADIUM_NAME}<br><b>Team Name:</b> {TEAM_NAME} <br><b>League: </b> {LEAGUE}   <br><b>Capacity:</b> {CAPACITY}",
  };

  // Add content to page
  const stadiums = new FeatureLayer({
    url: "https://services7.arcgis.com/d1JqB9EV9umgKUmS/arcgis/rest/services/stadiuminfo/FeatureServer/0",
    outFields: ["STADIUM_NAME", "TEAM_NAME", "LEAGUE", "CAPACITY"],
    popupTemplate: popupStadiums,
  });

  map.add(stadiums);

  let stadiumLayerView;

  const stadiumsElement = document.getElementById("stadiums-filter");

  // click event handler for league choices
  stadiumsElement.addEventListener("click", filterByLeague);

  // User clicked on AL or NL set an attribute filter on stadiums layer view
  function filterByLeague(event) {
    const selectedLeague = event.target.getAttribute("data-stadium");
    stadiumLayerView.filter = {
      where: "LEAGUE = '" + selectedLeague + "'",
    };
  }

  view.whenLayerView(stadiums).then((layerView) => {
    // stadium layer loaded
    // get a reference to the stadiums layerview
    stadiumLayerView = layerView;

    // set up UI items
    stadiumsElement.style.visibility = "visible";

    const stadiumsExpand = new Expand({
      view: view,
      contents: stadiumsElement,
      expandIcon: "filter",
      group: "top-left",
    });

    //clear the filters when user closes the expand widget
    stadiumsExpand.watch("expanded", () => {
      if (!stadiumsExpand.expanded) {
        stadiumLayerView.filter = null;
      }
    });
    view.ui.add(stadiumsExpand, "top-left");
  });
});
