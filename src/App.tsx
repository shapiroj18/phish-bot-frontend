import React, { useEffect, useState } from 'react';
import { Desktop } from './components/Desktop'

function App() {

  const [width, setWidth] = useState<number>(window.innerWidth);
  const [height, setHeight] = useState<number>(window.innerHeight);
  const mobileBreakpoint: number = 640;

  useEffect(() => {
    const handleWindowResize = () => {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)
    }

    window.addEventListener("resize", handleWindowResize)
    return () => window.removeEventListener("resize", handleWindowResize)
  }, [])


  if (width <= mobileBreakpoint) {
    return <div>Mobile coming soon!</div>
  } else {
    return <Desktop />
  }
}

export default App;
