import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const CustomMarker = ({ position, imageUrl }) => {
  const icon = L.icon({
    iconUrl: imageUrl || 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconAnchor: [12, 41],
    popupAnchor: [0, -41],
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    shadowSize: [41, 41],
  });

  return (
    <Marker position={position} icon={icon}>
      <Popup>Your location</Popup>
    </Marker>
  );
};

export default CustomMarker;
