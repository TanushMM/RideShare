import React from 'react';
import Header from './Layout/Header';
import { useLocation } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';  // Ensure you have @react-google-maps/api installed

const containerStyle = {
  width: '100%',
  height: '100%',
};

const RideDetailsPage = () => {
    const location = useLocation();
    const { selectedRide } = location.state || {};  
    
    if (!selectedRide) {
        return (
            <div>
                <Header />
                <div style={{ padding: '20px' }}>
                    <h1>Ride Details</h1>
                    <p>No ride details available.</p>
                </div>
            </div>
        );
    }

    const mapOptions = {
        zoom: 12,
        center: {
          lat: (selectedRide.from.coordinates.lat + selectedRide.to.coordinates.lat) / 2,
          lng: (selectedRide.from.coordinates.lng + selectedRide.to.coordinates.lng) / 2,
        },
    };

    return (
        <div style={{ display: 'flex' }}>
            {/* Left Section for Ride Details */}
            <div style={{ flex: 1, padding: '20px' }}>
                <Header />
                <h1>Ride Details</h1>
                <p><strong>Driver Name:</strong> {selectedRide.email}</p>
                <p><strong>Seats Available:</strong> {selectedRide.seats}</p>
                <p><strong>Pickup Location:</strong> {selectedRide.from.location}</p>
                <p><strong>Dropoff Location:</strong> {selectedRide.to.location}</p>
                <p><strong>Driving Style:</strong> {selectedRide.drivingStyle}</p>
                <p><strong>Date:</strong> {selectedRide.date}</p>
                <p><strong>Time:</strong> {selectedRide.time}</p>
            </div>

            {/* Right Section for Map */}
            <div style={{ flex: 1 }}>
                <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={mapOptions.center}
                        zoom={mapOptions.zoom}
                    >
                        <Marker position={selectedRide.from.coordinates} label="Pickup" />
                        <Marker position={selectedRide.to.coordinates} label="Dropoff" />
                    </GoogleMap>
                </LoadScript>
            </div>
        </div>
    );
};

export default RideDetailsPage;
