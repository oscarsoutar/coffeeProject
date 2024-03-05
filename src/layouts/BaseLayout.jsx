import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';

const UserProfileContext = createContext();

const Layout = () => {
  const [userProfile, setUserProfile] = useState(null);
  const getUserProfile = async () => {
    try {
      const token = window.localStorage.getItem('token');
      const response = await axios.get(
        'https://bubble-tea-cafe-api-production.up.railway.app/api/auth/profile',
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      setUserProfile(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!userProfile) {
      getUserProfile();
    }
  }, [userProfile]);

  return (
    <div>
      <UserProfileContext.Provider value={userProfile}>
        <Navbar />
        <Outlet />
      </UserProfileContext.Provider>
    </div>
  );
};

const useUserProfile = () => {
  const context = useContext(UserProfileContext);
  if (context === undefined) {
    console.log('useUserProfile must be used within a UserProfileProvider');
  }
  return context;
};

export { Layout, useUserProfile };
