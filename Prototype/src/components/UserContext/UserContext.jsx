// src/context/UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context with default values
const UserContext = createContext({
  user: null,
  setUser: () => {},
});

// Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data from the API
    const fetchUserData = async () => {
      const token = sessionStorage.getItem('jst'); // Retrieve the JWT token from sessionStorage
      if (!token) {
        console.error('No JWT token found in sessionStorage');
        return;
      }

      try {
        const response = await fetch('http://3.110.16.132:5050/user', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for using the UserContext
export const useUser = () => {
  return useContext(UserContext);
};
