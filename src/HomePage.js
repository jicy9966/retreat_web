import React, { useState } from 'react';
import { Title, MsgBox, Program, Schedule, Team, FAQ, LoadingTitle, Confidential } from "./components/components";

const HomePage = () => {
    // State to control visibility of elements
    const [showPopup, setShowPopup] = useState(false);
    const [showWindows, setShowWindows] = useState(false);
    const [loadingComplete, setLoadingComplete] = useState(false);

    // Handle confirmation button click
    const handleCloseMsgBox = () => {
        setShowPopup(true);
        setShowWindows(true);
    };

    // Function passed to Title to update loadingComplete state
    const handleAnimationEnd = () => {
        setLoadingComplete(true);
    };

    return (
        <div className="windows-startup">

            {!showWindows && (
                <LoadingTitle onAnimationEnd={handleAnimationEnd} />
            )}

            {/* Conditionally render MsgBox when loadingComplete is true */}
            {loadingComplete && !showPopup && (
                <MsgBox onClose={handleCloseMsgBox} />
            )}

            {/* Other windows - only shown after confirmation */}
            {showWindows && (
                <>
                    <Title />
                    <Program />
                    <FAQ />
                    <Confidential />
                    <Schedule />
                    <Team />
                </>
            )}
        </div>
    );
};

export default HomePage;
