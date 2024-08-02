// pages/create-restaurant.tsx
// @ts-nocheck
"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDropzone } from 'react-dropzone';
import dynamic from 'next/dynamic';
import { LatLngExpression } from 'leaflet';
const MapModal = dynamic(() => import('../components/restaurant/MapModal'), { ssr: false });

const CreateRestaurant: React.FC = () => {
  const router = useRouter();
  const [restaurant, setRestaurant] = useState({
    name: '',
    location: '',
    description: '',
    images: [] as File[],
  });
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [mapPosition, setMapPosition] = useState<LatLngExpression>([51.505, -0.09]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRestaurant({ ...restaurant, [e.target.name]: e.target.value });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.gif'],
    },
    multiple: false,
    onDrop: (acceptedFiles: File[]) => {
      setRestaurant({ ...restaurant, images: acceptedFiles });
    },
  });

  const handleDeleteImage = () => {
    setRestaurant({ ...restaurant, images: [] });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Call API to create restaurant
    console.log(restaurant);
    router.push('/dashboard');
  };

  const openMap = () => {
    setIsMapOpen(true);
  };

  const closeMap = () => {
    setIsMapOpen(false);
  };

  const handleMapClick = (e: any) => {
    const { lat, lng } = e.latlng;
    setMapPosition([lat, lng]);
    setRestaurant({ ...restaurant, location: `${lat}, ${lng}` });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-yellow-100 via-red-100 to-yellow-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
      <div className="flex flex-col items-center h-screen p-4">
        <h1 className="text-3xl font-bold mb-8">Create Restaurant</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Restaurant Name</label>
            <input
              type="text"
              name="name"
              value={restaurant.name}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={restaurant.location}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <button type="button" onClick={openMap} className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Select on Map
            </button>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
            <textarea
              name="description"
              value={restaurant.description}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Image</label>
            <div {...getRootProps()} className="flex flex-col items-center border border-dashed border-gray-300 p-4">
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the file here ...</p>
              ) : restaurant.images.length === 0 ? (
                <p>Drag and drop file here or click to upload</p>
              ) : null}
              {restaurant.images.length > 0 && (
                <div className="relative m-2">
                  <img
                    src={URL.createObjectURL(restaurant.images[0])}
                    alt="Uploaded Image"
                    className="w-32 h-32 object-cover"
                  />
                  <button
                    type="button"
                    onClick={handleDeleteImage}
                    className="absolute top-0 right-0 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  >
                    X
                  </button>
                </div>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create Restaurant
          </button>
        </form>
        <MapModal
          isOpen={isMapOpen}
          closeModal={closeMap}
          position={mapPosition}
          handleMapClick={handleMapClick}
        />
      </div>
    </div>
  );
};

export default CreateRestaurant;
