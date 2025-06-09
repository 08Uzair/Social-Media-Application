"use client"
import { useEffect, useState } from 'react';

const useAuthenticated = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    try {
      const profile = localStorage.getItem('profile');
      if (profile) {
        const parsed = JSON.parse(profile);
        setUser(parsed?.result);
        setIsAuthenticated(!!parsed?.token);
      }
    } catch (err) {
      console.error('Failed to read user profile:', err);
      setIsAuthenticated(false);
    }
  }, []);

  return { user, isAuthenticated };
};

export default useAuthenticated;
