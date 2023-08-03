import { useEffect, useState } from 'react';

const useStickyNav = () => {
  const [isNavOnTopOfPage, setNav] = useState(true);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setNav(false);
    } else {
      setNav(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { isNavOnTopOfPage };
};

export default useStickyNav;