import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Preloader from './Preloader';

const Layout = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Show loader on route change
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800); // simulate delay
    return () => clearTimeout(timer);
  }, [location]);

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
