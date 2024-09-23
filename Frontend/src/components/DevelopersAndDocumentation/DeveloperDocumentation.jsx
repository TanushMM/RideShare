import React from 'react';
import { Box, Paper } from '@mui/material';
import './doc.css';

const DeveloperDocs = () => {
  return (
    <Box 
    sx={{
      backgroundColor: 'lightgray',
      padding: '16px',
      borderRadius: '8px',
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
      width: '100%',
      minHeight: '100vh', // Ensures it covers the full viewport height
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start', // Align items to the left
      justifyContent: 'flex-start', // Align items to the top
      margin: '0', // Remove margins for full-width effect
      boxSizing: 'border-box', // Ensure padding is included in height/width
      textAlign: 'left', // Ensure text is left aligned
      fontSize: '1.2rem'
    }}
    >
        <h1>Developer Documentation</h1>

        <div className="section" id="overview">
          <h2>Overview of the RideShare Application</h2>
          <p>
          The RideShare application is a modern platform designed to connect passengers and drivers efficiently. It leverages cutting-edge technologies to provide a seamless and user-friendly ride-booking experience. The application aims to simplify the process of hailing a ride, tracking it in real-time, and ensuring secure payments and user feedback.

          </p>
        </div>

        <div className="section" id="architecture">
          <h2>Architecture</h2>
          <p>
          The architecture of the RideShare application follows a *microservices* approach, integrating numerous small, independently deployable services. The client interacts with different services through a unified API gateway.
          </p>
          <h3>Technologies Used:</h3>
          <ul>
            <li><strong>Frontend:</strong> React.js with Material-UI for building a responsive user interface.</li>
            <li><strong>Backend:</strong> Node.js with Express.js as the web framework.</li>
            <li><strong>Database:</strong> MongoDB for flexible data storage using Mongoose for data modeling.</li>
            <li><strong>Authentication: </strong> - JSON Web Tokens (JWT) for secure user authentication.</li>
            <li><strong>Mapping Services:</strong> Google Maps API</li>
            <li><strong>Deployment:</strong> - Docker for containerization and AWS for hosting.
            </li>
          </ul>
        </div>

        <div className="section" id="core-functionalities">
          <h2>Core Functionalities</h2>
          <ul>
            <li>User Registration and Login: Enables users to create accounts and authenticate securely.</li>
            <li>Ride Management:  Users can search for rides, post new rides, and manage bookings.</li>
            <li>Real-Time Tracking: Passengers can view live driver locations and estimated arrival times.</li>
            <li>Feedback System: Users can rate drivers and provide comments for quality assurance.</li>
            <li>Payment Processing: Handle transactions efficiently with multiple payment options.</li>
          </ul>
        </div>

        <div className="section" id="installation">
          <h2>Installation and Setup</h2>
          <h3>Prerequisites</h3>
          <ul>
            <li>Node.js - Download and install the latest LTS version of Node.js.</li>
            <li>MongoDB - Ensure MongoDB is installed and running on your local machine or a cloud instance.</li>
            <li>npm - Comes bundled with Node.js; used for managing JavaScript packages.</li>
            <li>Git - Recommended for version control.</li>
          </ul>
          <h3>Step-by-Step Installation</h3>
          <ol>
            <li>
              Clone the Repository:
              <pre><code>git clone https://github.com/yourusername/rideshare.git
                cd rideshare</code></pre>
            </li>
            <li>
              Backend Setup:
              <ul>
                <li>Navigating to the backend directory:</li>
                <pre><code>cd backend</code></pre>
                <li>Install Dependencies:</li>
                <pre><code>npm install</code></pre>
                <li>Configure Environment Variables: Create a .env file in the backlog root directory and add the following configurations:</li>
                <pre><code>JWT_SECRET_KEY=your_jwt_secret_key</code></pre>
                <pre><code>MONGODB_URI=mongodb://127.0.0.1:27017/rideshare</code></pre>
                
                <li>Run the Backend Server:</li>
                <pre><code>node server.js</code></pre>
              </ul>
            </li>
            <li>
              Frontend Setup:
              <ul>
                <li>Navigating to the frontend directory:</li>
                <pre><code>cd ../frontend</code></pre>
                <li>Install Dependencies:</li>
                <pre><code>npm install</code></pre>
                <li>Run the Frontend Development Server:</li>
                <pre><code>npm start</code></pre>
                <p>This will open the application in your default web browser at http://localhost:3000.
                </p>
              </ul>
            </li>
          </ol>
        </div>

        <div className="section" id="api-documentation">
          <h2>API Documentation</h2>
          <p>The API of the RideShare application provides endpoints for various functionalities including user authentication, ride management, and feedback submission. Below is an overview of the main API endpoints.</p>
          <h3>Base URL</h3>
          <p>All endpoints are available under the base URL:</p>
          <p>http://localhost:8000/</p>
    <h3>Authentication Endpoints</h3>
    
    <h4>Register User</h4>
    <pre><code>POST /authentication/register</code></pre>
    <p>Request Body:</p>
    <pre><code>{`{ "name": "John Doe", "email": "johndoe@example.com", "password": "securepassword" }`}</code></pre>
    
    <h4>User Login</h4>
    <pre><code>POST /authentication/login</code></pre>
    <p>Request Body:</p>
    <pre><code>{`{ "email": "johndoe@example.com", "password": "securepassword" }`}</code></pre>
</div>

<div className="section" id="ride-management-endpoints">
    <h2>Ride Management Endpoints</h2>

    <h4>Post a Ride</h4>
    <pre><code>POST /ride/post-ride/post</code></pre>
    <p>Request Body:</p>
    <pre><code>{`{ "from": { "location": "Central Park", "coordinates": { "lat": 40.785091, "lng": -73.968285 } }, "to": { "location": "Times Square", "coordinates": { "lat": 40.7580, "lng": -73.9855 } }, "date": "2023-10-10", "time": "14:00", "seats": "3", "drivingStyle": "fast" }`}</code></pre>

    <h4>Search for Rides</h4>
    <pre><code>POST /ride/search-ride/post</code></pre>
    <p>Request Body:</p>
    <pre><code>{`{ "from": { "location": "from location", "coordinates": { "lat": "latitude", "lng": "longitude" } }, "to": { "location": "to location", "coordinates": { "lat": "latitude", "lng": "longitude" } }, "date": "date", "time": "time" }`}</code></pre>
</div>

<div className="section" id="feedback-endpoints">
    <h2>Feedback Endpoints</h2>

    <h4>Submit Feedback</h4>
    <pre><code>POST /feedback/searcher/post</code></pre>
    <p>Request Body:</p>
    <pre><code>{`{ "poster": "poster_email", "rating": 5, "comments": "Excellent ride!" }`}</code></pre>
</div>

<div className="section" id="data-models">
    <h2>Data Models</h2>

    <h3>User Schema</h3>
    <pre><code>{`const userSchema = new mongoose.Schema({ name: { type: String, required: true }, email: { type: String, required: true, unique: true }, password: { type: String, required: true }});`}</code></pre>

    <h3>Ride Schema</h3>
    <pre><code>{`const rideSchema = new mongoose.Schema({ from: { location: { type: String, required: true }, coordinates: { type: { type: String, enum: ['Point'], required: true }, coordinates: { type: [Number], required: true }}}, to: { location: { type: String, required: true }, coordinates: { type: { type: String, enum: ['Point'], required: true }, coordinates: { type: [Number], required: true }}}, date: { type: Date, required: true }, time: { type: String, required: true }, seats: { type: Number, required: true }, drivingStyle: { type: String, enum: ['fast', 'slow'], required: true }});`}</code></pre>
    
    <h3>Payment Schema</h3>
    <pre><code>{`const paymentSchema = new mongoose.Schema({ userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, amount: { type: Number, required: true }, date: { type: Date, default: Date.now }});`}</code></pre>
</div>

<div className="section" id="user-authentication">
    <h2>User Authentication</h2>
    <p>The application implements JWT for user authentication, ensuring that sensitive actions are properly authorized.</p>
    
    <h3>Registration Flow</h3>
    <ol>
        <li>User sends a POST request to /authentication/register with their details.</li>
        <li>Server hashes the password using bcrypt and stores it in the database.</li>
        <li>Upon successful registration, the user is prompted to log in.</li>
    </ol>

    <h3>Login Flow</h3>
    <ol>
        <li>User sends a POST request to /authentication/login with their credentials.</li>
        <li>Server compares the hashed password stored in the database with the provided password.</li>
        <li>A JWT token is generated and sent back to the user for subsequent API requests.</li>
    </ol>
    
    <h3>Password Hashing</h3>
    <pre><code>{`bcrypt.hash(password, saltRounds, function(err, hash) { // Store the hash in the database });`}</code></pre>
</div>

<div className="section" id="real-time-features">
    <h2>Real-time Features</h2>
    
    <h3>Ride Tracking using Google Maps</h3>
    <p>Real-time tracking of rides is implemented using the Google Maps API, allowing users to view the current location and estimated time of arrival (ETA) for their rides.</p>
    
    <h3>WebSocket Integration</h3>
    <p>The application might use WebSockets to push real-time updates related to ride statuses to users. This is especially useful for notifying passengers about changes in their ride status.</p>
</div>

<div className="section" id="ride-matching">
    <h2>Ride Matching Algorithm</h2>
    
    <h3>Overview</h3>
    <p>The ride-matching algorithm matches user ride requests with driver offers. This involves considering various factors:</p>
    <ul>
        <li>Geographic proximity</li>
        <li>Availability of seats</li>
        <li>Date and time of travel</li>
    </ul>
    
    <h3>Implementation</h3>
    <p>The application can utilize machine learning techniques to analyze historical ride data and optimize match rates.</p>
    <pre><code>{`function findMatchingRides(userRide, availableRides) { return availableRides.filter(ride => { return ( ride.seats >= userRide.seats && ride.date === userRide.date && ride.time === userRide.time ); }); }`}</code></pre>
</div>

<div className="section" id="payment-integration">
    <h2>Payment Integration</h2>
    
    <h3>Payment Gateway</h3>
    <p>Integrating a payment gateway involves handling various aspects such as:</p>
    <ul>
        <li>Creating secure payment requests.</li>
        <li>Capturing payment responses.</li>
        <li>Keeping track of transaction statuses.</li>
    </ul>
    
    <pre><code>{`const handlePayment = async (paymentData) => { try { const response = await axios.post('/api/payment', paymentData); if (response.status === 200) { // Handle successful transaction } } catch (error) { console.error('Payment error:', error); // Handle error } };`}</code></pre>
    
    <h3>Fare Breakdown</h3>
    <p>After a ride is completed, the system calculates the fare based on:</p>
    <ul>
        <li>Base fare</li>
        <li>Distance traveled</li>
        <li>Time taken</li>
        <li>Any applicable discounts</li>
    </ul>
</div>

<div className="section" id="conclusion">
    <h2>Conclusion</h2>
    <p>This documentation provides an overview of the RideShare application. For further details, refer to the code repository and additional resources.</p>
</div>

    </Box>
  );
};

export default DeveloperDocs;
