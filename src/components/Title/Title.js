import { useEffect, useRef } from "react";
import "./Title.scss";

const Title = ({ onAnimationEnd }) => {
    const loadingProgressRef = useRef(null);
    const popupRef = useRef(null);

    useEffect(() => {
        const loadingProgress = loadingProgressRef.current;

        // Create an event listener for the animation end
        const handleAnimationEnd = () => {
            // Show the popup after the animation ends
            setTimeout(() => {
                // Call the parent function when the animation ends
                if (onAnimationEnd) onAnimationEnd(); 

                if (popupRef.current) {
                    popupRef.current.style.display = 'block';
                }
            }, 500);
        };

        // Add event listener
        if (loadingProgress) {
            loadingProgress.addEventListener('animationend', handleAnimationEnd);
        }

        // Clean up event listener when component unmounts
        return () => {
            if (loadingProgress) {
                loadingProgress.removeEventListener('animationend', handleAnimationEnd);
            }
        };
    }, [onAnimationEnd]); // Include onAnimationEnd in dependency array

    return (
        <div className="window">
            <div className="title-bar">
                <div className="title-bar-text">수양회.exe - System Process</div>
                <div className="title-bar-controls">
                    <button>-</button>
                    <button>□</button>
                    <button>×</button>
                </div>
            </div>
            <div className="window-content">
                <div className="main-title">수양회.exe<span className="blinking-cursor"></span></div>
                <div className="loading-bar">
                    <div className="loading-progress" ref={loadingProgressRef}></div>
                </div>
                {/* Adding a popup element that will be shown after animation */}
                <div className="popup" ref={popupRef} style={{ display: 'none' }}>
                    Loading complete!
                </div>
            </div>
        </div>
    );
}

export default Title;
