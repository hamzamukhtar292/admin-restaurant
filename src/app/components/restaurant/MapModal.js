import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import CustomMarker from './CustomMarker'; // Ensure CustomMarker is properly defined
import 'leaflet/dist/leaflet.css';

const MapModal = ({ isOpen, closeModal, position, handleMapClick }) => {
  const [markerPosition, setMarkerPosition] = useState(position);

  const handleMapClickInternal = (event) => {
    const { latlng } = event;
    const newPosition = [latlng.lat, latlng.lng];
    setMarkerPosition(newPosition); // Update marker position
    handleMapClick(newPosition); // Notify parent component
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg w-full">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900">Select Location</h2>
          <div className="mt-2">
            <MapContainer
              center={markerPosition}
              zoom={13}
              scrollWheelZoom={false}
              style={{ height: '400px', width: '100%' }}
              onClick={handleMapClickInternal}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <CustomMarker position={markerPosition} imageUrl="https://path-to-your-image.png" />
            </MapContainer>
          </div>
          <div className="mt-4">
            <button
              type="button"
              className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapModal;
