import "./App.scss"
import "./DarkMode.scss" 
import { Footer, RetreatFourCuts } from "./components/components";
import HomePage from "./HomePage";
import React, { useEffect, useState } from "react";

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  
  // Handle route changes
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    
    // Listen for popstate events (back/forward navigation)
    window.addEventListener('popstate', handleLocationChange);
    
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const renderPage = () => {
    switch(currentPath) {
      case '/retreat-four-cuts':
        return <RetreatFourCuts/>;
      default:
        return <HomePage/>;
    }
  };

  return (
    <>
      <div className="desktop">
        {renderPage()}
      </div>
      <Footer />
    </>
  );
}
export default App;
