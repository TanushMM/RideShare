import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import ChatBot from './ChatBot';
import VirtualCompanion from './VirtualCompanion';

const Layout = ({ children }) => {
    const [showCancelButton, setShowCancelButton] = useState(false);
    const navigate = useNavigate();

    // useEffect(() => {
    //     const fetchRideData = async () => {
    //         const token = sessionStorage.getItem('jwt');
    //         if (!token) {
    //             navigate('/login');
    //             return;
    //         }

    //         try {
    //             const response = await axios.get('http://3.110.16.132:5100/search-ride/', {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,
    //                 },
    //             });

    //             const userEmail = sessionStorage.getItem('email');
    //             const rideData = response.data;
    //             const rideExistsForUser = rideData.some(ride => ride.email === userEmail);

    //             if (rideExistsForUser) {
    //                 alert("There exists a ride that you have searched, please cancel it before doing any further actions.");
    //                 setShowCancelButton(true); 
    //                 navigate('/ride-details');
    //             }
    //         } catch (error) {
    //             console.error('Error fetching ride data:', error);
    //             navigate('/login');
    //         }
    //     };

    //     fetchRideData();
    // }, [navigate]);

    // const handleCancelSearch = async () => {
    //     const token = sessionStorage.getItem('jwt');
    //     if (!token) {
    //         navigate('/login');
    //         return;
    //     }

    //     try {
    //         // Make the POST request to cancel the existing search
    //         await axios.post('http://3.110.16.132:5100/search-ride/delete', {}, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         });

    //         alert('Existing search canceled successfully.');
    //         setShowCancelButton(false); // Hide the Cancel button after cancellation
    //         navigate('/'); // Redirect the user after cancellation
    //     } catch (error) {
    //         console.error('Error canceling the ride search:', error);
    //         alert('Failed to cancel the existing search. Please try again.');
    //     }
    // };

    return (
        <>
            <Header />
            <main>{children}</main>
            {showCancelButton && (
                <div style={{ textAlign: 'center', margin: '20px' }}>
                    <button onClick={handleCancelSearch} style={{ padding: '10px 20px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                        Cancel Existing Search
                    </button>
                </div>
            )}
            <ChatBot />
            <VirtualCompanion />
        </>
    );
};

export default Layout;
