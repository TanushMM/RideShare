import React from 'react';
import Header from './Layout/Header'; // Assuming you have a Header component

const RideDetailsPage = ({ ride }) => {
    return (
        <div>
            <Header />
            <div style={{ padding: '20px' }}>
                <h1>Ride Details</h1>
                <p><strong>Driver Name:</strong> {ride?.driverName || 'John Doe'}</p>
                <p><strong>Car Type:</strong> {ride?.carType || 'Sedan'}</p>
                <p><strong>Seats Available:</strong> {ride?.seatsAvailable || 3}</p>
                <p><strong>Pickup Location:</strong> {ride?.pickupLocation || '123 Main St'}</p>
                <p><strong>Dropoff Location:</strong> {ride?.dropoffLocation || '456 Elm St'}</p>
                <p><strong>Estimated Time:</strong> {ride?.estimatedTime || '15 mins'}</p>
            </div>
        </div>
    );
};

export default RideDetailsPage;
