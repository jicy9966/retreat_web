import React, { useState, useEffect } from "react";
import "./Footer.scss";

const Footer = () => {
    const [time, setTime] = useState("");
    // Set default power state to ON (light mode)
    const [isPowerOn, setIsPowerOn] = useState(true);
    
    useEffect(() => {
        // Function to update time
        function updateTime() {
            const now = new Date();
            let hours = now.getHours();
            let minutes = now.getMinutes();
            
            // Add leading zeros
            hours = hours < 10 ? '0' + hours : hours;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            
            setTime(`${hours}:${minutes}`);
        }
        
        // Update time immediately
        updateTime();
        
        // Update time every minute
        const intervalId = setInterval(updateTime, 60000);
        
        // Clean up interval on component unmount
        return () => clearInterval(intervalId);
    }, []);
    
    // Toggle power state and dark mode
    const togglePower = () => {
        const newPowerState = !isPowerOn;
        setIsPowerOn(newPowerState);
        
        // Toggle dark mode class on the document body
        if (newPowerState) {
            document.body.classList.remove('dark-mode');
        } else {
            document.body.classList.add('dark-mode');
        }
    };
    
    return (
        <div className="taskbar">
            <div className="start-button" onClick={togglePower}>
                <div>전원 {isPowerOn ? "ON" : "OFF"}</div>
            </div> 
            <div className="taskbar-time" id="taskbar-time">
                {time}
            </div>
        </div>
    );
}

export default Footer;