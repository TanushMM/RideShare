import { Box } from '@mui/material';
import './doc.css';

const ApiDocs = () => {
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
      <h1 className="api-docs__title">API Documentation for RideShare Application</h1>

      <div className="api-docs__section" id="overview">
        <h2 className="api-docs__section-title">Overview</h2>
        <p>
          The <em>RideShare Application</em> provides a comprehensive RESTful API that simplifies ride-booking processes for both users and administrators. The API handles various functionalities such as user authentication, ride management, feedback submission, and more. The architecture incorporates an API Gateway that acts as a single entry point for clients to interact with multiple microservices.
        </p>
        <p>The API Gateway serves several purposes:</p>
        <ul>
          <li><strong>Routing:</strong> It routes client requests to the appropriate microservices.</li>
          <li><strong>Authentication and Authorization:</strong> It manages secure access to the services using JWT tokens for user identities.</li>
          <li><strong>Rate Limiting:</strong> It can enforce limits on how many requests a client can make to prevent abuse.</li>
          <li><strong>Load Balancing:</strong> It distributes client requests across available instances of microservices to ensure optimal performance.</li>
        </ul>
        <p>
          The API Gateway connects with various microservices such as User Management, Ride Management, Feedback Management, and more. Each microservice is responsible for a set of related functionalities, enhancing modularity, scalability, and maintainability.
        </p>

        <h3 className="api-docs__subsection-title">Base URL</h3>
        <p>All API endpoints are accessible through the base URL:</p>
        <pre><code>http://&lt;hostname&gt;:&lt;port&gt;</code></pre>
        <p>For local testing, replace <code>&lt;hostname&gt;</code> with localhost and the corresponding <code>&lt;port&gt;</code> based on the gateway service:</p>
        <pre><code>http://localhost:8000</code></pre>
      </div>

      <div className="api-docs__section" id="endpoints">
        <h2 className="api-docs__section-title">Endpoints</h2>

        <h3 className="api-docs__subsection-title">1. Authentication Service</h3>

        <h4 className="api-docs__subsubsection-title">1.1 User Login</h4>
        <p>- <strong>Endpoint:</strong> /authentication/login</p>
        <p>- <strong>Method:</strong> POST</p>
        <p>- <strong>Description:</strong> Authenticates a user and returns a JWT for subsequent requests.</p>
        <p>- <strong>Request Body:</strong></p>
        <pre><code>{
          "{\n  \"email\": \"example@domain.com\",\n  \"password\": \"yourpassword\"\n}"
        }</code></pre>
        <p>- <strong>Response:</strong></p>
        <p>- <strong>Success (200):</strong></p>
        <pre><code>{
          "{\n  \"message\": \"Login successful\",\n  \"user\": {\n    \"email\": \"example@domain.com\",\n    \"name\": \"User Name\",\n    \"role\": \"user/admin\"\n    // Other user data\n  }\n}"
        }</code></pre>
        <p>- <strong>Error (4XX):</strong></p>
        <pre><code>{
          "{\n  \"message\": \"Invalid credentials\"\n}"
        }</code></pre>

        <h4 className="api-docs__subsubsection-title">1.2 User Registration</h4>
        <p>- <strong>Endpoint:</strong> /authentication/register</p>
        <p>- <strong>Method:</strong> POST</p>
        <p>- <strong>Description:</strong> Registers a new user.</p>
        <p>- <strong>Request Body:</strong></p>
        <pre><code>{
          "{\n  \"name\": \"User Name\",\n  \"email\": \"example@domain.com\",\n  \"password\": \"yourpassword\"\n}"
        }</code></pre>
        <p>- <strong>Response:</strong></p>
        <p>- <strong>Success (201):</strong></p>
        <pre><code>{
          "{\n  \"message\": \"Admin/User added successfully\"\n}"
        }</code></pre>
        <p>- <strong>Error:</strong></p>
        <pre><code>{
          "{\n  \"message\": \"User already registered\"\n}"
        }</code></pre>

        <h3 className="api-docs__subsection-title">2. Authorization Service</h3>

        <h4 className="api-docs__subsubsection-title">2.1 Get JWT</h4>
        <p>- <strong>Endpoint:</strong> /authorization/getJWT</p>
        <p>- <strong>Method:</strong> POST</p>
        <p>- <strong>Description:</strong> Generates a JWT based on user email for further transactions.</p>
        <p>- <strong>Request Body:</strong></p>
        <pre><code>{
          "{\n  \"jwt\": \"user@example.com\"\n}"
        }</code></pre>
        <p>- <strong>Response:</strong></p>
        <p>- <strong>Success (200):</strong></p>
        <pre><code>{
          "{\n  \"message\": \"success\",\n  \"total_server_access_token\": \"&lt;JWT_TOKEN&gt;\"\n}"
        }</code></pre>

        <h3 className="api-docs__subsection-title">3. User Data Service</h3>

        <h4 className="api-docs__subsubsection-title">3.1 Get User Data</h4>
        <p>- <strong>Endpoint:</strong> /user/userData</p>
        <p>- <strong>Method:</strong> GET</p>
        <p>- <strong>Description:</strong> Retrieves all registered users.</p>
        <p>- <strong>Request Headers:</strong></p>
        <pre><code>Authorization: Bearer &lt;JWT_TOKEN&gt;</code></pre>
        <p>- <strong>Response:</strong></p>
        <p>- <strong>Success (200):</strong></p>
        <pre><code>{
          "{\n  \"message\": \"success\",\n  \"contents\": [\n    {\n      \"_id\": \"example_id\",\n      \"name\": \"User Name\",\n      \"email\": \"example@domain.com\"\n      // Additional user fields...\n    }\n  ]\n}"
        }</code></pre>

        <h4 className="api-docs__subsubsection-title">3.2 Add User</h4>
        <p>- <strong>Endpoint:</strong> /user/addUser</p>
        <p>- <strong>Method:</strong> POST</p>
        <p>- <strong>Description:</strong> Adds a new user or admin to the database.</p>
        <p>- <strong>Request Body:</strong></p>
        <pre><code>{
          "{\n  \"name\": \"User Name\",\n  \"email\": \"example@domain.com\",\n  \"password\": \"yourpassword\"\n}"
        }</code></pre>
        <p>- <strong>Response:</strong></p>
        <p>- <strong>Success (200):</strong></p>
        <pre><code>{
          "{\n  \"message\": \"Admin/User added successfully\"\n}"
        }</code></pre>

        <h3 className="api-docs__subsection-title">4. Ride Management Service</h3>

        <h4 className="api-docs__subsubsection-title">4.1 Search for Rides</h4>
        <p>- <strong>Endpoint:</strong> /ride/search-ride/post</p>
        <p>- <strong>Method:</strong> POST</p>
        <p>- <strong>Description:</strong> Posts a new search for rides based on user requirements.</p>
        <p>- <strong>Request Body:</strong></p>
        <pre><code>{
          "{\n  \"from\": {\n    \"location\": \"pickup_location\",\n    \"coordinates\": { \"lat\": lat, \"lng\": lng }\n  },\n  \"to\": {\n    \"location\": \"destination_location\",\n    \"coordinates\": { \"lat\": lat, \"lng\": lng }\n  },\n  \"date\": \"YYYY-MM-DD\",\n  \"time\": \"HH:mm\",\n  \"distance\": distance_in_meters,\n  \"travelTime\": travel_time_in_seconds\n}"
        }</code></pre>
        <p>- <strong>Response:</strong></p>
        <p>- <strong>Success (200):</strong></p>
        <pre><code>{
          "{\n  \"message\": \"Ride successfully posted\"\n}"
        }</code></pre>

        <h4 className="api-docs__subsubsection-title">4.2 Post a Ride</h4>
        <p>- <strong>Endpoint:</strong> /ride/post-ride</p>
        <p>- <strong>Method:</strong> POST</p>
        <p>- <strong>Description:</strong> Posts a new ride.</p>
        <p>- <strong>Request Body:</strong></p>
        <pre><code>{
          "{\n  \"from\": \"pickup_location\",\n  \"to\": \"destination_location\",\n  \"date\": \"YYYY-MM-DD\",\n  \"time\": \"HH:mm\",\n  \"seatsAvailable\": number_of_seats\n}"
        }</code></pre>
        <p>- <strong>Response:</strong></p>
        <p>- <strong>Success (200):</strong></p>
        <pre><code>{
          "{\n  \"message\": \"Ride successfully posted\"\n}"
        }</code></pre>

        <h3 className="api-docs__subsection-title">5. Feedback Management Service</h3>

        <h4 className="api-docs__subsubsection-title">5.1 Submit Feedback</h4>
        <p>- <strong>Endpoint:</strong> /feedback/submit</p>
        <p>- <strong>Method:</strong> POST</p>
        <p>- <strong>Description:</strong> Submits feedback for a ride.</p>
        <p>- <strong>Request Body:</strong></p>
        <pre><code>{
          "{\n  \"rideId\": \"ride_id\",\n  \"userId\": \"user_id\",\n  \"feedback\": \"Your feedback here\"\n}"
        }</code></pre>
        <p>- <strong>Response:</strong></p>
        <p>- <strong>Success (200):</strong></p>
        <pre><code>{
          "{\n  \"message\": \"Feedback submitted successfully\"\n}"
        }</code></pre>
      </div>

      <div className="api-docs__section" id="errors">
        <h2 className="api-docs__section-title">Error Handling</h2>
        <p>
          The API responds with standardized error messages, which include the HTTP status code and a message field. Here's a summary of common error responses:
        </p>
        <ul>
          <li><strong>400 Bad Request:</strong> The request was malformed or invalid.</li>
          <li><strong>401 Unauthorized:</strong> Authentication failed or user does not have permission.</li>
          <li><strong>404 Not Found:</strong> The requested resource was not found.</li>
          <li><strong>500 Internal Server Error:</strong> An error occurred on the server.</li>
        </ul>
      </div>

      <div className="api-docs__section" id="faq">
        <h2 className="api-docs__section-title">FAQ</h2>
        <h3 className="api-docs__subsection-title">Q1: How do I authenticate?</h3>
        <p>A1: Use the /authentication/login endpoint with your email and password to obtain a JWT.</p>

        <h3 className="api-docs__subsection-title">Q2: What is a JWT?</h3>
        <p>A2: JWT (JSON Web Token) is an open standard for securely transmitting information between parties as a JSON object.</p>

        <h3 className="api-docs__subsection-title">Q3: How do I submit feedback?</h3>
        <p>A3: Use the /feedback/submit endpoint with the ride ID and your feedback content.</p>
      </div>
    </Box>
  );
};

export default ApiDocs;
