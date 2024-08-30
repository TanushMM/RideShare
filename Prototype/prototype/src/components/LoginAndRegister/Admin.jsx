import { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../Layout/Header"

const Admin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // Snackbar message
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);

    try {
      // First API call to login
      const loginResponse = await axios.post("http://3.110.16.132:9000/login", {
        email,
        password,
      });

      if (loginResponse.status === 200) {
        // Fetch JWT after successful login
        const jwtResponse = await axios.post("http://3.110.16.132:5000/getJWT", {
          jwt: email,  // Assuming this is the correct payload
        });

        if (jwtResponse.status === 200) {
          const token = jwtResponse.data.total_server_access_token;

          // Store the JWT in sessionStorage
          sessionStorage.setItem("jwt", token);
          sessionStorage.setItem("privilage", "admin");
          console.log("JWT stored in sessionStorage:", token);

          // Navigate to the home page or dashboard
          navigate("/admin");
        } else {
          setMessage("Error fetching JWT. Please try again.");
        }
      } else {
        setMessage("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("An error occurred. Please try again.");
    }
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
        
      
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" color={"black"}>
          Admin
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
          <Typography variant="body2" align="center" color={"black"}>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Don't have an account?{" "}
            <Link href="/login/register" variant="body2">
              Register here
            </Link>
          </Typography>
        </Box>
        {message && (
          <Typography color="error" sx={{ mt: 2 }}>
            {message}
          </Typography>
        )}
      </Box>
    </Container>
      </div>
      </div>
  );
};

export default Admin;



// import { useState } from "react";
// import {
//   Container,
//   Box,
//   TextField,
//   Button,
//   Typography,
//   Avatar,
//   Link,
// } from "@mui/material";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Admin = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [token, setToken] = useState(""); // State to store JWT
//   const [open, setOpen] = useState(false); // Snackbar open state
//   const [message, setMessage] = useState(""); // Snackbar message
//   const [isTokenFetched, setIsTokenFetched] = useState(false); // Track if the token is fetched
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Email:", email, "Password:", password);

//     try {
//       const response = await axios.post("http://3.111.198.198:9000/login", {
//         email,
//         password,
//       }).then(() => {
//           try {
//             const response = await axios.post("http://3.111.198.198:5000/getJWT", {"jwt":data.email});
//             // console.log(response.data.total_server_access_token);
//             setToken(response.data.total_server_access_token); // Store the fetched token
//             console.log(token);
//           } catch (err) {
//             console.error("Error fetching token:", err);
//             setMessage("Error fetching token. Please try again.");
//             setOpen(true);
//           } finally {
//             setIsTokenFetched(true); // Mark token fetching as complete
//           }
//       }).then(navigate("/home"));

//       // Handle successful login without JWT, e.g., store user data, redirect, etc.
//       // console.log("Login successful:", response.data);

//       // Optionally, you can store some user data in localStorage or sessionStorage
//       // sessionStorage.setItem("jwt", JSON.stringify(response.data.user._id)); // Example: Store user data
//       sessionStorage.setItem("jwt", JSON.stringify(token)); // Example: Store user data

//       // Example redirect to the admin dashboard
//       // window.location.href = "/dashboard"; // Uncomment to enable redirection after login
//     } catch (error) {
//       console.error("Login error:", error);
//     }
//   };

//   return (
//     <Container component="main" maxWidth="xs">
//       <Box
//         sx={{
//           marginTop: 8,
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//         }}
//       >
//         <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
//           <LockOutlinedIcon />
//         </Avatar>
//         <Typography component="h1" variant="h5" color={"black"}>
//           Admin
//         </Typography>
//         <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             id="email"
//             label="Email Address"
//             name="email"
//             autoComplete="email"
//             autoFocus
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             name="password"
//             label="Password"
//             type="password"
//             id="password"
//             autoComplete="current-password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             sx={{ mt: 3, mb: 2 }}
//           >
//             Log In
//           </Button>
//           <Typography variant="body2" align="center" color={"black"}>
//             {/* eslint-disable-next-line react/no-unescaped-entities */}
//             Don't have an account?{" "}
//             <Link href="/login/register" variant="body2">
//               Register here
//             </Link>
//           </Typography>
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default Admin;


// import { useState } from "react";
// import {
//   Container,
//   Box,
//   TextField,
//   Button,
//   Typography,
//   Avatar,
//   Link,
// } from "@mui/material";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import axios from "axios";

// const Admin = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Perform login logic here
//     console.log("Email:", email, "Password:", password);
//     try {
//       const response = await axios.post("http://localhost:9000/login", {
//         email,
//         password,
//       });
//       // Handle successful login, e.g., store token, redirect, etc.
//       console.log("Login successful:", response.data);
//       localStorage.setItem("token", response.data.token); // Store token if returned
//       // Optionally, redirect user or update UI
//       // window.location.href = "/dashboard"; // Example redirect
//     } catch (error) {
//       console.error("Login error:", error.response?.data || error.message);
//     }
//   };

//   return (
//     <Container component="main" maxWidth="xs">
//       <Box
//         sx={{
//           marginTop: 8,
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//         }}
//       >
//         <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
//           <LockOutlinedIcon />
//         </Avatar>
//         <Typography component="h1" variant="h5" color={"black"}>
//           Admin
//         </Typography>
//         <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             id="email"
//             label="Email Address"
//             name="email"
//             autoComplete="email"
//             autoFocus
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             name="password"
//             label="Password"
//             type="password"
//             id="password"
//             autoComplete="current-password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             sx={{ mt: 3, mb: 2 }}
//           >
//             LogIn
//           </Button>
//           <Typography variant="body2" align="center" color={"black"}>
//             {/* eslint-disable-next-line react/no-unescaped-entities */}
//             Don't have an account?{" "}
//             <Link to="/register" variant="body2">
//               Register here
//             </Link>
//           </Typography>
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default Admin;
