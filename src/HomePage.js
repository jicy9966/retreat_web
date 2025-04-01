import React, { useState, useRef } from 'react';
import { Title, MsgBox, Program, Schedule, Team, FAQ } from "./components/components";

const HomePage = () => {
    // State to control visibility of elements
    const [showPopup, setShowPopup] = useState(false);
    const [showWindows, setShowWindows] = useState(false);
    const [loadingComplete, setLoadingComplete] = useState(false);

    // Ref for the audio element
    const startupSoundRef = useRef(null);

    // Handle confirmation button click
    const handleCloseMsgBox = () => {
        setShowPopup(true);
        setShowWindows(true);

        // Play startup sound
        if (startupSoundRef.current) {
            startupSoundRef.current.volume = 0.3;
            startupSoundRef.current.play().catch(e => console.log('Audio play failed:', e));
        }
    };

    // Function passed to Title to update loadingComplete state
    const handleAnimationEnd = () => {
        setLoadingComplete(true);
    };

    return (
        <div className="windows-startup">
            <Title onAnimationEnd={handleAnimationEnd} />

            {/* Conditionally render MsgBox when loadingComplete is true */}
            {loadingComplete && !showPopup && (
                <MsgBox onClose={handleCloseMsgBox} />
            )}

            {/* Other windows - only shown after confirmation */}
            {showWindows && (
                <>
                    <Program />
                    <Schedule />
                    <Team />
                    <FAQ />
                </>
            )}

            {/* Audio element for startup sound */}
            <audio
                ref={startupSoundRef}
                src="https://cdn.freesound.org/previews/351/351334_6358781-lq.mp3"
                preload="auto"
            />
        </div>
    );
};

export default HomePage;
