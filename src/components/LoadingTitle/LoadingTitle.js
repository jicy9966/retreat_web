import { useEffect, useRef, useState } from "react";
import "./LoadingTitle.scss";

const LoadingTitle = ({ onAnimationEnd }) => {
    const loadingProgressRef = useRef(null);
    const popupRef = useRef(null);
    const [loadingMessage, setLoadingMessage] = useState("Initializing...");
    const [showLoadingMessage, setShowLoadingMessage] = useState(true);

    useEffect(() => {
        const loadingProgress = loadingProgressRef.current;

        // Create an event listener for the animation end
        const handleAnimationEnd = () => {
            // Show the popup after the animation ends
            setTimeout(() => {
                // Hide the loading message
                setShowLoadingMessage(false);

                // Call the parent function when the animation ends
                if (onAnimationEnd) onAnimationEnd();

                if (popupRef.current) {
                    popupRef.current.style.display = 'block';
                }
            }, 1200);
        };

        // Add event listener for animation end
        if (loadingProgress) {
            loadingProgress.addEventListener('animationend', handleAnimationEnd);
        }

        // Set up loading message sequence
        const messageSequence = [
            { message: "예배.log 불러오는중...", time: 0 },
            { message: "찬양.mp3 연습 중...", time: 1500 },
            { message: "은혜.buff 적용 중 ...", time: 3000 },
            { message: "성령님과 연결 안정화...", time: 4500 }
        ];

        // Set up the message timers
        const timers = messageSequence.map(({ message, time }) =>
            setTimeout(() => setLoadingMessage(message), time)
        );

        // Clean up event listener and timers when component unmounts
        return () => {
            if (loadingProgress) {
                loadingProgress.removeEventListener('animationend', handleAnimationEnd);
            }

            // Clear all timers
            timers.forEach(timer => clearTimeout(timer));
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
            <div className="window-content loading">
                <div className="main-title">수양회.exe<span className="blinking-cursor"></span></div>

                {/* Loading message appears above the loading bar and hides when popup shows */}
                {showLoadingMessage && <div className="loading-message">{loadingMessage}</div>}

                <div className="loading-bar">
                    <div className="loading-progress" ref={loadingProgressRef}></div>
                </div>

                {/* Popup that will be shown after animation */}
                <div className="popup loading" ref={popupRef} style={{ display: 'none' }}>
                    수양회.exe 모듈 설치 완료! <br />
                    은혜 충만함 느낄 준비 되었나요?
                </div>
            </div>
        </div>
    );
}

export default LoadingTitle;