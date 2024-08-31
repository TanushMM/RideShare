import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the JWT is present in sessionStorage and navigate if necessary
    if (sessionStorage.getItem("privilage") === "admin" && sessionStorage.getItem("jwt") != null) {
      navigate('/admin');
    } else if (sessionStorage.getItem("privilage") === "user" && sessionStorage.getItem("jwt") != null) {
      navigate('/home');
    }
  }, [navigate]); // Dependency array ensures this runs only when navigate changes

  const handleAdminClick = () => {
    navigate("/login/admin"); // Navigate to /login/admin when Admin button is clicked
  };

  const handleUserClick = () => {
    navigate("/login/user"); // Navigate to /login/user when User button is clicked
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

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h1>Welcome to RideShare</h1>
      <button style={{ margin: "20px" }} onClick={handleAdminClick}>
        Admin
      </button>
      <button onClick={handleUserClick}>User</button>
        
      </div>
    </div>
  );
};

export default Login;
