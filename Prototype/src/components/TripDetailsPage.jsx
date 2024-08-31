import React from 'react';
import Header from './Layout/Header';

const TripDetailsPage = () => {
    return (
        <div>
            <Header />
            <div style={{ padding: '20px' }}>
                <h1>Trip Details</h1>
                <div>
                    <h3>Current Location: 123 Main St</h3>
                    <h3>Destination: 456 Elm St</h3>
                    <h3>Estimated Time of Arrival: 20 mins</h3>
                </div>
                <div style={{ height: '400px', marginTop: '20px' }}>
                    {/* Placeholder for Google Map */}
                    <p>Map goes here</p>
                </div>
            </div>
        </div>
    );
};

export default TripDetailsPage;
