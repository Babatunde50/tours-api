/* eslint-disable */

export const displayMap = locations => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiYmFiYXR1bmRlNTAiLCJhIjoiY2pyYmIwMWJmMHh3ODRhb2NkaGZyMGhmbSJ9.LFsfiAUa3iZY_6hK7g7-fw';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/babatunde50/ck4lqfkkj34oq1csdz9udkxv9',
    scrollZoom: false
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach(loc => {
    const el = document.createElement('div');
    el.className = 'marker';

    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom'
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    new mapboxgl.Popup({
      offset: 30
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description} </p>`)
      .addTo(map);

    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 200,
      left: 100,
      right: 100
    }
  });
};
