import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Layout/Header';

const HomePage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage.getItem("privilage") == "admin" && sessionStorage.getItem("jwt") != null) {
          navigate('/admin')
      } else if (sessionStorage.getItem("privilage") == "user" && sessionStorage.getItem("jwt") != null) {
          navigate('/home')
      }
      }, [navigate]);

    const handleSearchRide = () => {
        navigate('/search-ride');
    };

    const handlePostRide = () => {
        navigate('/post-ride');
    };

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100vw',
        margin: 0,
        padding: 0,
        position: 'relative',
      };

    return (
        <div style={containerStyle}>
      <Header />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div className="home-page">
            <h1>Welcome to RideShare</h1>
            <div className="options">
                <button onClick={handleSearchRide} >Search Ride</button>
                <p>  </p>
                <button onClick={handlePostRide}>Post Ride</button>
            </div>
        </div>
        </div>
    </div>
    );
}

export default HomePage;