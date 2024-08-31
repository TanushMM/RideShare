import { useState, useEffect } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  Link,
  Snackbar,
  Alert,
} from "@mui/material";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../Layout/Header"

const Register = () => {
  const [data, setData] = useState({
    _id: "",
    name: "",
    email: "",
    password: ""
  });

  const [open, setOpen] = useState(false); // Snackbar open state
  const [message, setMessage] = useState(""); // Snackbar message
  const [isTokenFetched, setIsTokenFetched] = useState(false); // Track if the token is fetched

  const navigate = useNavigate();
  const location = useLocation();

  const fetchToken = async () => {
    if (sessionStorage.getItem('jwt') !== null) {
      navigate("/home");
    }
    setIsTokenFetched(true);
  };

  useEffect(() => {
    fetchToken(); // Fetch the token when the component mounts
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Register the user
      const res = await axios.post(`http://3.110.16.132:9000/register`, data);
      console.log("Register response:", res.data);

      // Fetch the JWT
      const tokenResponse = await axios.post("http://3.110.16.132:5000/getJWT", { "jwt": data.email });
      const token = tokenResponse.data.total_server_access_token;

      setMessage("Registration successful!");
      setOpen(true);

      // Set authorization header with the fetched token
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      };

      // Add the _id to the data
      data._id = res.data._id;

      // Post user data to another API
      const addUserResponse = await axios.post(
        "http://3.110.16.132:5050/user/addUser",
        data,
        config
      );
      console.log("User added successfully:", addUserResponse.data);

      // Navigate to home after a delay
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error("Error during registration:", err);
      setMessage("Error during registration. Please try again.");
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false); // Close Snackbar
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
          <AppRegistrationIcon />
        </Avatar>
        <Typography component="h1" variant="h5" color={"black"}>
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={data.name}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={data.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={data.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!isTokenFetched} // Disable button until token fetching is complete
          >
            Register
          </Button>
          <Typography variant="body2" align="center" color={"black"}>
            Already have an account?{" "}
            <Link href="/" variant="body2">
              Log in here
            </Link>
          </Typography>
        </Box>
      </Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Container>
    </div>
    </div>
  );
};

export default Register;


// import { useState, useEffect } from "react";
// import {
//   Container,
//   Box,
//   TextField,
//   Button,
//   Typography,
//   Avatar,
//   Link,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
// import axios from "axios";
// import { useLocation, useNavigate } from "react-router-dom";
// import Header from "../Layout/Header"
// import Footer from "../Layout/Footer"

// const Register = () => {
//   const [data, setData] = useState({
//     _id: "",
//     name: "",
//     email: "",
//     password: ""
//     // cab_id: "",
//     // dob: "",
//     // location: "",
//     // token: ""
//   });

//   const [token, setToken] = useState(""); // State to store JWT
//   const [open, setOpen] = useState(false); // Snackbar open state
//   const [message, setMessage] = useState(""); // Snackbar message
//   const [isTokenFetched, setIsTokenFetched] = useState(false); // Track if the token is fetched

//   const navigate = useNavigate();
//   const location = useLocation();
//   let response;
//   // const params = new URLSearchParams(location.search);
//   // const role = params.get("role");

//   // Function to fetch JWT
//   const fetchToken = async () => {
//     if (sessionStorage.getItem('jwt') != null) {
//       navigate("/home");
//     }
//     setIsTokenFetched(true);
//     // try {
//     //   response = await axios.post("http://3.110.16.132:5000/getJWT", {"jwt":data.email});
//     //   setToken(response.data.total_server_access_token); // Store the fetched token
//     //   sessionStorage.setItem("jwt", token);
//     //   console.log("JWT stored in sessionStorage:", token);
//     // } catch (err) {
//     //   console.error("Error fetching token:", err);
//     //   setMessage("Error fetching token. Please try again.");
//     //   setOpen(true);
//     // } finally {
//     //   setIsTokenFetched(true); // Mark token fetching as complete
//     // }
//   };

//   useEffect(() => {
//     fetchToken(); // Fetch the token when the component mounts
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setData({ ...data, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     axios
//       .post(`http://3.110.16.132:9000/register`, data)
//       .then((res) => {
//         console.log(res.data);
//         try {
//             response = axios.post("http://127.0.0.1:5000/getJWT", {"jwt":data.email});
//             setToken(response.data.total_server_access_token); // Store the fetched token
//             sessionStorage.setItem("jwt", token);
//             console.log("JWT stored in sessionStorage:", token);
//             return res.data;
//           } catch (err) {
//             console.error("Error fetching token:", err);
//             setMessage("Error fetching token. Please try again.");
//             setOpen(true);
//           }
//       })
//       .then((res) => {
//         console.log("Register", res.data);

//         setMessage("Registration successful!");
//         setOpen(true);

//         const config = {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           },
//         };

//         // Add the _id to the data
//         data._id = res.data._id;

//         return axios.post(
//           "http://3.110.16.132:5050/user/addUser",
//           data, 
//           config
//         );
//       })
//       .then((res) => {
//         console.log("Registration Successful:", res.data);
//         setTimeout(() => {
//           navigate("/");
//         }, 2000);
//       })
//       .catch((err) => {
//         console.log(err)
//         // console.log("User/Admin is already Registered.");
//         // setMessage("User/Admin is already Registered.");
//         setOpen(true);
//       });
//   };

//   const handleClose = () => {
//     setOpen(false); // Close Snackbar
//   };

//   const containerStyle = {
//     display: 'flex',
//     flexDirection: 'column',
//     height: '100vh',
//     width: '100vw',
//     margin: 0,
//     padding: 0,
//     position: 'relative',
//   };

//   return (
//     <div style={containerStyle}>
//       <Header />

//       <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        
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
//           <AppRegistrationIcon />
//         </Avatar>
//         <Typography component="h1" variant="h5" color={"black"}>
//           Register
//         </Typography>
//         <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             id="name"
//             label="Name"
//             name="name"
//             autoComplete="name"
//             autoFocus
//             value={data.name}
//             onChange={handleChange}
//           />
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             id="email"
//             label="Email Address"
//             name="email"
//             autoComplete="email"
//             value={data.email}
//             onChange={handleChange}
//           />
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             name="password"
//             label="Password"
//             type="password"
//             id="password"
//             autoComplete="new-password"
//             value={data.password}
//             onChange={handleChange}
//           />
//           {/* {role === "driver" && (
//             <>
//               <Box sx={{ mb: 2 }}>
//                 <TextField
//                   margin="normal"
//                   required
//                   fullWidth
//                   id="cab_id"
//                   label="RC Book"
//                   name="cab_id"
//                   autoComplete="cab_id"
//                   value={data.cab_id}
//                   onChange={handleChange}
//                 />
//               </Box>
//               <Box sx={{ mb: 2 }}>
//                 <TextField
//                   margin="normal"
//                   required
//                   fullWidth
//                   id="dob"
//                   label="Date Of Birth"
//                   name="dob"
//                   autoComplete="dob"
//                   value={data.dob}
//                   onChange={handleChange}
//                 />
//               </Box>
//               <Box sx={{ mb: 2 }}>
//                 <TextField
//                   margin="normal"
//                   required
//                   fullWidth
//                   id="location"
//                   label="Location"
//                   name="location"
//                   autoComplete="loc"
//                   value={data.location}
//                   onChange={handleChange}
//                 />
//               </Box>
//             </>
//           )} */}
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             sx={{ mt: 3, mb: 2 }}
//             disabled={!isTokenFetched} // Disable button until token fetching is complete
//           >
//             Register
//           </Button>
//           <Typography variant="body2" align="center" color={"black"}>
//             Already have an account?{" "}
//             <Link href="/" variant="body2">
//               Log in here
//             </Link>
//           </Typography>
//         </Box>
//       </Box>
//       <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
//         <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
//           {message}
//         </Alert>
//       </Snackbar>
//     </Container>
//     </div>

//       <Footer />
//     </div>
//   );
// };

// export default Register;