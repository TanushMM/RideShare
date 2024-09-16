import React from 'react';
import Header from './Layout/Header';
import { useLocation } from 'react-router-dom';

const RideDetailsPage = () => {
    const location = useLocation();
    const { ride } = location.state || {};  // Get the ride data from location.state

    return (
        <div>
            <Header />
            <div style={{ padding: '20px' }}>
                <h1>Ride Details</h1>
                {ride ? (
                    <>
                        <p><strong>Driver Name:</strong> {ride.email}</p>
                        <p><strong>Seats Available:</strong> {ride.seats}</p>
                        <p><strong>Pickup Location:</strong> {ride.from.location}</p>
                        <p><strong>Dropoff Location:</strong> {ride.to.location}</p>
                        <p><strong>Driving Style:</strong> {ride.drivingStyle}</p>
                        <p><strong>Date:</strong> {ride.date}</p>
                        <p><strong>Time:</strong> {ride.time}</p>
                    </>
                ) : (
                    <p>No ride details available.</p>
                )}
            </div>
        </div>
    );
};

export default RideDetailsPage;
