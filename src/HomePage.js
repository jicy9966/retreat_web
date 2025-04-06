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
    Confidential,
    RSVP,
    RetreatFourCuts,
    Timer
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
        if (item.action) {
            switch (item.action) {
                case "page":
                    // Navigate to a new page
                    window.location.href = `${window.location.origin}${item.path}`;
                    // or we can use the below code for new tab
                    // const newUrl = `${window.location.origin}${item.path}`;
                    // window.open(newUrl, "_blank");
                    return;
                case "external":
                    // Open an external URL in a new tab
                    window.open(item.url, '_blank');
                    return;
                case "none":
                    // Do nothing for items that should not lead anywhere
                    return;
                // Default case is to open a window, handled below
            }
        }
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
                    <RSVP />
                    <Timer />
                    {/* <Program onFileClick={handleFileClick} />
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
                    ))} */}
                    <FAQ />
                    <Confidential />

                    {/* <Schedule />
                    <Team /> */}
                </>
            )}
        </div>
    );
};

export default HomePage;