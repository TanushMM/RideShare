import React from 'react';
import RideDetails from './RideResult';
import Header from './Layout/Header';

const RideResultsPage = () => {
    const rides = [
        {
            id: 1,
            driverName: 'Alice',
            carType: 'Sedan',
            seatsAvailable: 3,
            estimatedTime: '15 mins',
            pickupLocation: 'Downtown',
            dropoffLocation: 'Airport',
            rideCost: 25
        },
        {
            id: 2,
            driverName: 'Bob',
            carType: 'SUV',
            seatsAvailable: 2,
            estimatedTime: '20 mins',
            pickupLocation: 'City Center',
            dropoffLocation: 'Suburbs',
            rideCost: 35
        },
        // Add more ride objects as needed
    ];

    const handleRequestRide = (rideId) => {
        console.log(`Ride ${rideId} requested!`);
        
    };

    return (
        <>
            <Header />
            <div className="ride-results-page" style={{ padding: '20px' }}>
                <h1>Available Rides</h1>
                <div className="ride-list">
                    {rides.map((ride) => (
                        <RideDetails
                            key={ride.id}
                            driverName={ride.driverName}
                            carType={ride.carType}
                            seatsAvailable={ride.seatsAvailable}
                            estimatedTime={ride.estimatedTime}
                            pickupLocation={ride.pickupLocation}
                            dropoffLocation={ride.dropoffLocation}
                            rideCost={ride.rideCost}
                            onRequestRide={() => handleRequestRide(ride.id)}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default RideResultsPage;
