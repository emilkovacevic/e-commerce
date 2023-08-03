import { useEffect, useState } from 'react';

const useScreenWidth = () => {
  const [isScreenSizeWiderThan768px, setScreenSize] = useState(true);

  const handleResize = () => {
    if (window.innerWidth > 768) {
      setScreenSize(true);
    } else {
      setScreenSize(false);
    }
  };

  useEffect(() => {
    handleResize(); 

    window.addEventListener('resize', handleResize); 

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { isScreenSizeWiderThan768px };
};

export default useScreenWidth;
