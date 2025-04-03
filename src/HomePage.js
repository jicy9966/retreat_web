import React, { useState, useRef } from 'react';
import {
    Title,
    MsgBox,
    Program,
    ProgramWindow,
    Schedule,
    Team,
    FAQ,
    LoadingTitle,
    Confidential
} from "./components/components";

const HomePage = () => {
    // State to control visibility of elements
    const [showPopup, setShowPopup] = useState(false);
    const [showWindows, setShowWindows] = useState(false);
    const [loadingComplete, setLoadingComplete] = useState(false);
    const [openFileItems, setOpenFileItems] = useState([]);
    const windowRefs = useRef({});

    const handleCloseMsgBox = () => {
        setShowPopup(false);
        setShowWindows(true);
    };

    const handleAnimationEnd = () => {
        setLoadingComplete(true);
        setShowPopup(true);
    };

    const handleFileClick = (item) => {
        setOpenFileItems((prev) => {
            if (prev.some((openItem) => openItem.name === item.name)) return prev;
            return [...prev, item];
        });

        // Wait for render, then scroll
        setTimeout(() => {
            const el = windowRefs.current[item.name];
            if (el) {
                const rect = el.getBoundingClientRect();
                const scrollY = window.scrollY + rect.top - (window.innerHeight / 2) + (rect.height / 2);
                window.scrollTo({ top: scrollY, behavior: 'smooth' });
            }
        }, 0);

    };

    const handleCloseWindow = (name) => {
        setOpenFileItems((prev) => prev.filter((item) => item.name !== name));
    };

    return (
        <div className="windows-startup">
            {!showWindows && (
                <LoadingTitle onAnimationEnd={handleAnimationEnd} />
            )}

            {loadingComplete && showPopup && (
                <MsgBox onClose={handleCloseMsgBox} />
            )}

            {showWindows && (
                <>
                    <Title />
                    <Program onFileClick={handleFileClick} />

                    {openFileItems.map((item) => (
                        <div
                            key={item.name}
                            ref={(el) => (windowRefs.current[item.name] = el)}
                        >
                            <ProgramWindow
                                item={item}
                                onClose={() => handleCloseWindow(item.name)}
                            />
                        </div>
                    ))}

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
