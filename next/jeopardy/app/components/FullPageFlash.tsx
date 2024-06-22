import React, { useEffect, useState } from 'react';

const FullPageFlash = ({ children }) => {
  const [showFlash, setShowFlash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFlash(false);
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, []);

  return showFlash ? (
    <div className="fixed inset-0 bg-white animate-flash z-50">
      {children}
    </div>
  ) : null;
};

export default FullPageFlash;
