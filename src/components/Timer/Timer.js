import React, { useEffect, useState } from "react";
import "./Timer.scss";

const Timer = ({ onClose }) => {
    const targetDate = new Date("2025-04-25T00:00:00");
    const [timeLeft, setTimeLeft] = useState(getTimeRemaining());

    function getTimeRemaining() {
        const now = new Date();
        const difference = targetDate - now;
        const total = Math.max(0, difference);

        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
        const days = Math.floor(total / (1000 * 60 * 60 * 24));

        return { days, hours, minutes, seconds };
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(getTimeRemaining());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const format = (num) => String(num).padStart(2, "0");

    return (
        <div className="window">
            <div className="title-bar">
                <div className="title-bar-text">Timer - 카운트다운</div>
                <div className="title-bar-controls">
                    <button>-</button>
                    <button>□</button>
                    <button onClick={onClose}>×</button>
                </div>
            </div>
            <div className="window-content">
                <div className="explorer-header">
                    <span>📁 베델 {">"} 예삶 {">"} 청1 {">"} 수양회 {">"} 타이머</span>
                </div>
                <div className="program-container" style={{ textAlign: "center" }}>
                    <div className="timer-subtitle">수양회까지 남은 시간!</div>
                    <div className="countdown-timer">
                        <span className="countdown-group">
                            <span className="countdown-unit">{timeLeft.days}</span>
                            <span className="countdown-label">일</span>
                        </span>
                        <span className="countdown-group">
                            <span className="countdown-unit">{format(timeLeft.hours)}</span>
                            <span className="countdown-label">시</span>
                        </span>
                        <span className="countdown-group">
                            <span className="countdown-unit">{format(timeLeft.minutes)}</span>
                            <span className="countdown-label">분</span>
                        </span>
                        <span className="countdown-group">
                            <span className="countdown-unit">{format(timeLeft.seconds)}</span>
                            <span className="countdown-label">초</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Timer;