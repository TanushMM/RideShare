import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RideDetails from './RideResult';
import Header from './Layout/Header';
import { useNavigate } from 'react-router-dom';

const RideResultsPage = () => {
    const [rides, setRides] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage.getItem("jwt") === null) {
            alert("Not Logged in");
            navigate("/");
        }
        const fetchRides = async () => {
            try {
                const response = await axios.get('http://3.110.16.132:5100/match-ride/match', {
                    headers: { Authorization: `Bearer ${sessionStorage.getItem("jwt")}` },
                });
                setRides(response.data.post_data);
                // console.log(response.data.post_data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching rides');
                console.error('Error fetching rides:', error);
                setLoading(false);
            }
        };

        fetchRides();
    }, [navigate]);

    const handleRequestRide = (ride) => {
        console.log(`Ride ${ride._id} requested!`);
        // Send the selected ride data to the RideDetailsPage
        navigate(`/ride-details/`, { state: { ride } });
    };

    return (
        <>
            <Header />
            <div className="ride-results-page" style={{ padding: '20px' }}>
                <h1>Available Rides</h1>
                {loading ? (
                    <p>Loading rides...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : rides.length > 0 ? (
                    <div className="ride-list">
                        {rides.map((ride) => (
                            <RideDetails
                                key={ride._id}
                                driverName={ride.email}
                                seatsAvailable={ride.seats}
                                pickupLocation={ride.from.location}
                                dropoffLocation={ride.to.location}
                                onRequestRide={() => handleRequestRide(ride)}
                            />
                        ))}
                    </div>
                ) : (
                    <p>No available rides.</p>
                )}
            </div>
        </>
    );
};

export default RideResultsPage;
