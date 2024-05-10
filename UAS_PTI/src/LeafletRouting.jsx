import React, { useState, useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';

function userNavigator() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setData(position);
        setLoading(false);
      },
      (error) => {
        console.error(error);
        alert("The direction method can be perfom please Accept Location Permision");
      }
    );
  }, []);

  return { loading, data };
}

const LeafletRouting = (location) => {
  const { loading, data } = userNavigator();
  const map = useMap();
  console.log(location);
 
  useEffect(() => {
    if (!loading && data) {
      const routingControl = L.Routing.control({
        waypoints: [
          L.latLng(data.coords.latitude, data.coords.longitude),
          L.latLng(parseFloat(location.position[0]), parseFloat(location.position[1])),
        ],
        geocoder: L.Control.Geocoder.nominatim(),
        showAlternatives: true,
        reverseWaypoints: true,
        addWaypoints: false,
        routeWhileDragging: true,
      }).addTo(map);
      console.log(routingControl);
      return () => map.removeControl(routingControl);
    }
  }, [loading, data, map]);

  if (loading) return <h2>Tunggu...</h2>;

  return null;
};

export default LeafletRouting;
