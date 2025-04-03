import React, { useState, useEffect } from "react";
import "./Footer.scss";

const Footer = () => {
    const [time, setTime] = useState("");
    
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
    
    return (
        <div className="taskbar">
            <div className="start-button">
                <div className="start-logo">⏼</div>
                <div>전원</div>
            </div>
            <div className="taskbar-time" id="taskbar-time">
                {time}
            </div>
        </div>
    );
}

export default Footer