import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Preloader from './Preloader';

const Layout = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Skip loader for nested dashboard routes
    const isDashboardRoute = location.pathname.startsWith('/dashboard');

    if (!isDashboardRoute) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 800); // simulate delay

      return () => clearTimeout(timer);
    } else {
      setLoading(false); // disable loader for dashboard
    }
  }, [location.pathname]);

  return (
    <>
      {loading && <Preloader />}
      <div style={{ display: loading ? 'none' : 'block' }}>
        {children}
      </div>
    </>
  );
};

export default Layout;
