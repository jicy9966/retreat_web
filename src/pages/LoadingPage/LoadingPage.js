import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoadingTitle, MsgBox } from "../../components/components";

const LoadingPage = () => {
    const navigate = useNavigate();
    const [showMsgBox, setShowMsgBox] = useState(false);

    const handleAnimationEnd = () => {
        // When animation ends, show the MsgBox below
        setShowMsgBox(true);
    };

    const handleCloseMsgBox = () => {
        // When MsgBox is closed, navigate to the home page
        navigate('/home');
    };

    return (
        <div className="loading-page">
            {/* LoadingTitle remains visible throughout */}
            <LoadingTitle onAnimationEnd={handleAnimationEnd} />

            {/* MsgBox appears below the LoadingTitle */}
            {showMsgBox && (
                <div className="msg-box-container" style={{ marginTop: '20px' }}>
                    <MsgBox onClose={handleCloseMsgBox} />
                </div>
            )}
        </div>
    );
};

export default LoadingPage;