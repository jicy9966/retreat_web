import React, { useState, useRef } from 'react';
import {
    Title,
    Program,
    ProgramWindow,
    FAQ,
    RSVP,
    Timer
} from "../../components/components";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    // State to control visibility of elements
    const [openFileItems, setOpenFileItems] = useState([]);
    const windowRefs = useRef({});
    const navigate = useNavigate();

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    const handleFileClick = (item) => {
        if (item.action === "page" && item.path) {
            navigate(item.path);
            scrollToTop();
            return;
        } else if (item.action === "external" && item.url) {
            window.open(item.url, "_blank");
            return;
        } else if (item.action === "download" && item.url) {
            const link = document.createElement("a");
            link.href = item.url;
            link.download = item.name || "download";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            return;
        } else if (item.action === "window") {
            // opens window
        } else {
            alert("현재 페이지는 준비 중입니다.");
            return;
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
        console.log("Closing window:", name);
        setOpenFileItems((prev) => prev.filter((item) => item.name !== name));
    };

    return (
        <div className="windows-startup">
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
        </div>
    );
};

export default HomePage;