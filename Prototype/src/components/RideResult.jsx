import React from 'react';
import PropTypes from 'prop-types';

const RideResult = ({ 
    driverName, 
    // carType, 
    seatsAvailable, 
    // estimatedTime, 
    pickupLocation, 
    dropoffLocation, 
    // rideCost, 
    onRequestRide 
}) => {
    return (
        <div className="ride-details" style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '15px',
            backgroundColor: '#f9f9f9'
        }}>
            <h2>{driverName}</h2>
            {/* <p><strong>Car Type:</strong> {carType}</p> */}
            <p><strong>Seats Available:</strong> {seatsAvailable}</p>
            {/* <p><strong>Estimated Time:</strong> {estimatedTime}</p> */}
            <p><strong>Pickup Location:</strong> {pickupLocation}</p>
            <p><strong>Dropoff Location:</strong> {dropoffLocation}</p>
            {/* <p><strong>Ride Cost:</strong> ${rideCost}</p> */}
            <button
                style={{
                    backgroundColor: '#3f51b5',
                    color: 'white',
                    padding: '10px 15px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginTop: '10px'
                }}
                onClick={onRequestRide}
            >
                Request Ride
            </button>
        </div>
    );
}

RideResult.propTypes = {
    driverName: PropTypes.string.isRequired,
    // carType: PropTypes.string.isRequired,
    seatsAvailable: PropTypes.number.isRequired,
    // estimatedTime: PropTypes.string.isRequired,
    pickupLocation: PropTypes.string.isRequired,
    dropoffLocation: PropTypes.string.isRequired,
    // rideCost: PropTypes.number.isRequired,
    onRequestRide: PropTypes.func.isRequired
};

export default RideResult;
