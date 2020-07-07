import { useState, useEffect } from 'react';


function getWindowDimensions() {
  return {
    width: process.browser ? window.innerWidth : 0,
    height: process.browser ? window.innerHeight : 0,
  };
}
export default () => {

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return windowDimensions;
};
